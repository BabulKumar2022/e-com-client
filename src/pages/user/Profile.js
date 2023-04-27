import React from 'react'
import Layout from '../../components/Layout'
import UserMenu from '../../components/UserMenu'

const Profile = () => {
  return (
    <Layout title="Profile">
        <div className="container-fluid m-3 p-3">
        <h1 className='text-center'>User Dashboard</h1>  
        <hr/>
            <div className="row">
                <div className="col-md-3">
                    <UserMenu/>
                </div>
                <div className="col-md-9">
                    <h2 className='text-center'>Your profile</h2>
                </div>
            </div>
        </div>

    </Layout>
  )
}

export default Profile