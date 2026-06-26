import './Panel.css';

const Panel = () => {
    return (
        <section className="container panel">
            <h1 className="panel__title">Bienvenue dans le panel ! 🎉</h1>
            <p className="panel__subtitle">
                Félicitations, tu as réussi à entrer. T'es un vrai hacker toi.
            </p>
            <img
                className="panel__photo"
                src="/easter-egg.png"
                alt="Easter egg"
            />
        </section>
    );
};

export default Panel;
