import FocusGraph from '@/components/monitor-graph/FocusGraphWrapper';
import Layout from '@/components/layout/Layout';

const Monitor = () => {
  return (
    <>
      <Layout>
        <div>
          <div>
            <FocusGraph />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Monitor;
