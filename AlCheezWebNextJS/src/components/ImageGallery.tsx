import React, { useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: { image_url: string }[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string>(images[0].image_url);

  const handleImageClick = (image: { image_url: string }) => {
    setSelectedImage(image.image_url);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', height: "100%" }}>
        {images.map((image, index) => (
          <Image
            width={100}
            height={100}
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
        <Image src={selectedImage} alt="Selected" width={100} height={100} style={{ width: '100%', height: '400px', marginBottom: '10px', border:"1px solid black" }} />
      </div>
    </div>
  );
};

export default ImageGallery;
