import { Grid, PhotosGalleryItem } from '..';

export const PhotosGallery = ({ images }) => {
  return (
    <Grid>
      {images.map(image => (
        <PhotosGalleryItem key={image.id} {...image} />
      ))}
    </Grid>
  );
};
