import { useEffect, useState } from "react";
import type { MonsterT } from "../types/Monsters";
import Monster from "../components/Monster";

const API_URL = import.meta.env.VITE_API_URL || "/api";

interface TypeMonstersProps {
  type: string;
}

const TypeMonsters = ({ type }: TypeMonstersProps) => {
  const [monsters, setMonsters] = useState<MonsterT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMonstersByType = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_URL}/monsters/type/${type}`);

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
    fetchMonstersByType();
  }, [type]);

  if (loading) {
    return (
      <div>
        <h1>Monsters de type: {type}</h1>
        <p>Chargement des produits...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Monsters de type: {type}</h1>
        <p style={{ color: "red" }}>Erreur: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Monsters de type: {type}</h1>
      <p>{monsters.length} produits trouvés</p>
      <div>
        {monsters.map((monster) => (
          <Monster key={monster.id} monster={monster} />
        ))}
      </div>
    </div>
  );
};

export default TypeMonsters;
