import React,{useState}  from "react";

import NewsContext from "./Newscontext";

const NoteState = (props) => {


  const initialNews =[
    {
      "_id": "64b4dfcb76517e3351bf027a",
      "user": "64b4def776517e3251bf0274",
      "src":"https://www.dolepro.store/uploads/2023/07/22/64bbf813975b3.png",
      "title": "[Dole Direct Store] Open for 1 hour only",
      "__v": 0
    },
    {
      "_id": "64b4dfcb76514e3251bf027a",
      "user": "64b4def776517e3251bf0274",
       "src":"https://www.dolepro.store/uploads/2023/06/28/649c6a1a878c4.png",
      "title": "[Nutrition-Series] Agency project, officially released🪅🪅🪅",
      "__v": 0
    },
    {
      "_id": "64b4dfcb46517e3251bf027a",
      "user": "64b4def776517e3251bf0274",
       "src":"https://www.dolepro.store/uploads/2023/07/22/64bbf813975b3.png",
      "title": "❣️❣️Sweet and colorful series of projects, officially released 🎉🎉🎉",
      "__v": 0
    },
    {
      "_id": "64b4dfcb76517e3751bf027a",
      "user": "64b4def776517e3251bf0274",
       "src":"	https://www.dolepro.store/uploads/2023/02/22/63f6336bea64f.jpg",
      "title": "How to make money in Dole plc?",
      "__v": 0
    },
    {
      "_id": "64b4dfcb76517e3751br027a",
      "user": "64b4def776517e3251bf0274",
       "src":"	https://www.dolepro.store/uploads/2023/02/22/63f6316f4502c.jpg",
      "title": "Our Business Model",
      "__v": 0
    },
    {
      "_id": "64b4dfdb76517e3751br027a",
      "user": "64b4def776517e3251bf0274",
       "src":"https://www.dolepro.store/uploads/2023/02/22/63f62dd237db6.jpg",
      "title": "Our Commercial Strengths",
      "__v": 0
    },
    {
      "_id": "64b4dfcb76517e3751bf527a",
      "user": "64b4def776517e3251bf0274",
       "src":"https://www.dolepro.store/uploads/2023/02/22/63f61e2ded76d.jpg",
      "title": "The Dole Brand And Products",
      "__v": 0
    },
    {
      "_id": "64b4dfcb76517e3751bg527a",
      "user": "64b4def776517e3251bf0274",
       "src":"https://www.dolepro.store/uploads/2023/02/22/63f62c1b32e80.jpg",
      "title": "About Us ",
      "__v": 0
    },
  ]
  const [news,setNews]= useState(initialNews)

  return (
    <NewsContext.Provider value={{news,setNews}}>
    {props.children}
    </NewsContext.Provider>
  );
};

export default NoteState;
