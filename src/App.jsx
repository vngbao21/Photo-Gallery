import { useState } from 'react'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importing routing components from react-router-dom
import PhotoGrid from './components/PhotoGrid'; 
import PhotoDetail from './components/PhotoDetail';
import './App.css'; 

const App = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null); 

  return (
    <Router> 
      <Routes> 
        <Route path="/" element={<PhotoGrid onPhotoClick={setSelectedPhoto} />} /> {/* Route for the home page displaying PhotoGrid */}
        <Route path="/photos" element={<PhotoGrid onPhotoClick={setSelectedPhoto} />} /> {/* Route for the photos page displaying PhotoGrid */}
        <Route path="/photos/:id" element={<PhotoDetail photo={selectedPhoto} />} /> {/* Route for the photo detail page displaying PhotoDetail */}
      </Routes>
    </Router>
  );
};

export default App; 
