"use client"

import { useState, TouchEvent } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";

interface Slide {
  image_url: string;
}

interface ImageSliderDetailsPageProps {
  slides: Slide[];
}

const ImageSliderDetailsPage: React.FC<ImageSliderDetailsPageProps> = ({ slides }) => {
  
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [touchStartX, setTouchStartX] = useState<number>(0);
  const [touchEndX, setTouchEndX] = useState<number>(0);
  
  const isSmallDevice = useMediaQuery('(max-width: 768px)');

  const goToPrevious = (): void => {
    const isFirstSlide = currentIndex === 0;
    if (!isFirstSlide) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = (): void => {
    const isLastSlide = currentIndex === slides.length - 1;
    if (!isLastSlide) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToSlide = (slideIndex: number): void => {
    setCurrentIndex(slideIndex);
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>): void => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>): void => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (): void => {
    if (touchStartX - touchEndX > 50) {
      goToNext();
    }

    if (touchStartX - touchEndX < -50) {
      goToPrevious();
    }
  };

  const slideStylesWidthBackground: React.CSSProperties = {
    ...slideStyles,
    backgroundImage: `url(${slides[currentIndex].image_url})`,
  };

  return (
    <div 
      style={sliderStyles}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div style={slideStylesWidthBackground}></div>
      <div style={dotsContainerStyles}>
        {slides.map((_, slideIndex) => (
          <div
            style={
              slideIndex === currentIndex 
                ? (isSmallDevice ? dotStyleSmallDevicesActive : dotStyleActive)
                : (isSmallDevice ? dotStyleSmallDevices : dotStyle)
            }
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
          >
            ●
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSliderDetailsPage;

const slideStyles: React.CSSProperties = {
  width: "100%",
  height: "300px",
  borderRadius: "10px",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
};

const sliderStyles: React.CSSProperties = {
  position: "relative",
  height: "100%",
};

const dotsContainerStyles: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
};

const dotStyle: React.CSSProperties = {
  margin: "0 3px",
  cursor: "pointer",
  fontSize: "20px",
  color: "gray",
};

const dotStyleActive: React.CSSProperties = {
  ...dotStyle,
  color: "black",
};

const dotStyleSmallDevices: React.CSSProperties = {
  margin: "10px 3px",
  cursor: "pointer",
  fontSize: "10px",
  color: "gray",
};

const dotStyleSmallDevicesActive: React.CSSProperties = {
  ...dotStyleSmallDevices,
  color: "black",
};
