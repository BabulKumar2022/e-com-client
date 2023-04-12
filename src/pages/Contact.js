import React from 'react'
import Layout from '../components/Layout'
import { BiMailSend, BiPhoneCall, BiSupport} from 'react-icons/bi'


const Contact = () => {
  return (
    <Layout title={'contact us'}>
     <div className="row contactus">
      <div className="col-md-6">
        <img src="/images/contact.jpg" alt="contactus" style={{width: "100%"}} />
      </div>
      <div className="col-md-6">
       <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
       <p className="text-justify mt-2">Any query and info about our product , contact our customer relation officer 24X7 </p>
        <p className="mt-3">
          <BiPhoneCall/> : 0170000000
        </p>
        <p className="mt-3">
          <BiSupport/> : 02-023-2500-23
        </p>
        <p className="mt-3">
          <BiMailSend/> : babulkumar@gmail.com
        </p>

      </div>
     </div>
    </Layout>
  )
}

export default Contact