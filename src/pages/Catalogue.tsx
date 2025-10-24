import { useEffect, useState } from "react";
import type { MonsterT } from "../types/Monsters";

const API_URL = import.meta.env.VITE_API_URL || "/api";

interface CatalogueProps {
  onTypeClick?: (type: string) => void;
}

const Catalogue = ({ onTypeClick }: CatalogueProps) => {
  const [types, setTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_URL}/monsters`);

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data: MonsterT[] = await response.json();

        // Extraire tous les types uniques
        const uniqueTypes = [...new Set(data.map((monster) => monster.type))];
        setTypes(uniqueTypes.sort());
      } catch (error) {
        console.error("Erreur de chargement :", error);
        setError(error instanceof Error ? error.message : "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };
    fetchTypes();
  }, []);

  if (loading) {
    return (
      <div>
        <h1>Catalogue</h1>
        <p>Chargement des types...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Catalogue</h1>
        <p style={{ color: "red" }}>Erreur: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Catalogue Monster Energy</h1>
      <h2>Types disponibles ({types.length})</h2>
      <ul>
        {types.map((type) => (
          <li key={type}>
            <button onClick={() => onTypeClick?.(type)}>{type}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Catalogue;
