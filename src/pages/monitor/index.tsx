import FocusGraph from '@/components/monitor-graph/FocusGraphWrapper';
import Layout from '@/components/layout/Layout';

const Monitor = () => {
  return (
    <>
      <Layout>
        <div className='layout'>
          <div>
            <FocusGraph />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Monitor;
