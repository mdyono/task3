import React, { useState ,useEffect } from 'react'
import categories from '../assets/data'
import { FaNewspaper ,FaHome,FaArrowCircleUp,FaArrowCircleDown} from "react-icons/fa";
import { IoReloadCircleSharp } from "react-icons/io5";
import { FcLike , FcLikePlaceholder} from "react-icons/fc";
import { FastAverageColor } from "fast-average-color";


import '../CSS/newsfeed.css'
const NewsFeed = () => {
    // console.log(categories)
    let [category,setcategory]=useState("topstories");
    let [currentIndex, setCurrentIndex] = useState(0);
    let [like,setlike]=useState(false);
    const [bgColor, setBgColor] = useState("grey"); 
    const items = categories[category];

    useEffect(() => {
      const fac = new FastAverageColor();
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = items[currentIndex].img;
  
      img.onload = () => {
        const color = fac.getColor(img);
        setBgColor(color.rgb);
      };
    }, [currentIndex]);

    const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);      
    };
    // console.log(items)

    const handlePrev = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? items.length - 1 : prevIndex - 1
      );
    };
  return (
    <div className='body' style={{ backgroundColor: bgColor }}>
        <div className='navbar'>
          <div className='logo'>
            <div><FaNewspaper size={40} color='white'/>  </div>
            <div className='title'>NewsFeed</div>
          
            <div className='homelogo' onClick={()=>{window.location.reload()}}>
            <FaHome size={40} color='white'/>
            </div>
           </div>
           <div className='navbody'>
            <div  className="navcard" onClick={()=>{setcategory("topstories")}}><div>Top-Stories</div>{category==="topstories"?<hr/>:<></>}</div>
            <div className="navcard" onClick={()=>{setcategory("sports")}}><div >Sports</div>{category==="sports"?<hr/>:<></>}</div>
            <div  className="navcard" onClick={()=>{setcategory("tech")}}><div>Tech</div>{category==="tech"?<hr/>:<></>}</div>
           <div className="navcard" onClick={()=>{setcategory("education")}}> <div>Education</div>{category==="education"?<hr/>:<></>}</div>
           </div>
        </div>
        <div className='content'>
          {
            items.length>0 && (
              <>
              <h1 className='btitle'>{category.toUpperCase()}</h1>
                <div className='mainbody'>
                  <div className='imgcard' style={{ backgroundColor: "white"} }>
                    <div className='imgtitle'>
                      <h1>{items[currentIndex].type}</h1>
                    </div>
                    <div className='image1'>
                      <img src={items[currentIndex].img} alt="" />
                    </div>
                    <div className='imgdescription'>
                          <p>{items[currentIndex].description}</p>
                    </div>
                  </div>
                  <div className='btns'>
                    <button onClick={()=>{like?setlike(false):setlike(true)}}>{like?<FcLike size={30}/>:<FcLikePlaceholder size={30}/>}</button>
                  <button onClick={()=>{handlePrev();setlike(false)}}><FaArrowCircleUp size={25}/></button>
                  <button onClick={()=>{handleNext();setlike(false)}}><FaArrowCircleDown size={25}/></button>
                  <button onClick={()=>{window.location.reload()}}><IoReloadCircleSharp size={30} /></button>
                  </div>

                </div>
               
              </>
            )
          }

        </div>

            </div>
   
  )
}

export default NewsFeed
{/* <div>
{categories.TopStories.map(({id,img,description,type})=>{
  return(
     <div key={id}> 
     <img src={img} alt="" />
      <h4>{description}</h4>
      <h1>{type}</h1>
      </div>

      
  )
})}
</div> */}