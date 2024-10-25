import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchPhotos } from '../api/unsplash';

/**
 * PhotoGrid component to display a grid of photos.
 * @returns {JSX.Element} - The rendered component.
 */
const PhotoGrid = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch initial photos on component mount
  useEffect(() => {
    const loadInitialPhotos = async () => {
      try {
        const initialPhotos = await fetchPhotos(1); // Fetch the first page of photos
        setPhotos(initialPhotos);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadInitialPhotos();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Fetch more photos when user scrolls down
  const loadMorePhotos = async () => {
    try {
      const newPhotos = await fetchPhotos(page + 1); // Fetch the next page of photos
      setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]); // Append new photos to existing ones
      setPage(prevPage => prevPage + 1); // Increment the page number
      if (newPhotos.length === 0) {
        setHasMore(false); // No more photos to load
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <>
      <h1 className="text-3xl font-bold underline text-center">Unsplash Gallery</h1>
      <InfiniteScroll
        dataLength={photos.length}
        next={loadMorePhotos}
        hasMore={hasMore}
        loader={<p className="loading">Loading...</p>}
        endMessage={<p className="end">No more photos to load</p>}
        scrollThreshold={1}
      >
        <div className="columns-1 md:columns-3 lg:columns-4 space-y-4 px-4 md:px-8 lg:px-16">
          {photos.map(photo => (
            <Link
              key={photo.id}
              to={`/photos/${photo.id}`}
              state={{ photo }}
              className="photo-item text-center"
            >
              <img className="mx-auto" src={photo.urls.thumb} alt={photo.alt_description} />
              <p>{photo.user.name}</p>
            </Link>
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default PhotoGrid;
