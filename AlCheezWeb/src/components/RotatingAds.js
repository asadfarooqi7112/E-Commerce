import { useCallback, useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useMediaQuery } from "../hooks/useMediaQuery";

const ImageSlider = ({ slides, parentWidth}) => {
  const timerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isSmallDevice = useMediaQuery('(max-width: 768px)');

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, slides]);

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const getSlideStylesWithBackground = (slideIndex, isSmallDevice) => {
    const url = slides[slideIndex].url;
    const styles = isSmallDevice?slideStylesSmallerDevices:slideStyles
  
    return {
      ...styles,
      backgroundImage: `url(${url})`,
    };
  };

  const getSlidesContainerStylesWithWidth = () => ({
    ...slidesContainerStyles,
    width: `${parentWidth * slides.length}vw`,
    transform: `translateX(${-(currentIndex * parentWidth)}vw)`,
  });

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      goToNext();
    }, 5000);

    return () => clearTimeout(timerRef.current);
  }, [goToNext]);

  return (
    <div style={isSmallDevice?sliderStylesSmallerDevices:sliderStyles}>
      <div>
        <div onClick={goToPrevious} style={leftArrowStyles}>
          <FiChevronLeft/>
        </div>
        <div onClick={goToNext} style={rightArrowStyles}>
          <FiChevronRight/>
        </div>
      </div>
      <div style={slidesContainerOverflowStyles}>
        <div style={getSlidesContainerStylesWithWidth()}>
          {slides.map((_, slideIndex) => (
            <div
              key={slideIndex}
              style={getSlideStylesWithBackground(slideIndex, isSmallDevice)}
            ></div>
          ))}
        </div>
      </div>
      <div style={dotsContainerStyles}>
        {slides.map((_, slideIndex) => (
          <div
          style={{
            ...(isSmallDevice ? dotStyleSmallerDevices : dotStyle),
            ...(currentIndex === slideIndex && { color: "black" })
          }}
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

export default ImageSlider;



const slideStyles = {
  width: "98.70vw",
  height: "80vh",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
};
const slideStylesSmallerDevices= {
  width: "98.70vw",
  height: "50vh",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
}
const rightArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  right: "32px",
  fontSize: "45px",
  color: "red",
  zIndex: 1,
  cursor: "pointer",
};

const leftArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  left: "32px",
  fontSize: "45px",
  color: "red",
  zIndex: 1,
  cursor: "pointer",
};

const sliderStyles = {
  position: "relative",
  width: "98.70vw",
  height: "80vh",
};

const sliderStylesSmallerDevices ={
  position: "relative",
  width: "98.70vw",
  height: "50vh",
}

const dotsContainerStyles = {
  display: "flex",
  justifyContent: "center",
  position: "absolute",
  bottom: "10px",
  width: "100%",
};

const dotStyle = {
  margin: "0 3px",
  cursor: "pointer",
  fontSize: "20px",
  color: "gray",
};
const dotStyleSmallerDevices = {
  margin: "0 3px",
  cursor: "pointer",
  fontSize: "10px",
  color: "gray",
};

const slidesContainerStyles = {
  display: "flex",
  height: "100%",
  transition: "transform ease-out 0.3s",
};

const slidesContainerOverflowStyles = {
  overflow: "hidden",
  height: "100%",
  width: "100%",
};

