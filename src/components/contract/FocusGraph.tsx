/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import React, { useEffect, useRef, useState } from 'react';
import {
  // ForceGraphMethods,
  LinkObject,
  NodeObject,
  ForceGraphMethods,
} from 'react-force-graph-2d';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { calculateNodeSize } from '@/lib/helper';
import { useWindowSize } from '@react-hook/window-size';
import { searchState } from '@/store/search';
import { API_URL } from '@/lib/constants';
import { ForceGraph2D } from 'react-force-graph';
import { errorToast } from '@/lib/notification';
import { homePageLimit, NodeType } from '@/constant/graph';
import { BLUE, RED, YELLOW } from '@/constant/color';

type NodeCustom = {
  id: number | string;
  totalValue: number;
  val?: number;
  count: number;
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
  const [graphDataShow, setGraphDataShow] = useState<GrapDataTransaction>();
  const selector = useSelector(searchState);
  const ref = useRef<any>(null);

  const [maxNode, setMaxNode] = useState<Node>();
  // const fgRef = useRef<ForceGraphMethods>();
  const fgRef = useRef<ForceGraphMethods>();
  // const fgRefGraph = useRef();

  // const handleClick = useCallback(
  //   (node: any) => {
  //     const distance = 80;
  //     const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

  //     fgRefGraph.current?.cameraPosition(
  //       { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio },
  //       node,
  //       3000
  //     );
  //   },
  //   [fgRefGraph]
  // );

  // const fgRef1 = useRef();

  const getFullGraph = () => {
    axios({
      url: API_URL,
      method: 'post',
      data: {
        query: `query getGraph($limit: Int, $skip: Int, $type: NodeType) {
          getGraph(limit: $limit, skip: $skip, type: $type) {
            nodes { id, totalValue, count, funcName}, 
            links { source,target }
          }
        }`,
        variables: {
          limit: homePageLimit,
          skip: 0,
          type: NodeType.Contracts,
        },
      },
    })
      .then((rs) => {
        const data = rs?.data?.data?.getGraph;
        if (!data) return;
        const maxNodeVal =
          data &&
          Math.max(
            ...data.nodes.map((node: Node) => (node.count ? node.count : 0))
          );
        const maxNode = data?.nodes.find(
          (node: Node) => node.count === maxNodeVal
        );

        setMaxNode(maxNode);
        setGraphDataShow({
          ...data,
          nodes: data.nodes
            .sort((a: Node, b: Node) => a.count - b.count)
            .map((d: Node) => {
              return {
                ...d,
                size:
                  calculateNodeSize(d.count, maxNode.count) < 2
                    ? calculateNodeSize(d.count, maxNode.count) + 2
                    : calculateNodeSize(d.count, maxNode.count),
                color:
                  calculateNodeSize(d.count, maxNode.count) > 60
                    ? RED
                    : calculateNodeSize(d.count, maxNode.count) < 10
                    ? YELLOW
                    : BLUE,
              };
            }),
        });
        setAllowFit(true);
      })
      .catch((e) => console.error('hai', e));
  };

  useEffect(() => {
    getFullGraph();
    // fgRef?.current?.d3Force('link')?.distance(150);
  }, []);

  useEffect(() => {
    if (selector) {
      axios({
        url: API_URL,
        method: 'post',
        data: {
          query: `query searchGraph($id: ID!, $limit: Int) {searchGraph(id:$id, limit: $limit) {nodes { id, totalValue, count, funcName }, links { source,target }}}`,
          variables: {
            id: selector,
            limit: homePageLimit,
          },
        },
      })
        .then((rs) => {
          const data = rs?.data?.data?.searchGraph;
          if (!data) return;
          if (!data.nodes.length) {
            errorToast(`There are no nodes with ID = ${selector}`);
          } else {
            const maxNodeVal =
              data &&
              Math.max(
                ...data.nodes.map((node: Node) => (node.count ? node.count : 0))
              );
            const maxNode = data?.nodes.find(
              (node: Node) => node.count === maxNodeVal
            );
            setMaxNode(maxNode);

            setGraphDataShow({
              ...data,
              nodes: data.nodes
                .sort((a: Node, b: Node) => a.count - b.count)
                .map((d: Node) => {
                  return {
                    ...d,
                    size:
                      calculateNodeSize(d.count, maxNode.count) < 2
                        ? calculateNodeSize(d.count, maxNode.count) + 2
                        : calculateNodeSize(d.count, maxNode.count),
                    color:
                      calculateNodeSize(d.count, maxNode.count) > 60
                        ? RED
                        : calculateNodeSize(d.count, maxNode.count) < 10
                        ? YELLOW
                        : BLUE,
                  };
                }),
            });
            setAllowFit(true);
          }
        })
        .catch((e) => console.error('hai', e));
    } else {
      getFullGraph();
    }
  }, [selector]);

  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(ref.current.offsetWidth);
  }, [widthSize]);

  return (
    <div ref={ref}>
      <ForceGraph2D
        // onNodeClick={(node) => handleClick(node)}
        width={width}
        ref={fgRef}
        graphData={graphDataShow}
        nodeAutoColorBy='id'
        nodeVal={(node: any) => node?.size}
        nodeLabel={(node: any) =>
          `<p><b>Address:</b> ${node.id} <p>\n
          ${
            node.count && !node.totalValue
              ? `<p><b>Called count:</b> ${node.count || 0}</p>\n`
              : ''
          }
          ${
            node.funcName && !node.totalValue
              ? `<p><b>Method:</b> ${node.funcName}</p>\n`
              : ''
          }
          `
        }
        linkColor={(d: any) => d.source.color}
        linkDirectionalArrowLength={1}
        linkDirectionalParticles={2}
        linkDirectionalParticleWidth={2}
        linkDirectionalParticleSpeed={0.01}
        cooldownTicks={10}
        // onEngineTick={() => {
        //   if (allowFit) {
        //     graphDataShow?.nodes.forEach((node: any) => {
        //       if (node.id === maxNode?.id) {
        //         handleClick(node);
        //       }
        //     });
        //   }
        // }}

        onEngineTick={() => {
          if (allowFit) {
            fgRef.current?.zoomToFit(
              500,
              250,
              (node: any) => node.id === maxNode?.id
            );
          }
        }}
        //Zoom for 3d
        // onEngineTick={() => {
        //   if (allowFit) {
        //     graphDataShow?.nodes.forEach((node: any) => {
        //       if (node.id === maxNode?.id) {
        //         handleClick(node);
        //       }
        //     });
        //   }
        // }}

        onEngineStop={() => setAllowFit(false)}
        onNodeClick={(currentNode) => {
          // navigator.clipboard.writeText(currentNode?.id as string);
          // fgRef.current?.zoomToFit(
          //   500,
          //   250,
          //   (node: any) => node.id === currentNode?.id
          // );
          currentNode?.id &&
            setTimeout(
              () =>
                window.open(
                  `https://etherscan.io/address/${currentNode?.id}`,
                  '_blank'
                ),
              100
            );
          return;
        }}

        // onEngineStop={() => setAllowFit(false)}
      />
    </div>
  );
};

export default FocusGraph;
