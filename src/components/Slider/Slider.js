import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import {FreeMode} from "swiper"
import 'swiper/css';
import "swiper/css/free-mode"
import 'bootstrap/dist/css/bootstrap.min.css';
import SliderCard from './SliderCard';
import img1 from '../img/page-001.jpg'
import img2 from '../img/page-002.jpg'
import img3 from '../img/page-004.jpg'
import img4 from '../img/page-006.jpg'
import img5 from '../img/page-008.jpg'

const Slider = () => {
  return (
    <div className='container py-4 px-4 justify-content-center bg-dark'>
        <Swiper 
        coverflow-effect-slide-shadows="true"
        grabCursor={true}
        modules={[FreeMode]}
        className='mySlider'
        slidesPerView={5}
        spaceBetween={30}
        >
            <SwiperSlide>
                <SliderCard data={{imagSrc: img1, price: '1500', title: "Watch"}}/>
            </SwiperSlide>
            <SwiperSlide>
                <SliderCard data={{imagSrc: img2, price: '1800', title: "SmatTv"}}/>
            </SwiperSlide>
            <SwiperSlide>
                <SliderCard data={{imagSrc: img3, price: '2000', title: "Fridge"}}/>
            </SwiperSlide>

            <SwiperSlide>
                <SliderCard data={{imagSrc: img4, price: '3000', title: " Oven"}}/>
            </SwiperSlide>
            <SwiperSlide>
                <SliderCard data={{imagSrc: img5, price: '4000', title: " cooker"}}/>
            </SwiperSlide>
            <SwiperSlide>
                <SliderCard data={{imagSrc: img1, price: '1500', title: "Watch"}}/>
            </SwiperSlide>
            <SwiperSlide>
                <SliderCard data={{imagSrc: img2, price: '1800', title: "SmatTv"}}/>
            </SwiperSlide>
            <SwiperSlide>
                <SliderCard data={{imagSrc: img3, price: '2000', title: "Fridge"}}/>
            </SwiperSlide>

            <SwiperSlide>
                <SliderCard data={{imagSrc: img4, price: '3000', title: " Oven"}}/>
            </SwiperSlide>
            <SwiperSlide>
                <SliderCard data={{imagSrc: img5, price: '4000', title: " cooker"}}/>
            </SwiperSlide>
        </Swiper>
    </div>
  )
}

export default Slider