import React from 'react';
import Navigation from '../components/nav';
import Footer from '../components/footer';
import MainPage from '../components/mainpage';

const Index = ({allJobs}) => (
  <div className="bg-gray-200">
    <Navigation/>
    <MainPage allJobs={allJobs}/>
    <Footer/>
  </div>
)

export async function getStaticProps() {
  const res = await fetch('http://127.0.0.1::3000/api/jobs')
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
