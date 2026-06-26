import { useEffect, useState } from 'react';
import {
    BrowserRouter,
    Route,
    Routes,
    useNavigate,
    useParams,
} from 'react-router-dom';

import { getPriceBounds } from './api';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import MonsterList from './components/MonsterList';
import PriceSlider from './components/PriceSlider';
import useDebounce from './hooks/useDebounce';
import Catalogue from './pages/Catalogue';
import Contact from './pages/Contact';
import Flavors from './pages/Flavors';
import MonsterDetail from './pages/MonsterDetail';
import TypeMonsters from './pages/TypeMonsters';

function AppShell() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const debouncedSetSearchTerm = useDebounce((value: string) => {
        setSearchTerm(value);
    }, 300);

    const handleSearch = (value: string) => {
        debouncedSetSearchTerm(value);
    };

    const handleSearchSubmit = (value: string) => {
        setSearchTerm(value);
        navigate('/');
    };

    const [sliderMin, setSliderMin] = useState(0);
    const [sliderMax, setSliderMax] = useState(10);
    const [boundsMin, setBoundsMin] = useState(0);
    const [boundsMax, setBoundsMax] = useState(10);
    const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
    const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

    useEffect(() => {
        let cancelled = false;
        getPriceBounds().then((bounds) => {
            if (cancelled || !bounds) return;
            setBoundsMin(bounds.min);
            setBoundsMax(bounds.max);
            setSliderMin(bounds.min);
            setSliderMax(bounds.max);
            setMinPrice(bounds.min);
            setMaxPrice(bounds.max);
        });
        return () => {
            cancelled = true;
        };
    }, []);

    const handlePriceChange = (min: number, max: number) => {
        setSliderMin(min);
        setSliderMax(max);
        setMinPrice(min);
        setMaxPrice(max);
    };

    return (
        <div className="app-shell">
            <Header onSearch={handleSearch} onSearchSubmit={handleSearchSubmit} />
            <main className="container main">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div>
                                <h1 className="page-title">
                                    Catalogue Monster
                                </h1>
                                <PriceSlider
                                    min={boundsMin}
                                    max={boundsMax}
                                    valueMin={sliderMin}
                                    valueMax={sliderMax}
                                    onChange={handlePriceChange}
                                />
                                <MonsterList
                                    searchTerm={searchTerm}
                                    minPrice={minPrice}
                                    maxPrice={maxPrice}
                                />
                            </div>
                        }
                    />
                    <Route
                        path="/catalog"
                        element={<Catalogue />}
                    />
                    <Route path="/flavors" element={<Flavors />} />
                    <Route path="/type/:type" element={<TypeRoute />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/:id" element={<MonsterDetail />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <AppShell />
        </BrowserRouter>
    );
}

function TypeRoute() {
    const { type } = useParams();
    return <TypeMonsters type={type} />;
}
