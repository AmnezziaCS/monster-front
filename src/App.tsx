import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import MonsterList from './components/MonsterList'
import { useState } from "react";
import Catalogue from "./pages/Catalogue";
import TypeMonsters from "./pages/TypeMonsters";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedType, setSelectedType] = useState("");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSearchTerm(""); 
  };

  const handleTypeClick = (type: string) => {
    setSelectedType(type);
    setCurrentPage("type");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "catalogue":
        return <Catalogue onTypeClick={handleTypeClick} />;
      case "type":
        return <TypeMonsters type={selectedType} />;
      default:
        return (
          <div>
            <h1 className="page-title">Catalogue Monster</h1>
            <MonsterList searchTerm={searchTerm} />
          </div>
        );
    }
  };

  return (
    <div className="app-shell">
      <Header onSearch={handleSearch} onNavigate={handleNavigate} />
      <main className="container main">{renderPage()}</main>
      <Footer />
    </div>
  );
}

export default App
