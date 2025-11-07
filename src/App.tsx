import { useState, useEffect } from 'react';
import {
    BrowserRouter,
    Route,
    Routes,
    useNavigate,
    useParams,
} from 'react-router-dom';

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

    const handleNavigate = (page: string) => {
        switch (page) {
            case 'home':
                return navigate('/');
            case 'catalogue':
                return navigate('/catalog');
            default:
                return navigate('/');
        }
    };

    const handleTypeClick = (type: string) => {
        navigate(`/type/${encodeURIComponent(type)}`);
    };

    const [sliderMin, setSliderMin] = useState(0);
    const [sliderMax, setSliderMax] = useState(10);
    const [boundsMin, setBoundsMin] = useState(0);
    const [boundsMax, setBoundsMax] = useState(10);
    const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
    const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

    useEffect(() => {
        const API_URL = import.meta.env.VITE_API_URL || '/api';
        const fetchRange = async () => {
            try {
                const tryEndpoints = [
                    `${API_URL}/monsters/price-range`,
                    `${API_URL}/monsters`,
                    '/monsters.json',
                ];

                for (const url of tryEndpoints) {
                    try {
                        const res = await fetch(url);
                        if (!res.ok) throw new Error(`HTTP ${res.status}`);
                        const data = await res.json();

                        if (
                            data &&
                            (typeof data.min === 'number' ||
                                typeof data.minPrice === 'number')
                        ) {
                            const min =
                                typeof data.min === 'number'
                                    ? data.min
                                    : data.minPrice;
                            const max =
                                typeof data.max === 'number'
                                    ? data.max
                                    : data.maxPrice;
                            setBoundsMin(min ?? 0);
                            setBoundsMax(max ?? 10);
                            setSliderMin(min ?? 0);
                            setSliderMax(max ?? 10);
                            setMinPrice(min ?? 0);
                            setMaxPrice(max ?? 10);
                            return;
                        }

                        if (Array.isArray(data)) {
                            const prices = data
                                .map((m: Record<string, unknown>) => {
                                    const p = m.price as unknown;
                                    return typeof p === 'number'
                                        ? p
                                        : Number(String(p));
                                })
                                .filter((p: number) => Number.isFinite(p));
                            if (prices.length > 0) {
                                const min = Math.min(...prices);
                                const max = Math.max(...prices);
                                setBoundsMin(min);
                                setBoundsMax(max);
                                setSliderMin(min);
                                setSliderMax(max);
                                setMinPrice(min);
                                setMaxPrice(max);
                                return;
                            }
                        }
                    } catch {
                        // try next endpoint
                        // console.warn('Range fetch failed for', url, e);
                    }
                }
            } catch {
                // ignore - keep defaults
            }
        };
        fetchRange();
    }, []);

    const handlePriceChange = (min: number, max: number) => {
        setSliderMin(min);
        setSliderMax(max);
        setMinPrice(min);
        setMaxPrice(max);
    };

    return (
        <div className="app-shell">
            <Header onSearch={handleSearch} onNavigate={handleNavigate} />
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
                        element={<Catalogue onTypeClick={handleTypeClick} />}
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
