import { Link, useParams } from 'react-router-dom';

import { getMonsterById } from '../api';
import { useFetch } from '../hooks/useFetch';
import './MonsterDetail.css';

const MonsterDetail = () => {
    const { id } = useParams();
    const {
        data: monster,
        loading,
        error,
    } = useFetch(() => getMonsterById(id!), [id], Boolean(id));

    if (loading)
        return (
            <main className="container">
                <p>Chargement...</p>
            </main>
        );
    if (error)
        return (
            <main className="container">
                <p role="alert">Erreur: {error}</p>
            </main>
        );
    if (!monster)
        return (
            <main className="container">
                <p>Produit introuvable</p>
            </main>
        );

    return (
        <main className="container monster-detail">
            <Link to="/" className="back-link">
                ← Retour
            </Link>
            <article className="monster-detail__card">
                <figure className="monster-detail__media">
                    <img src={monster.imageUrl} alt={monster.name} />
                </figure>
                <div className="monster-detail__body">
                    <h1 className="monster-detail__title">{monster.name}</h1>
                    <p className="monster-detail__desc">{monster.description}</p>
                    <p className="monster-detail__price">
                        Prix: <strong>{monster.price} €</strong>
                    </p>
                    <p className="monster-detail__type">Type: {monster.type}</p>
                </div>
            </article>
        </main>
    );
};

export default MonsterDetail;
