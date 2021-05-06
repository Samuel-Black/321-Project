import React, { useState, useEffect } from "react"
import { shuffleArray } from '../../components/images/Image-Functions'
import SimpleBar from 'simplebar-react';
import './MixAndMatch.scss'
import 'simplebar/dist/simplebar.min.css';
import { FaHandPointUp } from 'react-icons/fa';
import { SizeMe } from 'react-sizeme';
import '../../components/Hand-Drag-Animation.scss'

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

//Known issue with Mix and Match, problem with drag and drop component when you drag the correct right card and then the correct left card if using {difficulty === 1 && } logic, find fix later
export default function MixAndMatch(props) {

    const difficulty = props.difficulty
    const levels = props.numLevels;

    const [panel1, setPanel1] = useState(null)
    const [panel2, setPanel2] = useState(null)
    const [panel3, setPanel3] = useState(null)
    const [showHand, setShowHand] = useState(false);
    const [rowWidth, setRowWidth] = useState(null);
    const [contentWidth, setContentWidth] = useState(null);

    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
      if(props.popupState === false && props.attemptNumber === 0 && difficulty > 1) {
        setShowHand(true)
        setTimeout(() => setShowHand(false), 4000)
      }
    }, [props.popupState])

    console.log(props.attemptNumber)

    function randomizeImages() {
      if(difficulty === 1) {
        props.shuffledImages.easy = shuffleArray(props.shuffledImages.easy)
      }
      if(difficulty === 2) {
        props.shuffledImages.medium.Panel1 = shuffleArray(props.shuffledImages.medium.Panel1)
        props.shuffledImages.medium.Panel2 = shuffleArray(props.shuffledImages.medium.Panel2)
      }
      if(difficulty === 3) {
        props.shuffledImages.hard.Panel1 = shuffleArray(props.shuffledImages.hard.Panel1)
        props.shuffledImages.hard.Panel2 = shuffleArray(props.shuffledImages.hard.Panel2)
        props.shuffledImages.hard.Panel3 = shuffleArray(props.shuffledImages.hard.Panel3)
      }
    }

    function winCondition(selection) {
      
      if(difficulty === 1) {
        props.setFinishTime(new Date().getTime()) // When user clicks an option set the finish time
          if(selection === 'true') {
            props.setLevelCompleted('True')
            props.setPopupState(true)
            props.setAttemptNumber(0)
            randomizeImages()
        }
        else if(selection === 'false') {
          props.setAttemptNumber(props.attemptNumber + 1)
          props.setPopupState(true)
        }
      }

      else {
        if(difficulty === 2) {
          props.setFinishTime(new Date().getTime()) // When user clicks an option set the finish time
          if(panel1 === 'true' && panel2 === 'true') {
            props.setLevelCompleted('True')
            props.setPopupState(true)
            props.setAttemptNumber(0)
          } 
          else if( (panel1 === 'false' || panel2 === 'false') ) {
            props.setAttemptNumber(props.attemptNumber + 1)
            props.setPopupState(true)
          }
        }
        if(difficulty === 3) {
          props.setFinishTime(new Date().getTime()) // When user clicks an option set the finish time
          if(panel1 === 'true' && panel2 === 'true' && panel3 === 'true') {
            props.setLevelCompleted('True')
            props.setPopupState(true)
            props.setAttemptNumber(0)
          } 
          else if(panel1 === 'false' || panel2 === 'false' || panel3 === 'false') {
            props.setAttemptNumber(props.attemptNumber + 1)
            props.setPopupState(true)
          }
        }
      }
    }

    function SetRowJustification() { // cards are cut off by the simplebar component when statically defined as centered, this is a solution
        if(contentWidth > rowWidth) {
            return '';
        } else
            return 'justify-content-center';
    }

    return (
      <>
        {difficulty <= levels &&
        <>
          {difficulty === 1 &&
            <div id='Card-Game' className="container-fluid">
              <div className="row justify-content-center">
                <SimpleBar style={{ width: '70vw' }} autoHide={false}>
                  <div className="container-fluid">
                    <SizeMe
                      monitorWidth
                      refreshRate={16}>
                      {({ size }) => 
                        <div className={`row ${SetRowJustification()}`}>
                          {setRowWidth(size.width)}
                          <SizeMe
                          monitorWidth
                          refreshRate={16}>
                              {({ size }) => 
                                <div className="d-flex">
                                  {setContentWidth(size.width)}
                                  {props.shuffledImages.easy.map((image, i) => {
                                      return(
                                        <div key={i} className="d-flex align-items-end card-option mr-2">
                                            <a onClick={() => winCondition(image.correct)} >
                                                <img src={image.default} />
                                            </a>
                                        </div>
                                      )
                                  })}
                                </div>
                              }
                          </SizeMe>
                        </div>
                        }
                    </SizeMe>
                  </div>
                </SimpleBar>
              </div>
            </div>
          }
          {difficulty > 1 &&
          <div className="container">
            {props.vertical ? 
            <>
              {showHand === true && <FaHandPointUp size={80} className="horizontal-drag-hand" />}
                {difficulty === 2 &&
                  <>
  
                    <div className= "row justify-content-center match vertical-match mt-5">

                        <Swiper
                          loop={true}
                          navigation= {{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
                          onSwiper={(s) => { // Initialize active panel as current panel on page load
                            setPanel1(props.shuffledImages.medium.Panel1[s.realIndex].correct);
                          }}
                          onSlideChange={(s) => { // update active panel as user swipes
                            setPanel1(props.shuffledImages.medium.Panel1[s.realIndex].correct);
                          }}
                        >
                            {props.shuffledImages.medium.Panel1.map((image, i) => (
                              <SwiperSlide key={'Panel1' + i}>    
                                <div className="d-flex justify-content-center">
                                  <img src={image.default} />
                               </div>
                              </SwiperSlide>
                            ))}
                        </Swiper>
                      
                    </div>

                    <div className= "row justify-content-center match vertical-match">
                      
                      <Swiper
                        loop={true}
                        navigation= {{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
                        onSwiper={(s) => { // Initialize active panel as current panel on page load
                          setPanel2(props.shuffledImages.medium.Panel2[s.realIndex].correct);
                        }}
                        onSlideChange={(s) => { // update active panel as user swipes
                          setPanel2(props.shuffledImages.medium.Panel2[s.realIndex].correct);
                        }}
                      >
                        {props.shuffledImages.medium.Panel2.map((image, i) => (
                          <SwiperSlide key={'Panel2' + i}> 
                            <div className="d-flex justify-content-center">
                              <img src={image.default} />
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                      
                    </div>
  
                    <div className= "row justify-content-center mt-1">
                      <button className="button btn-secondary" onClick={() => winCondition()}>Confirm!</button>
                    </div>
                  </>
                  }

                  {difficulty === 3 &&
                    <>
  
                      <div className= "row justify-content-center match vertical-match mt-5">

                          <Swiper
                            loop={true}
                            navigation= {{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
                            onSwiper={(s) => { // Initialize active panel as current panel on page load
                              setPanel1(props.shuffledImages.hard.Panel1[s.realIndex].correct);
                            }}
                            onSlideChange={(s) => { // update active panel as user swipes
                              setPanel1(props.shuffledImages.hard.Panel1[s.realIndex].correct);
                            }}
                          >
                              {props.shuffledImages.hard.Panel1.map((image, i) => (
                                <SwiperSlide key={'Panel1' + i}>    
                                  <div className="d-flex justify-content-center">
                                    <img src={image.default} />
                                </div>
                                </SwiperSlide>
                              ))}
                          </Swiper>
                        
                      </div>

                      <div className= "row justify-content-center match vertical-match">
                        
                        <Swiper
                          loop={true}
                          navigation= {{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
                          onSwiper={(s) => { // Initialize active panel as current panel on page load
                            setPanel2(props.shuffledImages.hard.Panel2[s.realIndex].correct);
                          }}
                          onSlideChange={(s) => { // update active panel as user swipes
                            setPanel2(props.shuffledImages.hard.Panel2[s.realIndex].correct);
                          }}
                        >
                          {props.shuffledImages.hard.Panel2.map((image, i) => (
                            <SwiperSlide key={'Panel2' + i}> 
                              <div className="d-flex justify-content-center">
                                <img src={image.default} />
                              </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                        
                      </div>

                      <div className= "row justify-content-center match vertical-match">
                        
                        <Swiper
                          loop={true}
                          navigation= {{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
                          onSwiper={(s) => { // Initialize active panel as current panel on page load
                            setPanel3(props.shuffledImages.hard.Panel3[s.realIndex].correct);
                          }}
                          onSlideChange={(s) => { // update active panel as user swipes
                            setPanel3(props.shuffledImages.hard.Panel3[s.realIndex].correct);
                          }}
                        >
                          {props.shuffledImages.hard.Panel3.map((image, i) => (
                            <SwiperSlide key={'Panel3' + i}> 
                              <div className="d-flex justify-content-center">
                                <img src={image.default} />
                              </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                        
                      </div>
    
                      <div className= "row justify-content-center mt-1">
                        <button className="button btn-secondary" onClick={() => winCondition()}>Confirm!</button>
                      </div>
                    </>
                  }
                </>
                :
                <>
                {showHand === true && <FaHandPointUp size={80} className="vertical-drag-hand" />}
                <div className="row justify-content-center mt-5">

                  <div className= "row horizontal-match match mt-5">

                    <Swiper
                      slidesPerView={1}
                      loop={true}
                      direction='vertical'
                      onSwiper={(s) => { // Initialize active panel as current panel on page load
                        setPanel1(props.shuffledImages.medium.Panel1[s.realIndex].correct);
                      }}
                      onSlideChange={(s) => {
                        setPanel1(props.shuffledImages.medium.Panel1[s.realIndex].correct);
                      }}
                    >
                        {props.shuffledImages.medium.Panel1.map((image, i) => (
                          <SwiperSlide key={i}> 
                            <img src={image.default} />
                          </SwiperSlide>
                        ))}
                    </Swiper>
                    
                    <Swiper
                      slidesPerView={1}
                      loop={true}
                      direction='vertical'
                      onSwiper={(s) => { // Initialize active panel as current panel on page load
                        setPanel2(props.shuffledImages.medium.Panel2[s.realIndex].correct);
                      }}
                      onSlideChange={(s) => {
                        setPanel2(props.shuffledImages.medium.Panel2[s.realIndex].correct);
                      }}
                    >
                      {props.shuffledImages.medium.Panel2.map((image,i) => (
                        <SwiperSlide key={i}> 
                          <img src={image.default} />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    
                  </div>

                </div>

                <div className= "row justify-content-center mt-1">
                  <button className="button btn-secondary" onClick={() => winCondition()}>Confirm!</button>
                </div>
                </>
            }
          </div>
          }
          </>
        }
      </>
    )
}
