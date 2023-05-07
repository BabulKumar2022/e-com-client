import React from 'react';
import './Swipe.css'

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import image1 from '../img/page-001.jpg'
import image2 from '../img/page-002.jpg'
import image4 from '../img/page-004.jpg'
import image6 from '../img/page-006.jpg'
import image8 from '../img/page-008.jpg'




// import required modules
import { EffectCoverflow, Navigation, Pagination, Autoplay } from "swiper";

const SwiperSlide2 = () => {


  return (
    <div className='container'>
      <div className="title_wrapper">

          <>
          
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 150,
              modifier: 1,
              slideShadows: true,
              
            }}
            pagination={{clickable: true}}
            navigation
            loop= {true}
            autoplay={{delay: 1500}}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            className="mySwiper"
      >
        <SwiperSlide>
          <img src={image1} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image2}/>
        </SwiperSlide>
        <SwiperSlide>
          <img src={image4} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image6} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image8} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image1} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image2} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image4}/>
        </SwiperSlide>
        <SwiperSlide>
          <img src={image6} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image2} />
        </SwiperSlide>
      </Swiper>
          </>




      </div>
    </div>
  )
}

export default SwiperSlide2