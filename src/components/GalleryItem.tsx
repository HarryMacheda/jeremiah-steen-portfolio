import { Box, Grid } from '@mui/material';
import type { ProjectGalleryItem } from '../data/projects';

interface GalleryItemProps {
  item: ProjectGalleryItem;
  assetPath: string;
  columnCount: number;
}

function GalleryItem({ item, assetPath, columnCount }: GalleryItemProps) {
  const mediaUrl = `${import.meta.env.BASE_URL}${assetPath.replace(/^\//, '')}/${item.src}`;
  const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(item.src);

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
          sx={{
            width: '100%',
            aspectRatio: '900 / 600',
            borderRadius: '8px',
            objectFit: 'cover',
            backgroundColor: 'black',
          }}
        />
      ) : (
        <Box
          sx={{
            width: '100%',
            backgroundImage: `url(${mediaUrl})`,
            aspectRatio: '900 / 600',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '8px',
          }}
          aria-hidden="true"
        />
      )}
    </Grid>
  );
}

export default GalleryItem;
