import './App.css';
/* Cloudinary */
import { CloudinaryContext } from "cloudinary-react";

import ShareHere from './components/ShareHere';

function App() {
  return (
    <CloudinaryContext cloudName="dtqzhg98l">
    
     <ShareHere />
    
     </CloudinaryContext>
  );
}

export default App;
