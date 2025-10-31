import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API_CONFIG } from "../config/api";
import type { components } from "../types/api-types";
import './MonsterDetail.css';

const MonsterDetail = () => {
  const { id } = useParams();
  const [monster, setMonster] = useState<components["schemas"]["MonsterDto"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchOne = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.MONSTER_BY_ID(Number(id))}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: components["schemas"]["MonsterDto"] = await res.json();
        setMonster(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };
    fetchOne();
  }, [id]);

  if (loading) return <main className="container"><p>Chargement...</p></main>;
  if (error) return <main className="container"><p role="alert">Erreur: {error}</p></main>;
  if (!monster) return <main className="container"><p>Produit introuvable</p></main>;

  return (
    <main className="container monster-detail">
      <Link to="/" className="back-link">← Retour</Link>
      <article className="monster-detail__card">
        <figure className="monster-detail__media">
          <img src={monster.imageUrl} alt={monster.name} />
        </figure>
        <div className="monster-detail__body">
          <h1 className="monster-detail__title">{monster.name}</h1>
          <p className="monster-detail__desc">{monster.description}</p>
          <p className="monster-detail__price">Prix: <strong>{monster.price} €</strong></p>
          <p className="monster-detail__type">Type: {monster.type}</p>
        </div>
      </article>
    </main>
  );
};

export default MonsterDetail;
