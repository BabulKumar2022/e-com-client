import React from 'react'
import Layout from '../../components/Layout'
import UserMenu from '../../components/UserMenu'

const Order = () => {
  return (
    <Layout title="Orders">
               <div className="container-fluid m-3 p-3">
               <h1 className='text-center'>User Dashboard</h1>  
        <hr/>
            <div className="row">
                <div className="col-md-3">
                    <UserMenu/>
                </div>
                <div className="col-md-9">
                    <h2 className='text-center'>Your Orders</h2>
                </div>
            </div>
        </div>

    </Layout>
  )
}

export default Order