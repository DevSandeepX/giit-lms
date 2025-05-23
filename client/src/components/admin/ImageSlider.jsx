import React, { useEffect, useRef, useState } from 'react';

const ImageSlider = () => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 5;

  const goToSlide = (index) => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.clientWidth;
      sliderRef.current.style.transform = `translateX(-${index * slideWidth}px)`;
    }
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    goToSlide(currentSlide);
  }, [currentSlide]);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-3xl overflow-hidden relative">
        <div className="flex transition-transform duration-500 ease-in-out" ref={sliderRef}>
          <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide1.png" className="w-full flex-shrink-0" alt="Slide 1" />
          <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide2.png" className="w-full flex-shrink-0" alt="Slide 2" />
          <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide3.png" className="w-full flex-shrink-0" alt="Slide 3" />
          <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide4.png" className="w-full flex-shrink-0" alt="Slide 4" />
          <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide5.png" className="w-full flex-shrink-0" alt="Slide 5" />
        </div>
      </div>
      <div className="flex items-center mt-5 space-x-2">
        {[...Array(totalSlides)].map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full cursor-pointer ${currentSlide === i ? 'bg-black' : 'bg-black/20'}`}
            onClick={() => goToSlide(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
