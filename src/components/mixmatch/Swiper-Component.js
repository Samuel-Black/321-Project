/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

// install Swiper modules, used for swiping the card parts
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default function SwiperComponent(props) {
    
    return (
        <Swiper
            slidesPerView={1}
            loop={true}
            navigation= {{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
            direction={props.direction}

            onSwiper={(s) => { // Initialize active panel as current panel on page load
                props.setPanel(props.images[s.realIndex].correct);
            }}

            onSlideChange={(s) => { // set active panel to new slide on change
                props.setPanel(props.images[s.realIndex].correct);
            }}
        >
            {props.images.map((image,i) => (
                <SwiperSlide key={i}> 
                    <img src={image.default} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}