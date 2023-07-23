import React from "react";

const NewsItem = (props) => {
  const { singleNews } = props;
  return (
   
        
  
    <div className="col-md-6 text-center my-2 container-fluid">
      <div className="card mx-auto" style={{ width: "30rem" }}>
      
      <img class="card-img-top container" src={singleNews.src} alt="" style={{ height: "15rem" }}/>
        <div className="card-body">
        <div className="d-flex align-items-center">
        <h5 className="card-title">{singleNews.title}</h5>

        </div>
          <p className="card-text">{singleNews.description}</p>
        </div>

      </div>
    </div>
    

  );
};
export default NewsItem;
