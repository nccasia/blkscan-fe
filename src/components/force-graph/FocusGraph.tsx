import React, { useEffect, useMemo, useRef, useState } from 'react'
import ForceGraph2D, { ForceGraphMethods } from 'react-force-graph-2d'

import { genRandomTree } from '../force-graph/data'

const FocusGraph = () => {
  const [graphData, setGraphData] = useState<any>()
  const [allowFit, setAllowFit] = useState(true)
  const fgRef = useRef<ForceGraphMethods>()

  //Mock data. Will call api to get data later
  const data = useMemo(() => genRandomTree(1000), [])

  useEffect(() => {
    setGraphData(data)
    setAllowFit(true)
  }, [data])

  const maxNodeVal =
    graphData && Math.max(...graphData?.nodes?.map((node: any) => node.val))

  const maxNode = graphData?.nodes.find((node: any) => node.val === maxNodeVal)

  return (
    <ForceGraph2D
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
            (node: any) => node.id === maxNode?.id
          )
        }
      }}
      onEngineStop={() => setAllowFit(false)}
      onNodeClick={(current) => {
        fgRef.current?.zoomToFit(
          500,
          250,
          (node: any) => node.id === current?.id
        )
      }}
    />
  )
}

export default FocusGraph
