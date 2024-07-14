import { getPhotos } from 'apiService/photos';
import { Button, Form, Loader, PhotosGallery, Text } from 'components';
import ImageModal from 'components/ImageModal/ImageModal';
import { useEffect, useState } from 'react';

export const Photos = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [modalUrl, setModalUrl] = useState("");
  const [modalAlt, setModalAlt] = useState("");
  const [showedModal, setShowedModal] = useState(false);
  

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
    setImages([]);
    setPage(1)
    setIsVisible(false)
    setIsEmpty(false)
    setError(null)
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1)
  }

  const openModal = (url, alt) => {
    console.log(url, alt);
    setShowedModal(true)
    setModalUrl(url)
    setModalAlt(alt)
  }
  
  const closeModal = () => {
    setShowedModal(false)
    setModalUrl("")
    setModalAlt("")
  }
   
  return (
    <>
      <Form onSubmit={onHandleSubmit} />
      {images.length > 0 && <PhotosGallery images={images} open_modal={openModal} />}
      {isVisible && <Button onClick={loadMore} disabled={loading}>{loading ? 'Loading...' : 'Load more'} </Button>}
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
      <ImageModal modalIsOpen={showedModal} closeModal={closeModal} src={modalUrl} alt={modalAlt} />
    </>
  );
};
