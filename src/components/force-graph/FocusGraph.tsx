/* eslint-disable @typescript-eslint/no-explicit-any */
import { useWindowSize } from '@react-hook/window-size';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import ForceGraph2D, {
  ForceGraphMethods,
  NodeObject,
} from 'react-force-graph-2d';
import { genRandomTree, GrapDataTransaction } from '../force-graph/data';
import { useAppSelector } from '../../store/hook';
import { searchState } from '../../store/search';

const FocusGraph = () => {
  const selector = useAppSelector(searchState);
  // console.log(selector);

  const [graphData, setGraphData] = useState<GrapDataTransaction>(
    genRandomTree(1000)
  );
  const [allowFit, setAllowFit] = useState(true);
  const [widthSize] = useWindowSize();

  const ref = useRef<any>(null);

  const fgRef = useRef<ForceGraphMethods>();

  //Mock data. Will call api to get data later
  const data = useMemo(() => genRandomTree(1000), []);

  const fake_data = useMemo(() => {
    const dummyDataLinks = data.links.filter((number) => {
      const targetDummy: NodeObject = number.target as NodeObject;
      const sourceDummy: NodeObject = number.source as NodeObject;

      return (
        targetDummy.id == Number(selector) || sourceDummy.id == Number(selector)
      );
    });
    const bonusNodes: number[] = [];
    if (Number(selector) !== 0) {
      bonusNodes.push(Number(selector));
    }
    for (let i = 0; i < dummyDataLinks.length; i++) {
      const temp1 = dummyDataLinks[i].source as NodeObject;
      const temp2 = dummyDataLinks[i].target as NodeObject;
      bonusNodes.push(temp1.id as number);
      bonusNodes.push(temp2.id as number);
    }

    const dummyDataNode = data.nodes.filter((item) =>
      bonusNodes.includes(item.id)
    );

    const data_final: GrapDataTransaction = {
      links: dummyDataLinks,
      nodes: dummyDataNode,
    };
    return data_final;
  }, [data.links, data.nodes, selector]);

  useEffect(() => {
    setGraphData(selector.length ? fake_data : data);
    setAllowFit(true);
  }, [data, fake_data, selector.length]);

  const maxNodeVal =
    graphData && Math.max(...graphData.nodes.map((node) => node.val));

  const maxNode = graphData?.nodes.find((node) => node.val === maxNodeVal);

  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(ref.current.offsetWidth);
  }, [widthSize]);

  return (
    <div ref={ref}>
      <ForceGraph2D
        width={width}
        backgroundColor='#151515'
        ref={fgRef}
        graphData={graphData}
        nodeAutoColorBy='id'
        nodeVal={(node: any) => node.val}
        linkColor={(d: any) => d.source.color}
        linkDirectionalArrowRelPos={1}
        linkDirectionalArrowLength={2}
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
