import React from 'react';
import Marquee from "react-fast-marquee";

const Announcement=()=>{
    return (
        <>
        <div className="noticebox d-flex justify-content-center w-100" >

        <div className='indexnotice'>
        <span className="announceicon">
        <i class="fa-solid fa-bullhorn announceiconimg"></i>
        </span>
        <Marquee speed={70}>
        [UAE Market] Official release, expected to be sold out in 1-2 days, if you have a plan, please make a choice as soon as possible
        </Marquee>
        </div>
        
            
        </div>
        </>
    )
}

export default Announcement