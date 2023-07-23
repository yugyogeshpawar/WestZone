import React, { useContext } from 'react';
import newsContext from '../Context_News/Newscontext';
import NewsItem from "./NewsItem"

function News(props){

    const context = useContext(newsContext)
     // eslint-disable-next-line
     const {news,setNews}=context


 return (
<section className='row text-center'>
<h1 className="col-12 my-4">News</h1>


{
    news.map((singleNews)=>{
        return <NewsItem key={singleNews._id} singleNews={singleNews}/>;
    })
}   
</section>

 )
}

export default News