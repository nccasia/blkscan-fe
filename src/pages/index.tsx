import * as React from 'react'

import Layout from '@/components/layout/Layout'
import Seo from '@/components/Seo'

import FocusGraph from '../components/force-graph/FocusGraphWrapper'

export default function HomePage() {
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
  )
}
