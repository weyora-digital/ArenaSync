import { BrowserRouter } from 'react-router-dom';

// local imports
import './App.css';
import { Navbar, Footer } from './components';
import Router from './routes';

function App() {
    return (
        <BrowserRouter>
            <div className="flex flex-col w-ful min-h-screen bg-gray-500">
                <Navbar />
                <Router />
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
