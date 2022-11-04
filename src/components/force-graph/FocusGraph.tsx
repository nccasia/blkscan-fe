/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

import { useWindowSize } from '@react-hook/window-size';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import ForceGraph2D, {
  ForceGraphMethods,
  LinkObject,
  NodeObject,
} from 'react-force-graph-2d';
import { useAppSelector } from '../../store/hook';
import { searchState } from '../../store/search';

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
  const selector = useAppSelector(searchState);
  const [graphData, setGraphData] = useState<GrapDataTransaction>();
  const [graphDataShow, setGraphDataShow] = useState<GrapDataTransaction>();
  const [allowFit, setAllowFit] = useState(true);
  const [widthSize] = useWindowSize();

  const ref = useRef<any>(null);

  const fgRef = useRef<ForceGraphMethods>();

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
      setGraphDataShow(rs.data.data.getGraph);
    });
  }, []);

  //Mock data. Will call api to get data later

  const fake_data = useMemo(() => {
    const dummyDataLinks = graphData?.links.filter((number: any) => {
      const targetDummy: NodeObject = number.target as NodeObject;
      const sourceDummy: NodeObject = number.source as NodeObject;

      return targetDummy.id == selector || sourceDummy.id == selector;
    });
    const bonusNodes: string[] = [];
    bonusNodes.push(selector);

    dummyDataLinks?.forEach((item) => {
      const temp1 = item.source as NodeObject;
      const temp2 = item.target as NodeObject;
      bonusNodes.push(temp1.id as string);
      bonusNodes.push(temp2.id as string);
    });
    const dummyDataNode = graphData?.nodes.filter((item: any) =>
      bonusNodes.includes(item.id)
    );

    const data_final: GrapDataTransaction = {
      links: dummyDataLinks as Link[],
      nodes: dummyDataNode as Node[],
    };
    return data_final;
  }, [graphData?.links, graphData?.nodes, selector]);

  useEffect(() => {
    if (fake_data.nodes?.length) {
      setGraphDataShow(fake_data);
      setAllowFit(true);
    }
  }, [fake_data]);

  const maxNodeVal =
    graphData &&
    Math.max(
      ...graphData.nodes.map((node) => (node.totalValue ? node.totalValue : 0))
    );
  const maxNode = graphData?.nodes.find(
    (node) => node.totalValue === maxNodeVal
  );

  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(ref.current.offsetWidth);
  }, [widthSize]);

  return (
    <div ref={ref}>
      <ForceGraph2D
        width={width}
        ref={fgRef}
        graphData={graphDataShow}
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
            fgRef.current?.zoomToFit(
              500,
              250,
              (node) => node.id === maxNode?.id
            );
          }
        }}
        onEngineStop={() => setAllowFit(false)}
        onNodeClick={(current) => {
          fgRef.current?.zoomToFit(500, 250, (node) => node.id === current?.id);
        }}
      />
    </div>
  );
};

export default FocusGraph;
