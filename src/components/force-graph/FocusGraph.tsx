/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from 'react';
import ForceGraph2D, {
  ForceGraphMethods,
  LinkObject,
  NodeObject,
} from 'react-force-graph-2d';

import axios from 'axios';
import { calculateNodeSize } from '@/lib/helper';

// import { useAppSelector } from '../../store/hook';
// import { searchState } from '../../store/search';
// import { useWindowSize } from '@react-hook/window-size';

type NodeCustom = {
  id: number;
  totalValue: number;
  val?: number;
  color: string;
  totalTransaction: number;
};
type Node = NodeObject & NodeCustom;
type Link = LinkObject;

export type GrapDataTransaction = {
  nodes: Node[];
  links: Link[];
};

const FocusGraph = () => {
  // const selector = useAppSelector(searchState);
  const [graphData, setGraphData] = useState<GrapDataTransaction>();
  const [allowFit, setAllowFit] = useState(true);
  const [maxNode, setMaxNode] = useState<Node>();
  const fgRef = useRef<ForceGraphMethods>();
  // const [widthSize] = useWindowSize();
  // const ref = useRef<any>(null);
  // const [width, setWidth] = useState(0);
  //Mock data. Will call api to get data later

  useEffect(() => {
    axios({
      url: 'http://localhost:3001/graphql/',
      method: 'post',
      data: {
        query: `query getGraph {getGraph {nodes { id, totalValue}, links { source,target }}}`,
        variables: {},
      },
    }).then((rs) => {
      const data = rs.data.data.getGraph;
      const maxNodeVal =
        data &&
        Math.max(
          ...data.nodes.map((node: Node) =>
            node.totalValue ? node.totalValue : 0
          )
        );
      const maxNode = data?.nodes.find(
        (node: Node) => node.totalValue === maxNodeVal
      );
      setMaxNode(maxNode);
      setGraphData({
        ...data,
        nodes: data.nodes.map((d: Node) => {
          return {
            ...d,
            size:
              calculateNodeSize(d.totalValue, maxNode.totalValue) < 2
                ? calculateNodeSize(d.totalValue, maxNode.totalValue) + 2
                : calculateNodeSize(d.totalValue, maxNode.totalValue),
            color:
              calculateNodeSize(d.totalValue, maxNode.totalValue) > 60
                ? '#e50909'
                : calculateNodeSize(d.totalValue, maxNode.totalValue) < 10
                ? '#d69e11'
                : '#84c8df',
          };
        }),
      });
    });
  }, []);

  // useEffect(() => {
  //   setWidth(ref.current.offsetWidth);
  // }, [widthSize]);

  return (
    <ForceGraph2D
      width={1400}
      ref={fgRef}
      graphData={graphData}
      nodeAutoColorBy='id'
      nodeVal={(node: any) => node.size}
      nodeLabel={(node: any) => `${node.totalValue}`}
      linkColor={(d: any) => d.source.color}
      linkDirectionalArrowLength={1}
      linkDirectionalParticles={2}
      linkDirectionalParticleWidth={2}
      linkDirectionalParticleSpeed={0.01}
      cooldownTicks={10}
      onEngineTick={() => {
        if (allowFit) {
          fgRef.current?.zoomToFit(500, 250, (node) => node.id === maxNode?.id);
        }
      }}
      onEngineStop={() => setAllowFit(false)}
      onNodeClick={(current) => {
        fgRef.current?.zoomToFit(500, 250, (node) => node.id === current?.id);
      }}
    />
  );
};

export default FocusGraph;
