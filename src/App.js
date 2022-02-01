import './App.css';
/* Cloudinary */
import { CloudinaryContext } from "cloudinary-react";
/* Bootstrap */
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import ShareHere from './components/ShareHere';

function App() {
  return (
    <CloudinaryContext cloudName="dtqzhg98l">
    
     <ShareHere />
    
     </CloudinaryContext>
  );
}

export default App;
