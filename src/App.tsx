import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import MonsterList from './components/MonsterList'
import PriceSlider from './components/PriceSlider'
import { useState } from "react";
import Catalogue from "./pages/Catalogue";
import TypeMonsters from "./pages/TypeMonsters";
import MonsterDetail from './pages/MonsterDetail'
import Flavors from './pages/Flavors'
import Contact from './pages/Contact'
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom'

function AppShell() {
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const navigate = useNavigate();

  const handleSearch = (term: string) => setSearchTerm(term);
  const handleNavigate = (page: string) => {
    switch (page) {
      case 'home': return navigate('/');
      case 'catalogue': return navigate('/catalog');
      default: return navigate('/');
    }
  };

  const handleTypeClick = (type: string) => {
    navigate(`/type/${encodeURIComponent(type)}`);
  };

  const [sliderMin, setSliderMin] = useState(0)
  const [sliderMax, setSliderMax] = useState(10)

  const handlePriceChange = (min: number, max: number) => {
    // when user interacts, set min/max to numbers so MonsterList will query backend
    setSliderMin(min)
    setSliderMax(max)
    setMinPrice(min)
    setMaxPrice(max)
  }

  return (
    <div className="app-shell">
      <Header onSearch={handleSearch} onNavigate={handleNavigate} />
      <main className="container main">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h1 className="page-title">Catalogue Monster</h1>
                <PriceSlider min={0} max={10} valueMin={sliderMin} valueMax={sliderMax} onChange={handlePriceChange} />
                <MonsterList searchTerm={searchTerm} minPrice={minPrice} maxPrice={maxPrice} />
              </div>
            }
          />
          <Route path="/catalog" element={<Catalogue onTypeClick={handleTypeClick} />} />
          <Route path="/flavors" element={<Flavors />} />
          <Route path="/type/:type" element={<TypeRoute />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/:id" element={<MonsterDetail/>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function TypeRoute() {
  const { type } = useParams();
  return <TypeMonsters type={type} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
