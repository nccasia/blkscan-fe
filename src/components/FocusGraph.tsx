import React from 'react'
import { ForceGraph2D } from 'react-force-graph'
import data from './data'


const FocusGraph = () => {
  return (
    <>
      <ForceGraph2D 
      backgroundColor="#151515"
      graphData={data} />
    </>
  )
}

export default FocusGraph;