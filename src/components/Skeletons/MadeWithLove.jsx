import React from "react";
import { FaHeart } from "react-icons/fa";

const MadeWithLove = () => {
  return (
    <div className="relative  mt-10 flex h-[6em] w-full flex-col items-center font-[Arial] italic text-black/50 dark:text-white/55 md:m-0 md:h-auto md:w-auto md:flex-row md:gap-2">
      <span className="flex w-full justify-center gap-4 text-center font-oxanium text-2xl font-semibold">
        Made With <FaHeart className="text-blue-500" />
      </span>
      <span className="font-dancingScript text-xl text-black/70 dark:text-white/65 md:flex">
        by <span className="font-bold">Priyanshu</span>
      </span>
    </div>
  );
};

export default MadeWithLove;
