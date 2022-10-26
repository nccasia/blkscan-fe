import randomstring from 'randomstring';

export const COLORS = ['red', '#f7e27e', '#84c8df'];

export type targetNode = {
  id: number;
  address: string;
};

export type Node = {
  id: number;
  address: string;
  transactionAmount: number;
  targetNodes: number[];
}

export type NodeGraph = {
  id: number;
  val: number;
  color: string;
  name: string;
}

export type Link = {
  source: number;
  target: number;
  name: string;
}

export type Graph = {
  nodes: NodeGraph[];
  links: Link[];
}

export const randomNode = (id: number) => {
  const address = randomstring.generate();
  const transactionAmount = id < 80 ? Math.floor(Math.random() * 3) : Math.floor(Math.random() * 10);
  const targetNodes = [];
  for (let i = 0; i < transactionAmount; i++) {
    const randomId = Math.floor(Math.random() * 100);
    targetNodes.push(randomId);
  }
  const Node: Node = { id, address, transactionAmount, targetNodes };
  return Node;
}

export const randomGraph = (): Graph => {
  const nodes: NodeGraph[] = [];
  const links: Link[] = [];
  for (let id = 0; id < 100; id++) {
    const startNode = randomNode(id);
    let val = startNode.transactionAmount;
    let color = "";
    if (val < 3) {
      color = COLORS[2];
    }
    else if (val < 8) {
      color = COLORS[1];
    }
    else {
      val *= 2;
      color = COLORS[0];
    }
    const name = `Node ${id}`;
    const node = { id, val, color, name };
    nodes.push(node);
    const source = startNode.id;
    startNode.targetNodes.forEach((node) => {
      const target = node;
      links.push({
        source,
        target,
        name: `Link from node ${source} to ${target}`
      });
    })
  }
  const graph = { nodes, links };
  return graph;
}