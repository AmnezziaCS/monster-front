import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import MonsterList from './components/MonsterList'

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main className="container main">
        <h1 className="page-title">Catalogue Monster</h1>
        <p className="muted">Le contenu du catalogue sera branché sur la base de données prochainement.</p>
        <div>
          <MonsterList />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
