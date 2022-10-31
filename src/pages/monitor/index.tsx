import FocusGraph from '@/components/monitor-graph/FocusGraphWrapper';
import Layout from '@/components/layout/Layout';

const Monitor = () => {
  return (
    <>
      <Layout>
        <div className='layout'>
          <div>
            {/* test pull */}
            <FocusGraph />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Monitor;
