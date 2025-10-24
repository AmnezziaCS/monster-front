import { useEffect, useState } from "react";
import type { MonsterT } from "../types/Monsters";
import Monster from "./Monster";
import './MonsterList.css'

const API_URL = import.meta.env.VITE_API_URL || "/api";

const MonsterList = () => {
  const [monsters, setMonsters] = useState<MonsterT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMonsters = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_URL}/monsters`);

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data: MonsterT[] = await response.json();
        setMonsters(data);
      } catch (error) {
        console.error("Erreur de chargement :", error);
        setError(error instanceof Error ? error.message : "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };
    fetchMonsters();
  }, []);

  if (loading) {
    return (
      <div>
        <h1 className="monster-list__title">Liste des Monster Energy</h1>
        <p>Chargement des produits...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="monster-list__title">Liste des Monster Energy</h1>
        <p style={{ color: "red" }}>Erreur: {error}</p>
        <p>Vérifiez que le backend est démarré sur le port 3000</p>
      </div>
    );
  }

  return (
    <div className="monster-list__wrap">
      <h1 className="monster-list__title">Liste des Monster Energy ({monsters.length} produits)</h1>
      <div className="monster-list__grid">
        {monsters.map((monster) => (
          <Monster key={monster.id} monster={monster} />
        ))}
      </div>
    </div>
  );
};

export default MonsterList;
