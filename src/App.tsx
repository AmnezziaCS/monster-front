import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import MonsterList from './components/MonsterList'
import { useState } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="app-shell">
      <Header onSearch={handleSearch} />
      <main className="container main">
        <h1 className="page-title">Catalogue Monster</h1>
        <div>
          <MonsterList searchTerm={searchTerm} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App
