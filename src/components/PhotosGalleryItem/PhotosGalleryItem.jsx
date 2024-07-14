import { GridItem } from '..';

import styles from './PhotosGalleryItem.module.css';

export const PhotosGalleryItem = ({ src, alt, avg_color, open_modal }) => {
  return (
    <GridItem>
      <div
        className={styles.thumb}
        style={{ backgroundColor: avg_color, borderColor: avg_color }}
      >
        <img src={src.large} alt={alt} onClick={()=> open_modal(src.large, alt)}/>
      </div>
    </GridItem>
  );
};
