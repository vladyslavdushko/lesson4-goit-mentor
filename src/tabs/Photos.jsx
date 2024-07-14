import { getPhotos } from 'apiService/photos';
import { Form, Loader, PhotosGallery, Text } from 'components';
import { useEffect, useState } from 'react';

export const Photos = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setLoading(true);
      try {
        const { photos, per_page, total_results } = await getPhotos(
          query,
          page,
        );

        if (!photos.length) {
          return setIsEmpty(true);
        }

        setImages(prevImages => [...prevImages, ...photos]);
        setIsVisible(page < Math.ceil(total_results / per_page));
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [page, query]);

  const onHandleSubmit = value => {
    setQuery(value);
  };

  return (
    <>
      <Form onSubmit={onHandleSubmit} />
      {images.length > 0 && <PhotosGallery images={images} />}
      {!images.length && !isEmpty && (
        <Text textAlign="center">Let`s begin search 🔎</Text>
      )}
      {loading && <Loader />}
      {error && (
        <Text textAlign="center">❌ Something went wrong - {error}</Text>
      )}
      {isEmpty && (
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      )}
    </>
  );
};
