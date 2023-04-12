import React from 'react'
import Layout from '../components/Layout'

const AboutPage = () => {
  return (
    <Layout title={"About us"}>
     <div className="row contactus">
      <div className="col-md-6">
        <img src="/images/about.jpg" alt="contactus" style={{width: "100%"}} />
      </div>
      <div className="col-md-6">
       <h1 className="bg-dark p-2 text-white text-center">About US</h1>
       <p className="text-justify mt-2">Any query and info about our product , contact our customer relation officer 24X7 </p>
        <p className="mt-3">
          : 0170000000
        </p>
        <p className="mt-3">
          : 02-023-2500-23
        </p>
        <p className="mt-3">
           : babulkumar@gmail.com
        </p>

      </div>
     </div>
    </Layout>

  )
}

export default AboutPage