import React from 'react';
import Navigation from '../components/nav';
import Footer from '../components/footer';
import MainPage from '../components/mainpage';
import jobs from '../data/jobs'

const Index = ({allJobs}) => (
  <div className="bg-gray-200">
    <Navigation/>
    <MainPage allJobs={allJobs}/>
    <Footer/>
  </div>
)

// export async function getStaticProps() {  
//   return {
//     props:{ allJobs : { jobs: jobs } }
//   };
// }

export async function getStaticProps() {
  const res = await fetch('https://clipboard-fullstack-testing.vercel.app/api/jobs')
  const data = await res.json()
  if (!data) {
    return {
      notFound: true,
    }
  }
  return {
    props: { allJobs: data}, // will be passed to the page component as props
  }
}

export default Index
