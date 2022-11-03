/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from 'react';
import ForceGraph2D, {
  ForceGraphMethods,
  LinkObject,
  NodeObject,
} from 'react-force-graph-2d';

import axios from 'axios';

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
  const [graphData, setGraphData] = useState<GrapDataTransaction>();
  const [allowFit, setAllowFit] = useState(true);
  const fgRef = useRef<ForceGraphMethods>();

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
      setGraphData(rs.data.data.getGraph);
    });
  }, []);

  const maxNodeVal =
    graphData &&
    Math.max(
      ...graphData.nodes.map((node) => (node.totalValue ? node.totalValue : 0))
    );
  const maxNode = graphData?.nodes.find(
    (node) => node.totalValue === maxNodeVal
  );

  return (
    <ForceGraph2D
      width={1400}
      ref={fgRef}
      graphData={graphData}
      nodeAutoColorBy='id'
      nodeVal={(node: any) => node.totalValue}
      nodeLabel='val'
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
