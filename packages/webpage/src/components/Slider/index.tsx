"use client"
import Image from "next/image";
import { useState, useEffect } from "react";

export const Slider = () => {
  const slides = [
    {
      url: "/quickship.init.png",
      alt: "slide1",
    },
    {
      url: "/QuickShip2.jpeg",
      alt: "slide2",
    },
    {
      url: "/logo6.jpeg",
      alt: "slide3",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  useEffect(() => {
    // Automatically advance to the next slide every 5 seconds (5000 milliseconds)
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      // Clear the timer when the component unmounts to prevent memory leaks
      clearInterval(timer);
    };
  }, []);

  return (
    <div id="slider" className="mt-28 bg-orange-200 w-4/5 mx-auto">
      <div id="slider-slides" className="relative w-full h-[400px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in ${
              currentIndex === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.url}
              width={1000}
              height={400}
              alt={slide.alt}
              priority={true}
              className="w-full h-full object-cover mx-auto"
            />
          </div>
        ))}
        <div id="slider-btns" className="absolute top-1/2 flex w-full justify-between">
          <button
            className="w-10 h-10 border bg-slate-200 border-solid border-slate-400 rounded-full text-4xl text-center text-slate-400 opacity-40 hover:bg-amber-100 hover:border-amber-400 hover:text-amber-500 hover:opacity-100 duration-300"
            onClick={prevSlide}
          >
            &laquo;
          </button>
          <button
            className="w-10 h-10 border bg-slate-200 border-solid border-slate-400 rounded-full text-4xl text-center text-slate-400 opacity-40 hover:bg-amber-100 hover:border-amber-400 hover:text-amber-500 hover:opacity-100 duration-300"
            onClick={nextSlide}
          >
            &raquo;
          </button>
        </div>
      </div>
    </div>
  );
};
