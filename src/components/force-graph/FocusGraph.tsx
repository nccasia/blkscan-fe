import React from 'react';
import ForceGraph2D from 'react-force-graph-2d';

import data from '../force-graph/data';
const FocusGraph = () => {
  return <ForceGraph2D graphData={data} />;
};

export default FocusGraph;
