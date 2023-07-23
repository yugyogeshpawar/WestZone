import React from "react";
import PropTypes from "prop-types";

const YoutubeEmbed = () => (
//   <div className="">
//     <iframe
//     /
//     src="https://www.dolepro.store/public/video/1.mp4?v=0.1"
//     poster=""
//       allow="accelerometer, autoplay, clipboard-write,encrypted-media, gyroscope, picture-in-picture"
//       allowFullScreen
//       title="Embedded youtube"
//     />
//   </div>

<div className="indexvideo">

<div class="embed-responsive embed-responsive-21by9 my-2" style={{height: "57vh", display: "flex",justifyContent: "center"}}>
<iframe title="Embedded youtube" 
class="embed-responsive-item" 
src="https://www.dolepro.store/public/video/1.mp4?v=0.1"
poster="./sample.webp"
allow="accelerometer, autoplay, clipboard-write,encrypted-media, gyroscope, picture-in-picture"
 allowfullscreen>
 </iframe>
</div>
</div>

);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;