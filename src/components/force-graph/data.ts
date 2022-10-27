import { LinkObject, NodeObject } from 'react-force-graph-2d';

type NodeCustom = { id: number; val: number; color: string };
type Node = NodeObject & NodeCustom;
type Link = LinkObject;

export type GrapDataTransaction = {
  nodes: Node[];
  links: Link[];
};

const colors = ['#f90707', '#588cd8', '#e5b590'];

const rangArrar = (n: number) => {
  const arr: number[] = [];
  for (let i = 0; i < n; i++) {
    arr.push(i);
  }
  return arr;
};

export const genRandomTree = (N = 300, reverse = false) => {
  const nodes = [...rangArrar(N)].map((i) => ({
    id: i,
  }));

  const links = [...rangArrar(N)]
    .filter((id) => id)
    .map((id) => {
      const target = Math.round(Math.random() * (nodes?.length - 1));

      return {
        [reverse ? 'target' : 'source']: id,
        [reverse ? 'source' : 'target']: id === target ? target + 1 : target,
      };
    });

  const data: GrapDataTransaction = {
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
      };
    }),
    links: links,
  };
  return data;
};
