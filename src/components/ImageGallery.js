import React, { useState, useRef } from 'react';
import {
  Box,
  ImageList,
  ImageListItem,
  Modal,
  useMediaQuery,
  IconButton,
  Skeleton,
  Typography,
  LinearProgress,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import useSwipe from '../hooks/useSwipe';
import TouchFeedback from './TouchFeedback';

const ImageGallery = ({ images }) => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const modalRef = useRef(null);

  useSwipe(modalRef, {
    onSwipeLeft: () => {
      if (selectedImage) handleNext();
    },
    onSwipeRight: () => {
      if (selectedImage) handlePrev();
    },
    onSwipeDown: () => {
      handleClose();
    },
  });

  const handleOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
    setLoadingProgress(0);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
    setLoadingProgress(0);
  };

  const handleNext = () => {
    const currentIndex = images.indexOf(selectedImage);
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
    setLoadingProgress(0);
  };

  const handlePrev = () => {
    const currentIndex = images.indexOf(selectedImage);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
    setLoadingProgress(0);
  };

  const simulateImageLoad = () => {
    const duration = 1000; // 1 second
    const interval = 50; // Update every 50ms
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setLoadingProgress((currentStep / steps) * 100);

      if (currentStep >= steps) {
        clearInterval(timer);
        setLoading(false);
      }
    }, interval);
  };

  const getCols = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3;
  };

  return (
    <>
      <ImageList
        variant="quilted"
        cols={getCols()}
        gap={16}
        sx={{
          mb: 4,
          '& .MuiImageListItem-root': {
            overflow: 'hidden',
            borderRadius: 2,
          },
        }}
      >
        {images.map((image, index) => (
          <TouchFeedback key={index} onClick={() => handleOpen(image)}>
            <ImageListItem
              sx={{
                cursor: 'pointer',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            >
              {loading && (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={200}
                  animation="wave"
                />
              )}
              <img
                src={image.url}
                alt={image.title}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: loading ? 'none' : 'block',
                }}
                onLoad={() => {
                  simulateImageLoad();
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  bgcolor: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  p: 1,
                }}
              >
                <Typography variant="subtitle1">{image.title}</Typography>
              </Box>
            </ImageListItem>
          </TouchFeedback>
        ))}
      </ImageList>

      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Box
          ref={modalRef}
          sx={{
            position: 'relative',
            maxWidth: '90vw',
            maxHeight: '90vh',
            outline: 'none',
            bgcolor: 'background.paper',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          {loadingProgress < 100 && (
            <LinearProgress
              variant="determinate"
              value={loadingProgress}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1,
              }}
            />
          )}
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'white',
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1,
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.7)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
          {!isMobile && (
            <>
              <IconButton
                onClick={handlePrev}
                sx={{
                  position: 'absolute',
                  left: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'white',
                  bgcolor: 'rgba(0, 0, 0, 0.5)',
                  zIndex: 1,
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.7)',
                  },
                }}
              >
                <ChevronLeftIcon />
              </IconButton>
              <IconButton
                onClick={handleNext}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'white',
                  bgcolor: 'rgba(0, 0, 0, 0.5)',
                  zIndex: 1,
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.7)',
                  },
                }}
              >
                <ChevronRightIcon />
              </IconButton>
            </>
          )}
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
            }}
          >
            <img
              src={selectedImage?.url}
              alt={selectedImage?.title}
              style={{
                maxWidth: '100%',
                maxHeight: '90vh',
                objectFit: 'contain',
              }}
              onLoad={() => {
                simulateImageLoad();
              }}
            />
            {isMobile && (
              <Typography
                variant="caption"
                sx={{
                  position: 'absolute',
                  bottom: 16,
                  left: 0,
                  right: 0,
                  textAlign: 'center',
                  color: 'rgba(255, 255, 255, 0.7)',
                }}
              >
                Swipe left/right to navigate • Swipe down to close
              </Typography>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ImageGallery;