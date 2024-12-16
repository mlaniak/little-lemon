import React from 'react';
import ReactImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Box } from '@mui/material';

const ImageGallery = ({ images }) => {
  const galleryImages = images.map(image => ({
    original: image.url,
    thumbnail: image.url,
    description: image.alt,
    originalAlt: image.alt,
    thumbnailAlt: image.alt,
  }));

  return (
    <Box
      sx={{
        '& .image-gallery': {
          width: '100%',
          height: '100%',
        },
        '& .image-gallery-slide img': {
          width: '100%',
          height: '400px',
          objectFit: 'cover',
        },
        '& .image-gallery-thumbnail img': {
          width: '100px',
          height: '67px',
          objectFit: 'cover',
        },
        '& .image-gallery-thumbnail.active, & .image-gallery-thumbnail:hover': {
          border: '4px solid #F4CE14',
        },
        '& .image-gallery-left-nav .image-gallery-svg, & .image-gallery-right-nav .image-gallery-svg': {
          height: '80px',
          width: '40px',
        },
        '& .image-gallery-icon:hover': {
          color: '#F4CE14',
        },
        '& .image-gallery-thumbnail-label': {
          color: '#333',
          fontSize: '0.875rem',
        },
        '& .image-gallery-description': {
          backgroundColor: 'rgba(0, 0, 0, 0.65)',
          bottom: '20px',
          color: '#fff',
          padding: '10px 15px',
          borderRadius: '4px',
          fontSize: '0.875rem',
        },
      }}
    >
      <ReactImageGallery
        items={galleryImages}
        showPlayButton={false}
        showFullscreenButton={true}
        showNav={true}
        showThumbnails={true}
        thumbnailPosition="bottom"
        slideInterval={4000}
        slideDuration={450}
        lazyLoad={true}
      />
    </Box>
  );
};

export default ImageGallery;
