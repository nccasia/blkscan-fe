/* eslint-disable @typescript-eslint/no-explicit-any */
import { randomGraph } from '@/components/monitor-graph/data';
import React, { useEffect, useState } from 'react';
import { ForceGraph2D } from 'react-force-graph';

const FocusGraph = () => {
  const [data, setData] = useState(randomGraph());
  useEffect(() => {
    setData(randomGraph());
  }, []);

  return (
    <div className='w-full'>
      <ForceGraph2D
        width={1400}
        height={600}
        backgroundColor='#151515'
        graphData={data}
        nodeRelSize={1}
        linkDirectionalArrowLength={3}
        linkDirectionalParticles={2}
        linkDirectionalParticleWidth={2}
        linkDirectionalParticleSpeed={0.01}
        enableNodeDrag={false}
        nodeCanvasObjectMode={() => 'after'}
        linkColor={(link: any) => link.source.color}
        nodeCanvasObject={(node: any, ctx) => {
          ctx.font = `3px Sans-Serif`;
          ctx.textAlign = 'left';
          ctx.fillStyle = '#fff';
          ctx.textBaseline = 'middle';
          const lines = node.name;
          ctx.fillText(lines, Number(node.x + node.val), Number(node.y));
        }}
      />
    </div>
  );
};

export default FocusGraph;
