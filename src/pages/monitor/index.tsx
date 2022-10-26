import { randomGraph } from "@/components/data";
import FocusGraph from "@/components/FocusGraphWrapper";
import Layout from "@/components/layout/Layout";
import dynamic from "next/dynamic";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

const Monitor = () => {

  console.log(randomGraph())
  return (
    <>
      <Layout>
        <div className="layout">
          <div>
            <FocusGraph
            />
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Monitor;