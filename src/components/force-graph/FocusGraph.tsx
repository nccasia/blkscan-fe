/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import {
  ForceGraphMethods,
  LinkObject,
  NodeObject,
} from 'react-force-graph-2d';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { calculateNodeSize } from '@/lib/helper';
import { useWindowSize } from '@react-hook/window-size';
import { searchState } from '@/store/search';
import { API_URL } from '@/lib/constants';
import { ForceGraph3D } from 'react-force-graph';
import { errorToast } from '@/lib/notification';
import { homePageLimit } from '@/constant/graph';
import { BLUE, RED, YELLOW } from '@/constant/color';

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
  const [graphDataShow, setGraphDataShow] = useState<GrapDataTransaction>();
  const selector = useSelector(searchState);
  const ref = useRef<any>(null);

  const [maxNode, setMaxNode] = useState<Node>();
  const fgRef = useRef<ForceGraphMethods>();

  // const handleClick = useCallback((node: any) => {
  //   // Aim at node from outside it
  //   const distance = 40;
  //   const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
  //   console.log("click ")
  //   fgRef.current?.cameraPosition(
  //     { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
  //     node, // lookAt ({ x, y, z })
  //     3000  // ms transition duration
  //   );
  // }, [fgRef]);

  const getFullGraph = () => {
    axios({
      url: API_URL,
      method: 'post',
      data: {
        query: `query getGraph($limit: Int) {getGraph(limit: $limit) {nodes { id, totalValue}, links { source,target }}}`,
        variables: {
          limit: homePageLimit,
        },
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
      setGraphDataShow({
        ...data,
        nodes: data.nodes
          .sort((a: Node, b: Node) => a.totalValue - b.totalValue)
          .map((d: Node) => {
            return {
              ...d,
              size:
                calculateNodeSize(d.totalValue, maxNode.totalValue) < 2
                  ? calculateNodeSize(d.totalValue, maxNode.totalValue) + 2
                  : calculateNodeSize(d.totalValue, maxNode.totalValue),
              color:
                calculateNodeSize(d.totalValue, maxNode.totalValue) > 60
                  ? RED
                  : calculateNodeSize(d.totalValue, maxNode.totalValue) < 10
                  ? YELLOW
                  : BLUE,
            };
          }),
      });
      setAllowFit(true);
    });
  };

  useEffect(() => {
    getFullGraph();
    fgRef?.current?.d3Force('link')?.distance(150);
  }, []);

  useEffect(() => {
    if (selector) {
      axios({
        url: API_URL,
        method: 'post',
        data: {
          query: `query searchGraph($id: ID!, $limit: Int) {searchGraph(id:$id, limit: $limit) {nodes { id, totalValue}, links { source,target }}}`,
          variables: {
            id: selector,
            limit: homePageLimit,
          },
        },
      }).then((rs) => {
        const data = rs.data.data.searchGraph;
        if (!data.nodes.length) {
          errorToast(`There are no nodes with ID = ${selector}`);
        } else {
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

          setGraphDataShow({
            ...data,
            nodes: data.nodes
              .sort((a: Node, b: Node) => a.totalValue - b.totalValue)
              .map((d: Node) => {
                return {
                  ...d,
                  size:
                    calculateNodeSize(d.totalValue, maxNode.totalValue) < 2
                      ? calculateNodeSize(d.totalValue, maxNode.totalValue) + 2
                      : calculateNodeSize(d.totalValue, maxNode.totalValue),
                  color:
                    calculateNodeSize(d.totalValue, maxNode.totalValue) > 60
                      ? RED
                      : calculateNodeSize(d.totalValue, maxNode.totalValue) < 10
                      ? YELLOW
                      : BLUE,
                };
              }),
          });
          setAllowFit(true);
        }
      });
    }
  }, [selector]);

  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(ref.current.offsetWidth);
  }, [widthSize]);

  return (
    <div ref={ref}>
      <ForceGraph3D
        // onNodeClick={handleClick}
        width={width}
        // ref={fgRef}
        graphData={graphDataShow}
        nodeAutoColorBy='id'
        nodeVal={(node: any) => node.size}
        nodeLabel={(node: any) =>
          `<p> <b>Address:</b>  ${node.id} <p>\n<p><b>Total value:</b> ${node.totalValue}</p>`
        }
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
        // onNodeClick={(current) => {
        //   console.log("click")
        //   fgRef.current?.zoomToFit(
        //     500,
        //     250,
        //     (node: any) => node.id === current?.id
        //   );
        // }}
      />
    </div>
  );
};

export default FocusGraph;
