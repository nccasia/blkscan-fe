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
import { useWindowSize } from '@react-hook/window-size';
import { useAppSelector } from '@/store/hook';
import { searchState } from '@/store/search';

// import { useAppSelector } from '../../store/hook';
// import { searchState } from '../../store/search';
// import { useWindowSize } from '@react-hook/window-size';

type NodeCustom = {
  id: number | string;
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
  const [widthSize] = useWindowSize();
  // const [graphData, setGraphData] = useState<GrapDataTransaction>();
  const [graphDataShow, setGraphDataShow] = useState<GrapDataTransaction>();
  const selector = useAppSelector(searchState);
  const ref = useRef<any>(null);

  const [maxNode, setMaxNode] = useState<Node>();
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
      // setGraphData({
      //   ...data,
      //   nodes: data.nodes.map((d: Node) => {
      //     return {
      //       ...d,
      //       size:
      //         calculateNodeSize(d.totalValue, maxNode.totalValue) < 2
      //           ? calculateNodeSize(d.totalValue, maxNode.totalValue) + 2
      //           : calculateNodeSize(d.totalValue, maxNode.totalValue),
      //       color:
      //         calculateNodeSize(d.totalValue, maxNode.totalValue) > 60
      //           ? '#e50909'
      //           : calculateNodeSize(d.totalValue, maxNode.totalValue) < 10
      //           ? '#d69e11'
      //           : '#84c8df',
      //     };
      //   }),
      // });

      setGraphDataShow({
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

  useEffect(() => {
    if (selector) {
      axios({
        url: 'http://localhost:3001/graphql/',
        method: 'post',
        data: {
          query: `query searchGraph($id: ID!) {searchGraph(id:$id) {nodes { id, totalValue}, links { source,target }}}`,
          variables: {
            id: selector,
          },
        },
      }).then((rs) => {
        const data = rs.data.data.searchGraph;
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
        // setGraphData({
        //   ...data,
        //   nodes: data.nodes.map((d: Node) => {
        //     return {
        //       ...d,
        //       size:
        //         calculateNodeSize(d.totalValue, maxNode.totalValue) < 2
        //           ? calculateNodeSize(d.totalValue, maxNode.totalValue) + 2
        //           : calculateNodeSize(d.totalValue, maxNode.totalValue),
        //       color:
        //         calculateNodeSize(d.totalValue, maxNode.totalValue) > 60
        //           ? '#e50909'
        //           : calculateNodeSize(d.totalValue, maxNode.totalValue) < 10
        //           ? '#d69e11'
        //           : '#84c8df',
        //     };
        //   }),
        // });

        setGraphDataShow({
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
        setAllowFit(true);
      });
    }
  }, [selector]);

  // const fake_data = useMemo(() => {
  //   const dummyDataLinks = graphData?.links.filter((number: LinkObject) => {
  //     const targetDummy: NodeObject = number.target as NodeObject;
  //     const sourceDummy: NodeObject = number.source as NodeObject;

  //     return targetDummy.id == selector || sourceDummy.id == selector;
  //   });
  //   const bonusNodes: string[] = [];
  //   bonusNodes.push(selector);

  //   dummyDataLinks?.forEach((item: LinkObject) => {
  //     const temp1 = item.source as NodeObject;
  //     const temp2 = item.target as NodeObject;
  //     bonusNodes.push(temp1.id as string);
  //     bonusNodes.push(temp2.id as string);
  //   });
  //   const dummyDataNode = graphData?.nodes.filter((item: Node) =>
  //     bonusNodes.includes(item.id as string)
  //   );

  //   const data_final: GrapDataTransaction = {
  //     links: dummyDataLinks as LinkObject[],
  //     nodes: dummyDataNode as Node[],
  //   };
  //   return data_final;
  // }, [graphData?.links, graphData?.nodes, selector]);

  const [width, setWidth] = useState(0);

  // console.log("re render")
  // useEffect(() => {
  //   if (fake_data && fake_data.nodes && fake_data.nodes?.length) {
  //     const data = fake_data;
  //     const maxNodeVal =
  //       data &&
  //       Math.max(
  //         ...data.nodes.map((node: Node) =>
  //           node.totalValue ? node.totalValue : 0
  //         )
  //       );
  //     const maxNode1 = data?.nodes.find(
  //       (node: Node) => node.totalValue === maxNodeVal
  //     );

  //     setMaxNode(maxNode1);

  //     // console.log({
  //     //   ...data,
  //     //   nodes: data.nodes.map((d: Node) => {
  //     //     return {
  //     //       ...d,
  //     //       size:
  //     //         calculateNodeSize(d.totalValue, (maxNode1 as Node).totalValue) < 2
  //     //           ? calculateNodeSize(d.totalValue, (maxNode1 as Node).totalValue) + 2
  //     //           : calculateNodeSize(d.totalValue, (maxNode1 as Node).totalValue),
  //     //       color:
  //     //         calculateNodeSize(d.totalValue, (maxNode1 as Node).totalValue) > 60
  //     //           ? '#e50909'
  //     //           : calculateNodeSize(d.totalValue, (maxNode1 as Node).totalValue) < 10
  //     //             ? '#d69e11'
  //     //             : '#84c8df',
  //     //     };
  //     //   }),
  //     // })
  //     setGraphDataShow({
  //       ...data,
  //       nodes: data.nodes.map((d: Node) => {
  //         return {
  //           ...d,
  //           size:
  //             calculateNodeSize(d.totalValue, (maxNode1 as Node).totalValue) < 2
  //               ? calculateNodeSize(
  //                   d.totalValue,
  //                   (maxNode1 as Node).totalValue
  //                 ) + 2
  //               : calculateNodeSize(
  //                   d.totalValue,
  //                   (maxNode1 as Node).totalValue
  //                 ),
  //           color:
  //             calculateNodeSize(d.totalValue, (maxNode1 as Node).totalValue) >
  //             60
  //               ? '#e50909'
  //               : calculateNodeSize(
  //                   d.totalValue,
  //                   (maxNode1 as Node).totalValue
  //                 ) < 10
  //               ? '#d69e11'
  //               : '#84c8df',
  //         };
  //       }),
  //     });
  //     // setAllowFit(true);
  //   }
  // }, [fake_data]);

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
              (node: any) => node.id === maxNode?.id
            );
          }
        }}
        onEngineStop={() => setAllowFit(false)}
        onNodeClick={(current) => {
          fgRef.current?.zoomToFit(
            500,
            250,
            (node: any) => node.id === current?.id
          );
        }}
      />
    </div>
  );
};

export default FocusGraph;
