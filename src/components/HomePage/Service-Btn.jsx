import React from 'react';

const ServiceBtn=(props)=>{
    return (
        <>  
        <div type="button" >
            <img src={props.src} alt="" />
            <p>{props.btnName}</p>
           </div>
        </>
    )
}


export default ServiceBtn