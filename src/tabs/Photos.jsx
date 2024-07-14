 import { getPhotos } from 'apiService/photos';
import { Form, Text } from 'components';
import { useEffect, useState } from 'react';

export const Photos = () => {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(()=>{
    if(!query) return 
      
    const fetchImages = async() =>{
      setLoading(true)
      try {
        const data = await getPhotos(query, page)
        console.log(data);
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [page, query])

  const onHandleSumbit = (value) =>{
    setQuery(value);
  }



  return (
    <>
      <Form onSubmit={onHandleSumbit} />
      <Text textAlign="center">Let`s begin search 🔎</Text>
    </>
  );
};
