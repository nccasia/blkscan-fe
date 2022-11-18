import * as React from 'react';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import FocusGraph from '../components/force-graph/FocusGraphWrapper';

const HomePage = () => {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />
      <main>
        <div>
          <FocusGraph />
        </div>
      </main>
    </Layout>
  );
};
export default HomePage;
