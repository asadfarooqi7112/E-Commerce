// src/components/ImageGallery.js
import React, { useState } from 'react';

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0].image_url);

  const handleImageClick = (image) => {
    setSelectedImage(image.image_url);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', height: "100%" }}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image.image_url}
            alt={`Thumbnail ${index}`}
            onClick={() => handleImageClick(image)}
            style={{
              width: '100px',
              height: '100px',
              marginBottom: '10px',
              cursor: 'pointer',
              border: selectedImage === image.image_url ? '2px solid blue' : '2px solid transparent'
            }}
          />
        ))}
      </div>
      <div style={{ marginLeft: '20px' }}>
        <img src={selectedImage} alt="Selected" style={{ width: '100%', height: '400px', marginBottom: '10px', border:"1px solid black" }} />
      </div>
    </div>
  );
};

export default ImageGallery;
