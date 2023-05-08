import React from 'react'
import './PageNotFound.scss'
import { NavLink } from 'react-router-dom'
const PageNotFound = () => {

  return (
    <>
      <section class="page_404">
        <div class="container">
          <div class="row">
            <div class="col-sm-12 ">
              <div class="col-sm-10 col-sm-offset-1  text-center">
                <div class="four_zero_four_bg">
                  <h4 style={{ textAlign: "center", color: "black" }}> 404 Page Not Found </h4>
                  <p style={{ textAlign: "center", color: "black", padding: "10px" }}>The page you are looking for not available!</p>
                </div>
                <NavLink to="/admin/dashboard">
                  <h3 style={{ backgroundColor: "blue", color: "white", padding: "10px", borderRadius: "5px" }}>Back To Home</h3>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default PageNotFound