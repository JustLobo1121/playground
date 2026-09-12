import react from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from "./modules/Navbar";
import RoutesTs from "./routes/RoutesTs"
const App: React.FC = () => {
  return (
      <BrowserRouter>
         {/* header */}
         <Navbar/>
         {/* body */}
         <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">        
            <main>
               <RoutesTs />
            </main>
         </div>
         {/* footer */}
    </BrowserRouter>
  );
};

export default App;