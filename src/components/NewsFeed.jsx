import React, { useState, useEffect, useRef } from 'react'
import categories from '../assets/data'
// import { FaNewspaper ,FaHome,FaArrowCircleUp,FaArrowCircleDown} from "react-icons/fa";
// import { IoReloadCircleSharp } from "react-icons/io5";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { FaArrowRotateRight, FaMoneyBillTrendUp } from "react-icons/fa6";
import { FastAverageColor } from "fast-average-color";
import { MdSportsCricket } from "react-icons/md";
import { GrTechnology } from "react-icons/gr";
import { FaBookOpen } from "react-icons/fa";
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
import { IoMdShare } from "react-icons/io";


// import { IoIosMore } from "react-icons/io";


import '../CSS/newsfeed.css'
const NewsFeed = () => {
  // console.log(categories)
  let [category, setcategory] = useState("topstories");
  let [currentIndex, setCurrentIndex] = useState(0);
  let [like, setlike] = useState(false);
  const [bgColor, setBgColor] = useState("grey");
  const [showMore, setShowMore] = useState(false);
  const items = categories[category];
  const [maxLength, setMaxLength] = useState(100);
  const imgCardRef = useRef(null);
  // const maxLength = 80;
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

  const scrollleft = () => {
    if (navbarRef.current) {
      navbarRef.current.scrollBy({
        left: -100,
        behavior: 'smooth'
      })
    }
  };
  useEffect(() => {
    const updateMaxLength = () => {
      if (imgCardRef.current) {
        const width = imgCardRef.current.offsetWidth;
        // console.log(width)
        if (width <= 670) {
          setMaxLength(80);
        } else {
          setMaxLength(100);
        }
      }
    };

    updateMaxLength();

    window.addEventListener('resize', updateMaxLength);

    return () => {
      window.removeEventListener('resize', updateMaxLength);
    };
  }, []);

  return (
    <div className='body' style={{ backgroundColor: bgColor, height: "calc(var(--vh, 1vh) * 100)"  }}>
      {/* <div className='navbar'>
          <div className='logo'>
            <div className='logo1'><FaNewspaper style={{fontSize: "200%"}} color='grey'/><div className='title'>NewsFeed</div></div>
            <div className='homelogo' onClick={()=>{window.location.reload()}}>
            <FaHome style={{fontSize: "200%"}} color='grey'/>
            </div>
           </div>
        </div> */}
      <div className='navbody1'>
        <div className='prevlogo' onClick={scrollleft}><IoIosArrowDropleft color='white' size={35} /></div>
        <div className='navbody' ref={navbarRef}>
          <div className="navcard" onClick={() => { setcategory("topstories") }}>
            <div><FaMoneyBillTrendUp style={{ marginRight: "10%" }} /></div><div>Trending{category === "topstories" ? <hr style={{ height: "20%" }} /> : <></>}</div>
          </div>
          <div className="navcard" onClick={() => { setcategory("sports") }}><div ><MdSportsCricket style={{ marginRight: "10%" }} /></div><div>Sports{category === "sports" ? <hr /> : <></>}</div></div>
          <div className="navcard" onClick={() => { setcategory("tech") }}><div><GrTechnology style={{ marginRight: "10%" }} /></div><div>Tech{category === "tech" ? <hr /> : <></>}</div></div>
          <div className="navcard" onClick={() => { setcategory("education") }}> <div><FaBookOpen style={{ marginRight: "10%" }} /></div><div>Education{category === "education" ? <hr /> : <></>}</div></div>
        </div>
        <div className='nextlogo' onClick={scrollRight}><IoIosArrowDropright color='white' size={35} /></div>
      </div>
      <div className='content' ref={imgCardRef} style={{
        backgroundColor: bgColor,

      }}>
        {
          items.length > 0 && (
            <>

              <div className='mainbody'>
                <div className='imgcard' ref={imgCardRef} style={{
                  backgroundColor: "white",
                  backgroundImage: `url(${items[currentIndex].img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  objectFit: "fill"

                }}>

                  <div className='btns' >
                    <button onClick={() => { like ? setlike(false) : setlike(true) }}>{like ? <FcLike /> : <FcLikePlaceholder />}</button>
                    <button onClick={() => { handlePrev(); setlike(false); setShowMore(false) }}><FaArrowUp color='white' /></button>
                    <button onClick={() => { handleNext(); setlike(false); setShowMore(false) }}><FaArrowDown /></button>
                    <button onClick={() => { window.location.reload() }}><FaArrowRotateRight /></button>
                  </div>
                  {
                    <div className='imgdescription'>
                      <p style={{ cursor: "pointer" }} onClick={() => setShowMore(!showMore)}> {showMore ? items[currentIndex].description
                        : items[currentIndex].description.substring(0, maxLength)}
                        {items[currentIndex].description.length > maxLength && (
                          <span
                            style={{
                              // color:"rgb(87, 87, 239)",
                              borderRadius: "20px",
                              height: "23px",
                              // marginLeft:"10px",
                              width: "30px",
                              fontSize: "20px",
                              textAlign: "center",
                              border: "none",
                              // backgroundColor:" rgba(255, 255, 255, 0.2)"
                            }}
                            onClick={() => setShowMore(!showMore)}>
                            {showMore ? "" : "..."}
                          </span>
                        )}</p>
                      <div className='description_btns' style={{ display: "flex" }}>
                        <a href={items[currentIndex].url}> <button style={{
                          color: "rgb(251, 251, 251)",
                          borderRadius: "20px",
                          height: "40px",
                          marginLeft: "10px",
                          width: "130px",
                          marginBottom: "15px",
                          cursor: "pointer",
                          border: "none",
                          fontSize: "18px",
                          textDecoration: "none",
                          backgroundColor: " rgba(28, 27, 27, 0.48)"
                        }} >
                          Know more...
                        </button></a>
                        <a href="#"><button style={{
                          color: "rgb(251, 251, 251)",
                          borderRadius: "20px",
                          height: "40px",
                          marginLeft: "10px",
                          width: "40px",
                          cursor: "pointer",
                          fontSize: "18px",
                          marginBottom: "15px",
                          border: "none",
                          textDecoration: "none",
                          backgroundColor: " rgba(28, 27, 27, 0.48)"
                        }}>
                          <IoMdShare />
                        </button></a>
                      </div>


                    </div>}

                </div>


              </div>


              {/* {
                    <div className='imgdescription'>
                      <p  style={{cursor:"pointer"}} onClick={() => setShowMore(!showMore)}> {showMore ? items[currentIndex].description 
                  : items[currentIndex].description.substring(0, maxLength) }
                  {items[currentIndex].description.length > maxLength && (
                    <span 
                    style={{
                      // color:"rgb(87, 87, 239)",
                    borderRadius:"20px",
                    height:"23px",
                    // marginLeft:"10px",
                    width:"30px",
                    fontSize:"20px",
                    textAlign:"center",
                    border:"none",
                    // backgroundColor:" rgba(255, 255, 255, 0.2)"
                    }}
                     onClick={() => setShowMore(!showMore)}>
                        {showMore ? "" :  "..."}
                    </span>
                )}</p>
                <div style={{display:"flex"}}>
                <a href={items[currentIndex].url}> <button style={{color:"rgb(251, 251, 251)",
                    borderRadius:"20px",
                    height:"28px",
                    marginLeft:"10px",
                    width:"100px",
                    marginBottom:"15px",
                    cursor:"pointer",
                    border:"none",
                    textDecoration:"none",
                    backgroundColor:" rgba(255, 255, 255, 0.2)"}} >
                        Know more...
                    </button></a>
                    <a href="#"><button style={{color:"rgb(251, 251, 251)",
                    borderRadius:"20px",
                    height:"28px",
                    marginLeft:"10px",
                    width:"40px",
                    cursor:"pointer",
                    marginBottom:"15px",
                    border:"none",
                    textDecoration:"none",
                    backgroundColor:" rgba(255, 255, 255, 0.2)"}}>
                    <IoMdShare />
                      </button></a>
                </div>
               
                          
                    </div> } */}

            </>
          )
        }

      </div>

    </div>

  )
}

export default NewsFeed
