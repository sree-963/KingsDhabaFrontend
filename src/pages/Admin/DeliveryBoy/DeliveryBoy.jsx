import React from 'react'
import CreateDeliveryForm from './Components/CreateDeliveryForm'
import Navbar from '../../../components/navbar/Navbar'
import Sidebar from '../../../components/sidebar/Sidebar'
const DeliveryBoy = () => {
  return (
    
    <div className="product-alignments">
    <div className="left" style={{height:"100vh"}}>
      <Sidebar />
    </div>
    <div className="right">
      <div className="top-product">
        <Navbar type="deliveryboy" />
      </div>
      <div className="bottom-product">
        {/* <ProductList /> */}
        <CreateDeliveryForm/>
      </div>
    </div>
  </div>

        





  )
}

export default DeliveryBoy