import React from 'react'
import './Loading.scss';
const Loading = () => {
    return (
        <div className="spinner">
            {/* <div class="loadingio-spinner-ball-iwb3zxowudk"><div class="ldio-nknonbit19r">
                <div></div>
            </div></div> */}
            <div class="ring">Loading
                <span className='span'></span>
            </div>
        </div>
    )
}

export default Loading;