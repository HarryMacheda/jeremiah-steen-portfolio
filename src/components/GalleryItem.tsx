import { Box, Grid } from '@mui/material';
import { useState } from 'react'
import type { ProjectGalleryItem } from '../data/projects';

interface GalleryItemProps {
  item: ProjectGalleryItem;
  assetPath: string;
  columnCount: number;
}

function GalleryItem({ item, assetPath, columnCount }: GalleryItemProps) {
  const mediaUrl = `${import.meta.env.BASE_URL}${assetPath.replace(/^\//, '')}/${item.src}`;
  const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(item.src);
  const [_, setAspectRatio] = useState('900 / 600')

  return (
    <Grid size={12 / columnCount} key={mediaUrl}>
      {isVideo ? (
        <Box
          component="video"
          src={mediaUrl}
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          aria-label={item.alt || item.description || 'Gallery video'}
          onLoadedMetadata={(e: any) => {
            const video = e.currentTarget as HTMLVideoElement
            if (video.videoHeight > video.videoWidth) {
              setAspectRatio(`${video.videoWidth} / ${video.videoHeight}`)
            } else {
              setAspectRatio('900 / 600')
            }
          }}
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: '8px',
            objectFit: 'cover',
          }}
        />
      ) : (
        <Box
          component="img"
          src={mediaUrl}
          alt={item.alt || item.description || 'Gallery image'}
          onLoad={(e: any) => {
            const img = e.currentTarget as HTMLImageElement
            if (img.naturalHeight > img.naturalWidth) {
              setAspectRatio(`${img.naturalWidth} / ${img.naturalHeight}`)
            } else {
              setAspectRatio('900 / 600')
            }
          }}
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: '8px',
            objectFit: 'cover',
          }}
        />
      )}
    </Grid>
  );
}

export default GalleryItem;
