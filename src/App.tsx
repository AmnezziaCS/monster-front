import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MonsterList from "./components/MonsterList";
import Catalogue from "./pages/Catalogue";
import TypeMonsters from "./pages/TypeMonsters";
import MonsterDetail from "./pages/MonsterDetail";
import Flavors from "./pages/Flavors";
import Contact from "./pages/Contact";
import useDebounce from "./hooks/useDebounce";

function AppShell() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const debouncedSetSearchTerm = useDebounce((value: string) => {
    setSearchTerm(value);
  }, 300);

  const handleSearch = (value: string) => {
    debouncedSetSearchTerm(value);
  };

  const handleNavigate = (page: string) => {
    switch (page) {
      case "home":
        return navigate("/");
      case "catalogue":
        return navigate("/catalog");
      default:
        return navigate("/");
    }
  };

  const handleTypeClick = (type: string) => {
    navigate(`/type/${encodeURIComponent(type)}`);
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
                <h1 className="page-title">Catalogue Monster</h1>
                <MonsterList searchTerm={searchTerm} />
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
