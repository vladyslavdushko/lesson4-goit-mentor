import { Grid, PhotosGalleryItem } from '..';

export const PhotosGallery = ({ images, open_modal}) => {
  return (
    <Grid>
      {images.map(image => (
        <PhotosGalleryItem key={image.id} {...image} open_modal={open_modal}  />
      ))}
    </Grid>
  );
};
