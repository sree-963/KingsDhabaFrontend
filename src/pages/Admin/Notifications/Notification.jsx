import React from 'react'
import Navbar from '../../../components/navbar/Navbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import NotificationForm from './components/NotificationForm'

const Notification = () => {
  return (
    
    <div className="product-alignments">
    <div className="left" style={{height:"100vh"}}>
      <Sidebar />
    </div>
    <div className="right">
      <div className="top-product">
        <Navbar type="notifications" />
      </div>
      <div className="bottom-product">
      <NotificationForm/>
      </div>
    </div>
  </div>

        





  )
}

export default Notification