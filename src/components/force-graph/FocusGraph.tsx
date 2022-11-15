/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import ForceGraph2D, {
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

  const getFullGraph = () => {
    axios({
      url: API_URL,
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
                  ? '#e50909'
                  : calculateNodeSize(d.totalValue, maxNode.totalValue) < 10
                  ? '#d69e11'
                  : '#84c8df',
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
                    ? '#e50909'
                    : calculateNodeSize(d.totalValue, maxNode.totalValue) < 10
                    ? '#d69e11'
                    : '#84c8df',
              };
            }),
        });
        setAllowFit(true);
      });
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
        width={width}
        ref={fgRef}
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
