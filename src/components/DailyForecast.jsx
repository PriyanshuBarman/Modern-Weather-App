import React, { memo } from "react";
import { RiArrowRightWideFill } from "react-icons/ri";
import { WiRaindrops } from "react-icons/wi";
import { useNavigate } from "react-router-dom";
import { useApiData } from "../Context/ApiContext";
import { useSidebar } from "../Context/SidebarContext";
import DailyForecastSkeleton from "./Skeletons/DailyForecastSkeleton";

const DailyForecast = () => {
  const { isDailyForecastHidden } = useSidebar();
  if (isDailyForecastHidden) return;

  const { dailyData, isLoading } = useApiData();

  if (isLoading) return <DailyForecastSkeleton />;
  return (
    <section className="hover-scale-2 mt-3 flex w-full flex-col items-center justify-center gap-4 bg-white dark:bg-[#1c1c1c] dark:shadow-black md:mt-6 md:w-[26%] md:gap-7 md:rounded-3xl md:px-9 md:pb-10 md:shadow-md">
      <h1 className="hover-scale flex h-8 w-[95%] items-center justify-center rounded-full bg-black/5 text-[.9rem] font-[500] italic shadow-md dark:bg-white/10 dark:shadow-black md:mt-3 md:h-7 md:w-full md:bg-transparent md:text-lg md:font-[500] md:shadow-none md:dark:bg-transparent">
        Next 5 days Forecast
      </h1>
      {dailyData?.map((_, index) => (
        <Card key={index} index={index} />
      ))}
    </section>
  );
};

export default memo(DailyForecast);

const Card = memo(({ index }) => {
  const { getDailyData } = useApiData();

  const {
    dayName,
    temperature,
    description,
    minTemp,
    maxTemp,
    precipitationProbability,
    imageName,
  } = getDailyData(index);

  const navigate = useNavigate();
  const handleClick = () => navigate(`/forecast/${index}`);

  return (
    <div
      onClick={handleClick}
      className="DailyCards hover-scale relative flex h-[80px] w-[92%] cursor-pointer items-center justify-around overflow-hidden rounded-xl border-l border-t border-black/10 from-blue-300 to-blue-600 py-[2%] pr-6 shadow-md shadow-black/20 dark:border-white/5 dark:bg-[#1d1d1d] dark:text-white/90 dark:shadow-black md:h-[83px] md:w-full md:bg-gradient-to-br md:text-white md:dark:bg-none"
    >
      <h5 className="absolute left-0 top-0 w-[30%] rounded-br-2xl bg-black/5 text-center text-[.74rem] font-[500] italic shadow-sm shadow-black/20 dark:bg-white/20 dark:text-white/80 dark:shadow-black md:w-[35%] md:text-[.8rem]">
        {dayName}
      </h5>

      <div className="mt-1 flex h-full items-center">
        <img
          className="size-[3.5rem] rounded-xl md:mt-2 md:size-[4.3rem]"
          src={`/${imageName}.png`}
          alt=""
        />
      </div>
      <h2 className="flex h-full w-[30%] items-center justify-center text-[.95rem] font-[500] capitalize leading-3 md:text-lg md:italic">
        {description}
      </h2>
      <div className="flex h-full flex-col items-center justify-center">
        <h2 className="text-xl font-semibold md:text-[1.4rem] md:leading-5">
          {temperature}°c
        </h2>

        {precipitationProbability > 20 ? (
          <h5 className="precipitation relative left-1 top-1 text-base font-[500]">
            {precipitationProbability}%
            <WiRaindrops className="absolute -left-10 -top-4 size-14 fill-blue-600 md:-left-12 md:size-16 md:fill-white" />
          </h5>
        ) : (
          <h2 className="text- mt-1 items-center font-[500]">
            {minTemp}°c /{maxTemp}°c
          </h2>
        )}
      </div>
      <RiArrowRightWideFill className="absolute right-2.5" />
    </div>
  );
});