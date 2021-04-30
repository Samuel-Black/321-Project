import React, { useState, useEffect } from "react"
import Source from "../../components/mixandmatch/Source"
import Target from "../../components/mixandmatch/Target"
import { shuffleArray } from '../../components/images/Image-Functions'
import { ItemTypes } from '../../components/DragItemTypes'
import SimpleBar from 'simplebar-react';
import './MixAndMatch.scss'
import 'simplebar/dist/simplebar.min.css';

import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar]);

//Known issue with Mix and Match, problem with drag and drop component when you drag the correct right card and then the correct left card if using {difficulty === 1 && } logic, find fix later
export default function MixAndMatch(props) {

    const difficulty = props.difficulty
    const levels = props.numLevels;

    const [droppedItemPanel1, setDroppedItemPanel1] = useState({})
    const [droppedItemPanel2, setDroppedItemPanel2] = useState({})
    const [droppedItemPanel3, setDroppedItemPanel3] = useState({})

    const [panel1, setPanel1] = useState(null)
    const [panel2, setPanel2] = useState(null)
    const [panel3, setPanel3] = useState(null)

    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        
        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    console.log(panel1)

    const [errorMessage, setErrorMessage] = useState(null)

    onDropPanel1 = onDropPanel1.bind(this)
    onDropPanel2 = onDropPanel2.bind(this)
    onDropPanel3 = onDropPanel3.bind(this)

    useEffect(() => {
      if(props.popupState === false) {
        clearDroppedCards()
        randomizeImages()
        props.setStartTime(new Date().getTime())
      }
    }, [props.popupState])
  
    function onDropPanel1(item) {
      setDroppedItemPanel1(item)
    }
    function onDropPanel2(item) {
      setDroppedItemPanel2(item)
    }
    function onDropPanel3(item) {
      setDroppedItemPanel3(item)
    }

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

    function clearDroppedCards() {
      setDroppedItemPanel1({})
      setDroppedItemPanel2({})
      if(difficulty === 3) {
        setDroppedItemPanel3({})
      }
    }

    function winCondition(selection) {
      
      if(difficulty === 1) {
        props.setFinishTime(new Date().getTime()) // When user clicks an option set the finish time
          if(selection === 'true') {
            props.setLevelCompleted('True')
            props.setPopupState(true)
            props.setAttemptNumber(0)
        }
        else if(selection === 'false') {
          props.setAttemptNumber(props.attemptNumber + 1)
          props.setPopupState(true)
          randomizeImages()
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
          else if(panel1 === 'false' && panel2 === 'false' && panel3 === 'false') {
            props.setAttemptNumber(props.attemptNumber + 1)
            props.setPopupState(true)
          }
        }
      }
    }

    return (
      <>
        {difficulty <= levels &&
        <>
          {difficulty === 1 &&
            <div className="container-fluid">
              <div className="row justify-content-center">
                <SimpleBar style={{ width: '70vw' }} autoHide={false}>
                  <div className="container-fluid">
                    <div className={`row ${windowSize.width < 1334 ? '' : 'justify-content-center'}`}>
                      <div className="d-flex">
                        {props.shuffledImages.easy.map((image, i) => {
                            return(
                                <div key={i} className="card-option mr-2">
                                    <a onClick={() => winCondition(image.correct)} >
                                        <img src={image.default} />
                                    </a>
                                </div>
                            )
                        })}
                      </div>
                    </div>
                  </div>
                </SimpleBar>
              </div>
            </div>
          }
          {difficulty > 1 &&
          <div className="container">
            {props.vertical ? 
            <>
                  
                {difficulty === 2 &&
                  <>
  
                    <div className= "row justify-content-center vertical-match mt-5">

                        <Swiper
                          loop={true}
                          pagination={{ clickable: true, el: '.swiper-pagination' }}
                          onSwiper={(s) => { // Initialize active panel as current panel on page load
                            setPanel1(props.shuffledImages.hard.Panel1[s.realIndex].correct);
                          }}
                          onSlideChange={(s) => { // update active panel as user swipes
                            setPanel1(props.shuffledImages.medium.Panel1[s.realIndex].correct);
                          }}
                          navigation= {{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
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

                    <div className= "row justify-content-center vertical-match">
                      
                      <Swiper
                        loop={true}
                        pagination={{ clickable: true, el: '.swiper-pagination' }}
                        onSwiper={(s) => { // Initialize active panel as current panel on page load
                          setPanel2(props.shuffledImages.hard.Panel2[s.realIndex].correct);
                        }}
                        onSlideChange={(s) => { // update active panel as user swipes
                          setPanel2(props.shuffledImages.medium.Panel2[s.realIndex].correct);
                        }}
                        navigation= {{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
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
                      <button onClick={() => winCondition()}>Confirm!</button>
                    </div>
                  </>
                  }

                  {difficulty === 3 &&
                    <>
  
                      <div className= "row justify-content-center vertical-match mt-5">

                          <Swiper
                            loop={true}
                            pagination={{ clickable: true, el: '.swiper-pagination' }}
                            onSwiper={(s) => { // Initialize active panel as current panel on page load
                              setPanel1(props.shuffledImages.hard.Panel1[s.realIndex].correct);
                            }}
                            onSlideChange={(s) => { // update active panel as user swipes
                              setPanel1(props.shuffledImages.medium.Panel1[s.realIndex].correct);
                            }}
                            navigation= {{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
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

                      <div className= "row justify-content-center vertical-match">
                        
                        <Swiper
                          loop={true}
                          pagination={{ clickable: true, el: '.swiper-pagination' }}
                          onSwiper={(s) => { // Initialize active panel as current panel on page load
                            setPanel2(props.shuffledImages.hard.Panel2[s.realIndex].correct);
                          }}
                          onSlideChange={(s) => { // update active panel as user swipes
                            setPanel2(props.shuffledImages.medium.Panel2[s.realIndex].correct);
                          }}
                          navigation= {{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
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

                      <div className= "row justify-content-center vertical-match">
                        
                        <Swiper
                          loop={true}
                          pagination={{ clickable: true, el: '.swiper-pagination' }}
                          onSwiper={(s) => { // Initialize active panel as current panel on page load
                            setPanel3(props.shuffledImages.hard.Panel3[s.realIndex].correct);
                          }}
                          onSlideChange={(s) => { // update active panel as user swipes
                            setPanel3(props.shuffledImages.hard.Panel3[s.realIndex].correct);
                          }}
                          navigation= {{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
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
                        <button onClick={() => winCondition()}>Confirm!</button>
                      </div>
                    </>
                  }
                </>
                :
                <>
                <div className="row justify-content-center mt-5">

                  <div className= "row horizontal-match mt-5">

                    <Swiper
                      slidesPerView={1}
                      loop={true}
                      direction='vertical'
                      pagination={{ clickable: true, el: '.swiper-pagination' }}
                      onSlideChange={(s) => {
                        setPanel1(props.shuffledImages.medium.Panel1[s.realIndex].correct);
                      }}
                    >
                        {props.shuffledImages.medium.Panel1.map((image) => (
                          <SwiperSlide> 
                            <img src={image.default} />
                          </SwiperSlide>
                        ))}
                    </Swiper>
                    
                    <Swiper
                      slidesPerView={1}
                      loop={true}
                      direction='vertical'
                      pagination={{ clickable: true, el: '.swiper-pagination' }}
                      onSlideChange={(s) => {
                        setPanel2(props.shuffledImages.medium.Panel2[s.realIndex].correct);
                      }}
                    >
                      {props.shuffledImages.medium.Panel2.map((image) => (
                        <SwiperSlide> 
                          <img src={image.default} />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    
                  </div>

                </div>

                <div className= "row justify-content-center mt-1">
                  <button onClick={() => winCondition()}>Confirm!</button>
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
