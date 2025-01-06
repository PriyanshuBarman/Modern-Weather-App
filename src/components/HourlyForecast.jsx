import React, { memo } from "react";
import { RiArrowRightWideFill } from "react-icons/ri";
import { WiRaindrops } from "react-icons/wi";
import { NavLink } from "react-router-dom";
import "swiper/css";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useApiData } from "../Context/ApiContext";
import HourlyForecastSkeleton from "./Skeletons/HourlyForecastSkeleton";

const HourlyForecast = () => {
  const { hourlyData, isLoading } = useApiData();

  if (isLoading) return <HourlyForecastSkeleton />;

  return (
    <section className="hourly-forecast-container h-50 w-full cursor-pointer select-none md:w-[100%] md:rounded-3xl">
      <div className="forecast-header flex w-full flex-wrap items-center justify-between gap-4 pl-4 pr-1 text-[0.87rem] font-semibold italic text-black dark:text-white/90 md:text-base">
        <h2 className="forecast-title">Hourly Forecast</h2>
        <NavLink to="/forecast/hourly" className="forecast-link">
          <span className="flex md:hover:text-blue-500 items-center gap-1">
            <h3>Next 5 Days</h3>
            <RiArrowRightWideFill size="1rem" />
          </span>
        </NavLink>
      </div>
      <Swiper
        className="forecast-swiper w-full md:pt-5"
        style={{
          paddingLeft: "17px",
          paddingRight: "35px",
          paddingBlock: "12px",
          marginBottom: "1rem",
        }}
        spaceBetween={60}
        slidesPerView={5}
        modules={[FreeMode]}
        freeMode={true}
        breakpoints={{
          1024: {
            spaceBetween: 20,
            slidesPerView: 5,
          },
        }}
      >
        {hourlyData?.map((_, index) => (
          <SwiperSlide key={index}>
            <HourlyCard index={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default memo(HourlyForecast);

const HourlyCard = memo(({ index }) => {
  const { getHourlyData } = useApiData();
  const { time, dayName, temperature, imageName, precipitationProbability } =
    getHourlyData(index);

  return (
    <div className="forecast-card hover-scale group relative flex h-[6.4rem] w-[3.8rem] flex-col items-center justify-end overflow-hidden rounded-[1.7em] shadow-[1.5px_1px_2px_0px] shadow-black/40 dark:bg-[#1a1a1a] dark:shadow-black md:h-[8.3rem] md:w-[4.9rem] md:rounded-[2.2rem] md:text-xl">
      <div className="card-header absolute left-0 top-[13%] flex w-full flex-col justify-center gap-1 text-center font-semibold leading-[.6rem] md:gap-1">
        <h2 className="day-name rounded-xl text-[.6em] italic leading-[.45rem]">
          {dayName}
        </h2>
        <h2 className="time text-[.67em]">{time}</h2>
      </div>

      <div className="absolute left-2 top-7 flex size-full flex-col md:left-2 md:top-8">
        <img
          className="weather-icon size-11 md:size-16"
          src={`${imageName}.png`}
          alt={`Weather icon for ${dayName}`}
        />
      </div>
      {precipitationProbability > 20 ? (
        <h5 className="precipitation relative mb-3 ml-4 text-[.79em] font-semibold md:mb-3 md:ml-4">
          {precipitationProbability}%
          <WiRaindrops className="absolute -left-7 -top-2.5 size-10 fill-blue-600 md:-left-8 md:size-11" />
        </h5>
      ) : (
        <h5 className="temperature dark:text-ts mb-3.5 text-[.9em] font-semibold leading-3 md:mb-5">
          {temperature}°c
        </h5>
      )}
    </div>
  );
});
