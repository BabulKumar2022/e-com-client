import React from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'

const Users = () => {
  return (
    <Layout title={"dashboard-all-user"}>
        <div className="container-fluid m-3 p-3">
        <h1 className='text-center'>AdminDashboard</h1>  
            <hr/>
        <div className="row">
            <div className="col-md-3">
                <AdminMenu/>
            </div>
            <div className="col-md-9">   <h1>All Users</h1> </div>
        </div>
        </div>

    </Layout>
  )
}

export default Users