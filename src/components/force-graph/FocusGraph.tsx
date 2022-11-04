/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import ForceGraph2D, {
  ForceGraphMethods,
  LinkObject,
  NodeObject,
} from 'react-force-graph-2d';
// import { useWindowSize } from '@react-hook/window-size';

import axios from 'axios';
import { calculateNodeSize } from '@/lib/helper';

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
  const [allowFit, setAllowFit] = useState(true);
  // const [widthSize] = useWindowSize();
  const [graphData, setGraphData] = useState<GrapDataTransaction>();

  const ref = useRef<any>(null);

  const [maxNode, setMaxNode] = useState<Node>();
  const fgRef = useRef<ForceGraphMethods>();

  //Mock data. Will call api to get data later
  //Mock data. Will call api to get data later
  // const data = useMemo(() => genRandomTree(1000), []);

  // const fake_data = useMemo(() => {
  //   const dummyDataLinks = data.links.filter((number) => {
  //     const targetDummy: NodeObject = number.target as NodeObject;
  //     const sourceDummy: NodeObject = number.source as NodeObject;

  //     return (
  //       targetDummy.id == Number(selector) || sourceDummy.id == Number(selector)
  //     );
  //   });
  //   const bonusNodes: number[] = [];
  //   if (Number(selector) !== 0) {
  //     bonusNodes.push(Number(selector));
  //   }
  //   for (let i = 0; i < dummyDataLinks.length; i++) {
  //     const temp1 = dummyDataLinks[i].source as NodeObject;
  //     const temp2 = dummyDataLinks[i].target as NodeObject;
  //     bonusNodes.push(temp1.id as number);
  //     bonusNodes.push(temp2.id as number);
  //   }

  //   const dummyDataNode = data.nodes.filter((item) =>
  //     bonusNodes.includes(item.id)
  //   );

  //   const data_final: GrapDataTransaction = {
  //     links: dummyDataLinks,
  //     nodes: dummyDataNode,
  //   };
  //   return data_final;
  // }, [data.links, data.nodes, selector]);

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

  // const [width, setWidth] = useState(0);

  // useEffect(() => {
  //   setWidth(ref.current.offsetWidth);
  // }, [widthSize]);

  return (
    <div ref={ref}>
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
