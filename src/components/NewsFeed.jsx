import React, { useState ,useEffect, useRef } from 'react'
import categories from '../assets/data'
import { FaNewspaper ,FaHome,FaArrowCircleUp,FaArrowCircleDown} from "react-icons/fa";
import { IoReloadCircleSharp } from "react-icons/io5";
import { FcLike , FcLikePlaceholder} from "react-icons/fc";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FastAverageColor } from "fast-average-color";
import { MdSportsCricket } from "react-icons/md";
import { GrTechnology } from "react-icons/gr";
import { FaBookOpen} from "react-icons/fa";
// import { IoIosMore } from "react-icons/io";


import '../CSS/newsfeed.css'
const NewsFeed = () => {
    // console.log(categories)
    let [category,setcategory]=useState("topstories");
    let [currentIndex, setCurrentIndex] = useState(0);
    let [like,setlike]=useState(false);
    const [bgColor, setBgColor] = useState("grey"); 
    const [showMore, setShowMore] = useState(false);
    const items = categories[category];
    const maxLength = 50;
    const navbarRef = useRef(null);

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

    const scrollRight = () => {
      if (navbarRef.current) {
        navbarRef.current.scrollBy({
          left: 100, // scroll amount (adjust as needed)
          behavior: 'smooth',
        });
      }
    };

    const scrollleft=()=>{
     if(navbarRef.current){ navbarRef.current.scrollBy({
      left:-100,
      behavior:'smooth'
    })
  }};

  return (
    <div className='body' style={{ backgroundColor: bgColor }}>
        <div className='navbar'>
          <div className='logo'>
            <div className='logo1'><FaNewspaper style={{fontSize: "200%"}} color='grey'/><div className='title'>NewsFeed</div></div>
            <div className='homelogo' onClick={()=>{window.location.reload()}}>
            <FaHome style={{fontSize: "200%"}} color='grey'/>
            </div>
           </div>
        </div>
        <div className='navbody1'>
           <div className='prevlogo' onClick={scrollleft}><IoIosArrowDropleft color='white' size={25}/></div> 
           <div className='navbody' ref={navbarRef}>
            <div  className="navcard" onClick={()=>{setcategory("topstories")}}>
              <div><FaMoneyBillTrendUp style={{marginRight:"10%"}} /></div><div>Trending{category==="topstories"?<hr style={{height:"20%"}}/>:<></>}</div>
              </div>
            <div className="navcard" onClick={()=>{setcategory("sports")}}><div ><MdSportsCricket style={{marginRight:"10%"}}/></div><div>Sports{category==="sports"?<hr/>:<></>}</div></div>
            <div  className="navcard" onClick={()=>{setcategory("tech")}}><div><GrTechnology style={{marginRight:"10%"}}/></div><div>Tech{category==="tech"?<hr/>:<></>}</div></div>
           <div className="navcard" onClick={()=>{setcategory("education")}}> <div><FaBookOpen style={{marginRight:"10%"}}/></div><div>Education{category==="education"?<hr/>:<></>}</div></div>
           </div>
           <div className='nextlogo' onClick={scrollRight}><IoIosArrowDropright color='white' size={25}/></div>
           </div>
        <div className='content'>
          {
            items.length>0 && (
              <>
              
                <div className='mainbody'>
                  <div className='imgcard'style={{
    backgroundColor: "white",
    backgroundImage: `url(${items[currentIndex].img})`,
    backgroundSize: "cover", 
    backgroundPosition: "center",
    objectFit:"fill"
     
  }}>
                    {
                    <div className='imgdescription'>
                      <p> {showMore ? items[currentIndex].description 
                  : items[currentIndex].description.substring(0, maxLength)+"..." }
                  {items[currentIndex].description.length > maxLength && (
                    <button style={{color:"rgb(87, 87, 239)",
                    borderRadius:"20px",
                    height:"23px",
                    marginLeft:"10px",
                    width:"90px",
                    border:"none",
                    backgroundColor:" rgba(255, 255, 255, 0.2)"}} onClick={() => setShowMore(!showMore)}>
                        {showMore ? "Show Less" :  "Show More"}
                    </button>
                )}</p>
                <a href={items[currentIndex].url}> <button style={{color:"rgb(251, 251, 251)",
                    borderRadius:"20px",
                    height:"23px",
                    marginLeft:"10px",
                    width:"90px",
                    marginBottom:"15px",
                    border:"none",
                    textDecoration:"none",
                    backgroundColor:" rgba(255, 255, 255, 0.2)"}} >
                        Know more...
                    </button></a>
                  
                          
                    </div> }
                  </div>
                  <div className='btns' >
                    <button onClick={()=>{like?setlike(false):setlike(true)}}>{like?<FcLike size={30}/>:<FcLikePlaceholder  size={30}/>}</button>
                  <button  onClick={()=>{handlePrev();setlike(false);setShowMore(false)}}><FaArrowCircleUp  size={30}/></button>
                  <button  onClick={()=>{handleNext();setlike(false);setShowMore(false)}}><FaArrowCircleDown size={30}/></button>
                  <button  onClick={()=>{window.location.reload()}}><IoReloadCircleSharp size={35} /></button>
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
