import { useEffect, useState } from "react";
import type { components } from "../types/api-types";
import Monster from "./Monster";
import './MonsterList.css'

const API_URL = import.meta.env.VITE_API_URL || "/api";

const MonsterList = () => {
  const [monsters, setMonsters] = useState<components["schemas"]["MonsterDto"][]>([]);
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

  const data: components["schemas"]["MonsterDto"][] = await response.json();
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
      <section aria-busy="true" aria-labelledby="monsters-heading">
        <h2 id="monsters-heading" className="monster-list__title">Liste des Monster Energy</h2>
        <p>Chargement des produits...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section aria-labelledby="monsters-heading">
        <h2 id="monsters-heading" className="monster-list__title">Liste des Monster Energy</h2>
        <p role="alert" style={{ color: "red" }}>Erreur: {error}</p>
        <p>Vérifiez que le backend est démarré sur le port 3000</p>
      </section>
    );
  }

  return (
    <section className="monster-list__wrap" aria-labelledby="monsters-heading">
      <h2 id="monsters-heading" className="monster-list__title">Liste des Monster Energy ({monsters.length} produits)</h2>
      <ul className="monster-list__grid" role="list">
        {monsters.map((monster) => (
          <li key={monster.id}>
            <Monster monster={monster} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MonsterList;
