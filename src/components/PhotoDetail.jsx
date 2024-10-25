import { useEffect, useState } from 'react'; 
import PropTypes from 'prop-types'; // Importing PropTypes for type checking
import { useLocation, useNavigate, useParams } from 'react-router-dom'; // Importing hooks from react-router-dom for routing
import { fetchPhotoById } from '../api/unsplash'; 

const PhotoDetail = () => {
  const { id } = useParams(); // Extracting the photo ID from the URL parameters
  const navigate = useNavigate(); // Hook to navigate programmatically
  const location = useLocation(); // Hook to access the current location
  const [photo, setPhoto] = useState(location.state?.photo || null); // State to store the photo details, initialized from location state if available
  const [loading, setLoading] = useState(!photo); // State to manage loading status, initialized to true if photo is not available
  const [error, setError] = useState(null); // State to manage error messages

  useEffect(() => {
    if (!photo) {
      const loadPhoto = async () => {
        try {
          const fetchedPhoto = await fetchPhotoById(id); 
          setPhoto(fetchedPhoto); 
        } catch (err) {
          setError(err.message); 
        } finally {
          setLoading(false);
        }
      };
      loadPhoto(); 
    }
  }, [id, photo]);

  if (loading) return <p className="loading">Loading...</p>; // Show loading message while fetching
  if (error) return <p className="error">Error: {error}</p>; // Show error message if there is an error
  if (!photo) return ( // Show message if photo is not found
    <div className="photo-detail">
      <button className="back-button" onClick={() => navigate('/photos')}>Back</button>
      <p className="error">Photo not found</p>
    </div>
  );

  return ( // Render photo details
    <div className="photo-detail">
      <button className="back-button" onClick={() => navigate('/photos')}>Back</button>
      <img className="photo-image" src={photo.urls.regular} alt={photo.alt_description} />
      <h2>{photo.description || 'No Description'}</h2>
      <p>By: {photo.user.name}</p>
    </div>
  );
};

PhotoDetail.propTypes = { // PropTypes for type checking
  photo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    urls: PropTypes.shape({
      regular: PropTypes.string.isRequired,
    }).isRequired,
    alt_description: PropTypes.string,
    description: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }),
};

export default PhotoDetail; 
