import { BrowserRouter } from 'react-router-dom';

// local imports
import './App.css';
import { Navbar, Footer } from './components';
import Router from './routes';

function App() {
    return (
        <BrowserRouter>
            <div className="relative w-full overflow-hidden bg-right bg-no-repeat bg-contain bg-app-back bg-light-black">
                <div className="absolute z-0 rounded-full -left-32 -top-32 h-96 w-96 bg-gradient-radial"></div>
                <div className="absolute z-0 rounded-full -right-32 -bottom-32 h-96 w-96 bg-gradient-radial"></div>
                <div className="flex flex-col min-h-screen text-white w-ful">
                    <Navbar />
                    <Router />
                    <Footer />
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
