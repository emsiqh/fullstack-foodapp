import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "../assets/css/swiperStyles.css";
import { SliderCard } from '../components';

const Slider = () => {
    const products = useSelector((state) => state.products);
    const [fruits, setFruits] = useState(null);
    useEffect(() => {
        setFruits(products?.filter((data) => data.product_category === "fruits"));
        console.log(fruits);
    }, [products]);

    return (
        <div className="w-full pt-24">
            <Swiper
                slidesPerView={3}
                centeredSlides={false}
                spaceBetween={30}
                grabCursor={true}
                className="mySwiper"
            >
                {fruits && fruits.map((data, i) => <SwiperSlide key={i}>
                    <SliderCard key={i} data={data} index={i} />
                </SwiperSlide>)}
            </Swiper>
        </div>
    )
}

export default Slider;