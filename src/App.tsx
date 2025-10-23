import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main className="container main">
        {/* Zone de contenu – prochainement: grille du catalogue */}
        <h1 className="page-title">Catalogue Monster</h1>
        <p className="muted">Commence à ajouter les produits ici…</p>
      </main>
      <Footer />
    </div>
  )
}

export default App
