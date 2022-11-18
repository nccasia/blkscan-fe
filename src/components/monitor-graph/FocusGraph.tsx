/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import { calculateNodeSize } from '@/lib/helper';
import axios from 'axios';
import {
  ForceGraphMethods,
  LinkObject,
  NodeObject,
} from 'react-force-graph-2d';
import { API_URL } from '@/lib/constants';

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
import { useWindowSize } from '@react-hook/window-size';
import { useSelector } from 'react-redux';
import { searchState } from '@/store/search';
import { monitorPageLimit } from '@/constant/graph';
import { BLUE, RED, YELLOW } from '@/constant/color';
import { errorToast } from '@/lib/notification';

const FocusGraph = () => {
  const ref = useRef<any>(null);
  const [data, setData] = useState();
  const fgRef = useRef<ForceGraphMethods>();
  const [widthSize] = useWindowSize();
  const [width, setWidth] = useState(0);
  const selector = useSelector(searchState);

  const getMonitorGraph = () => {
    fgRef?.current?.d3Force('link')?.distance(150);
    axios({
      url: API_URL,
      method: 'post',
      data: {
        query: `query getGraph($limit: Int) {getGraph(limit: $limit) {nodes { id, totalValue, count}, links { source,target }}}`,
        variables: {
          limit: monitorPageLimit,
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

      setData({
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
    });
  };
  useEffect(() => {
    getMonitorGraph();
  }, []);

  useEffect(() => {
    if (selector) {
      axios({
        url: API_URL,
        method: 'post',
        data: {
          query: `query searchGraph($id: ID!, $limit: Int) {searchGraph(id:$id, limit:$limit) {nodes { id, totalValue, count}, links { source,target }}}`,
          variables: {
            id: selector,
            limit: monitorPageLimit,
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

          setData({
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
        }
      });
    } else {
      getMonitorGraph();
    }
  }, [selector]);

  useEffect(() => {
    setWidth(ref.current.offsetWidth);
  }, [widthSize]);

  return (
    <div ref={ref}>
      <ForceGraph2D
        ref={fgRef}
        width={width}
        nodeAutoColorBy='id'
        nodeVal={(node: any) => node.size}
        nodeLabel={(node: any) =>
          `<p><b>Address:</b> ${node.id} <p>\n
          ${
            node.totalValue || (!node.totalValue && !node.count)
              ? `<p><b>Total value:</b> ${node.totalValue || 0}</p>\n`
              : ''
          }
          ${
            node.count && !node.totalValue
              ? `<p><b>Called count:</b> ${node.count || 0}</p>\n`
              : ''
          }
          `
        }
        graphData={data}
        linkDirectionalArrowLength={3}
        linkDirectionalParticles={2}
        linkDirectionalParticleWidth={2}
        linkDirectionalParticleSpeed={0.01}
        // enableNodeDrag={false}
        // nodeCanvasObjectMode={() => 'after'}
        linkColor={(link: any) => link.source.color}
        // nodeCanvasObject={(node: any, ctx) => {
        //   ctx.font = `3px Sans-Serif`;
        //   ctx.textAlign = 'left';
        //   ctx.fillStyle = '#fff';
        //   ctx.textBaseline = 'middle';
        //   const lines = node.val;
        //   ctx.fillText(lines, Number(node.x + node.val), Number(node.y));
        // }}
      />
    </div>
  );
};

export default FocusGraph;
