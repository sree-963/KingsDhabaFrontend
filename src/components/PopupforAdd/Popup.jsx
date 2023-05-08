import React from 'react'
import './Popup.scss';
const Popup = () => {
    return (
        <div className="spinner">
        <div class="lds-facebook"><div></div><div></div><div></div></div>
            <h2 style={{ color: "white" }}>Please Wait...</h2>
        </div>
    )
}

export default Popup;