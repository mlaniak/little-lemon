import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';

const SocialShare = ({ url, title, description, image }) => {
  const encodedUrl = encodeURIComponent(url || window.location.href);
  const encodedTitle = encodeURIComponent(title || document.title);
  const encodedDescription = encodeURIComponent(description || "");
  const encodedImage = encodeURIComponent(image || "");

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodedImage}&description=${encodedDescription}`,
    instagram: `https://instagram.com` // Instagram doesn't support direct sharing, will link to profile
  };

  const handleShare = (platform) => {
    const shareUrl = shareLinks[platform];
    if (platform === 'instagram') {
      window.open(shareUrl, '_blank');
    } else {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        gap: 1,
        justifyContent: 'center',
        alignItems: 'center',
        my: 2
      }}
    >
      <Tooltip title="Share on Facebook">
        <IconButton 
          onClick={() => handleShare('facebook')}
          aria-label="share on facebook"
          sx={{ 
            color: 'text.secondary',
            '&:hover': { 
              color: '#1877F2',
              transform: 'scale(1.1)'
            },
            transition: 'all 0.2s ease-in-out'
          }}
        >
          <FacebookIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Share on Twitter">
        <IconButton 
          onClick={() => handleShare('twitter')}
          aria-label="share on twitter"
          sx={{ 
            color: 'text.secondary',
            '&:hover': { 
              color: '#1DA1F2',
              transform: 'scale(1.1)'
            },
            transition: 'all 0.2s ease-in-out'
          }}
        >
          <TwitterIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Share on LinkedIn">
        <IconButton 
          onClick={() => handleShare('linkedin')}
          aria-label="share on linkedin"
          sx={{ 
            color: 'text.secondary',
            '&:hover': { 
              color: '#0A66C2',
              transform: 'scale(1.1)'
            },
            transition: 'all 0.2s ease-in-out'
          }}
        >
          <LinkedInIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Share on Pinterest">
        <IconButton 
          onClick={() => handleShare('pinterest')}
          aria-label="share on pinterest"
          sx={{ 
            color: 'text.secondary',
            '&:hover': { 
              color: '#E60023',
              transform: 'scale(1.1)'
            },
            transition: 'all 0.2s ease-in-out'
          }}
        >
          <PinterestIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Follow us on Instagram">
        <IconButton 
          onClick={() => handleShare('instagram')}
          aria-label="follow on instagram"
          sx={{ 
            color: 'text.secondary',
            '&:hover': { 
              color: '#E4405F',
              transform: 'scale(1.1)'
            },
            transition: 'all 0.2s ease-in-out'
          }}
        >
          <InstagramIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default SocialShare;
