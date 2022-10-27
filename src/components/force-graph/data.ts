import { GraphData } from 'react-force-graph-2d'
const colors = ['#f90707', '#588cd8', '#e5b590']
const genRandomTree = (N = 300, reverse = false) => {
  const nodes = [...Array(N).keys()].map((i) => ({
    id: i,
  }))

  const links = [...Array(N).keys()]
    .filter((id) => id)
    .map((id) => {
      const target = Math.round(Math.random() * (nodes?.length - 1))

      return {
        [reverse ? 'target' : 'source']: id,
        [reverse ? 'source' : 'target']: id === target ? target + 1 : target,
      }
    })

  const data: GraphData & any = {
    nodes: nodes?.map((node) => {
      return {
        ...node,
        val: links?.filter((link) => link.target === node.id)?.length,
        color:
          links?.filter((link) => link.target === node.id)?.length < 2
            ? colors[2]
            : links?.filter((link) => link.target === node.id)?.length < 5
            ? colors[1]
            : colors[0],
      }
    }),
    links: links,
  }
  return data
}
export { genRandomTree }
