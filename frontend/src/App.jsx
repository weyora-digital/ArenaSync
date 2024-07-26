import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

// local imports
import Router from './routes';
import { Navbar, Footer } from './components';
import './App.css';

function App() {
    const [pageHeight, setPageHeight] = useState(0);

    useEffect(() => {
        const navbarHeight = document.getElementById('navbar').offsetHeight;
        const height = window.innerHeight - navbarHeight;
        setPageHeight(`${height}px`);
    }, []);

    return (
        <BrowserRouter>
            <div className="relative w-full overflow-hidden bg-fixed bg-right bg-no-repeat bg-contain bg-app-back bg-light-black">
                <div className="absolute z-0 rounded-full -left-32 -top-32 h-96 w-96 bg-gradient-radial"></div>
                <div className="absolute z-0 rounded-full -right-32 -bottom-32 h-96 w-96 bg-gradient-radial"></div>
                <Navbar />
                <div className="relative overflow-auto w-ful" style={{ height: pageHeight }}>
                    <Router />
                    <Footer />
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
