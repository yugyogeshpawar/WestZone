import React from 'react';
import YoutubeEmbed from './Yt-Video';
// import Marquee from "react-fast-marquee";
import Announcement from './Announcement';
import Services from './Services';
import News from './News';

const Home = ()=>{
    return (
        <>
       <div className='container '>
        <YoutubeEmbed/>

        
        <Announcement/>
       
        <Services/>
        <News/>
            
       
       </div>
        </>
    )
}

export default Home