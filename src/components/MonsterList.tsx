import { useLayoutEffect, useState } from "react";
import type { components } from "../types/api-types";
import type { components } from "../types/api-types";
import Monster from "./Monster";
import "./MonsterList.css";

const API_URL = import.meta.env.VITE_API_URL || "/api";

interface MonsterListProps {
  searchTerm?: string;
}

const MonsterList = ({ searchTerm = "" }: MonsterListProps) => {
  const [monsters, setMonsters] = useState<components["schemas"]["MonsterDto"][]>([]);
  const [monsters, setMonsters] = useState<components["schemas"]["MonsterDto"][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useLayoutEffect(() => {
    const fetchMonsters = async () => {
      try {
        setLoading(true);
        setError(null);
        const params = new URLSearchParams();
        const trimmed = searchTerm.trim();
        if (trimmed) params.set("name", trimmed);
        const url = `${API_URL}/monsters${params.toString() ? `?${params.toString()}` : ""}`;
        const response = await fetch(url);

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
  }, [searchTerm]);

  if (loading) {
    return (
      <div>
        <p>Chargement des produits...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p style={{ color: "red" }}>Erreur: {error}</p>
        <p>Vérifiez que le backend est démarré sur le port 3000</p>
      </div>
    );
  }

  const filteredMonsters = monsters.filter((monster) => {
    if (!searchTerm.trim()) return true;
    const searchLower = searchTerm.toLowerCase();
    return monster.type.toLowerCase().includes(searchLower) || true;
  });

  return (
    <div className="monster-list__wrap">
      <div className="monster-list__grid">
        {filteredMonsters.map((monster) => (
          <Monster key={monster.id} monster={monster} />
        ))}
      </div>
      {searchTerm && filteredMonsters.length === 0 && (
        <p className="monster-list__no-results">
          Aucun produit trouvé pour "{searchTerm}"
        </p>
      )}
    </div>
  );
};

export default MonsterList;
