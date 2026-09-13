import react from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from "./modules/Navbar";
import RoutesTs from "./routes/RoutesTs"
const App: React.FC = () => {
  return (
      <BrowserRouter>
         <div className="flex flex-col min-h-screen w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">        
            <Navbar/>
            <main className="flex-auto">
               <RoutesTs />
            </main>
         </div>
    </BrowserRouter>
  );
};

export default App;