import React from 'react'
import Layout from '../../components/Layout'
import UserMenu from '../../components/UserMenu';
import { useAuth } from '../../context/auth';

const Dashboard = () => {
  const [auth]= useAuth();
  return (
    <Layout title={"User Dashboard"}>
      <div className="container-fluid m-3 p-3">
        <h1 className='text-center'>User Dashboard</h1>  
        <hr/>
        <div className="row">
          <div className="col-md-3">
          <UserMenu/>
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>User Name: {auth?.user?.name}</h3>
              <h3> User Email: {auth?.user?.email}</h3>
              <h3>User Address: {auth?.user?.address}</h3>
            </div>
          </div>
        </div>
      </div>

  
    </Layout>
  )
}

export default Dashboard;