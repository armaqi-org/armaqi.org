"use client";

import classNames from "classnames";
import Image from "next/image";
import { FC, useState } from "react";

export interface Slide {
    src: string;
    text: string;
}

export const Carousel: FC<{ slides: Slide[] }> = ({ slides }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide-1);
    };
    const nextSlide = () => {
        setCurrentSlide(currentSlide >= slides.length - 1 ? 0 : currentSlide+1);
    };

    return (
      <div className="relative w-full max-w-screen-md">
        <div
          className="relative h-auto md:h-96 overflow-hidden rounded-lg mx-8 lg:mx-0"
        >
          <div className={classNames("duration-700 ease-in-out",)}>
            <Image
              src={slides[currentSlide]?.src}
              alt="chart"
              width={860}
              height={350}
            />
            <div className="text-center font-bold">{slides[currentSlide]?.text}</div>
          </div>
        </div>
        <button
          id="data-carousel-prev"
          type="button"
          className={classNames(
              'absolute top-0 z-30 group flex h-full cursor-pointer items-center justify-center focus:outline-none ',
              '-left-4 lg:-left-8'
          )}
          onClick={prevSlide}
        >
          <span
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white group-focus:ring-4 group-focus:ring-white"
          >
            <svg
              className="h-4 w-4 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="black"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="hidden">Previous</span>
          </span>
        </button>
        <button
          id="data-carousel-next"
          type="button"
          className={classNames(
              'absolute top-0 z-30 group flex h-full cursor-pointer items-center justify-center focus:outline-none ',
              '-right-4 lg:-right-8'
          )}
          onClick={nextSlide}
        >
          <span
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white group-focus:outline-none group-focus:ring-4 group-focus:ring-white"
          >
            <svg
              className="h-4 w-4 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="black"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="hidden">Next</span>
          </span>
        </button>
      </div>
    );
};
