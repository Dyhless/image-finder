import { useEffect, useState } from 'react';
import * as API from './getImages';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';

export const App = () => {
  const [searchText, setSearchText] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (
      prevState.searchText !== searchText ||
      prevState.currentPage !== currentPage
    )
      addImages();
  }, []);

  const loadMore = () => {
    setCurrentPage(prevState => {
      prevState.currentPage + 1;
    });
  };

  const handleSubmit = ({ query }) => {
    setSearchText({
      searchText: query,
      images: [],
      currentPage: 1,
    });
  };

  const addImages = async () => {
    const { searchText, currentPage } = this.state;
    try {
      this.setState({ isLoading: true });
      const data = await API.getImages(searchText, currentPage);

      if (data.hits.length === 0) {
        return alert('No such images');
      }

      const imagesFormatedtoList = data.hits.map(
        ({ id, tags, webformatURL, largeImageURL }) => ({
          id,
          tags,
          webformatURL,
          largeImageURL,
        })
      );

      this.setState(state => ({
        images: [...state.images, ...imagesFormatedtoList],
        error: '',
        totalPages: Math.ceil(data.totalHits / 12),
      }));
    } catch (error) {
      this.setState({ error: 'Sorry, some error' });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      {images.length > 0 && <ImageGallery images={images} />}
      {isLoading && <Loader />}
      {images.length > 0 && totalPages !== currentPage && !isLoading && (
        <Button onClick={loadMore} />
      )}
    </>
  );
};
