import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { clearAdminSession, login, setAdminSession } from '../api';
import Toast, { type ToastType } from '../components/Toast';
import './Admin.css';

const Admin = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{
        message: string;
        type: ToastType;
    } | null>(null);

    const closeToast = useCallback(() => setToast(null), []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const session = await login({ username, password });
            setAdminSession(session.isAdmin);
            setToast({ message: 'Connexion réussie !', type: 'success' });
            setTimeout(() => navigate('/admin/panel'), 900);
        } catch {
            setError('Identifiant ou mot de passe incorrect.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        clearAdminSession();
        setToast({ message: 'Vous êtes déconnecté.', type: 'info' });
    };

    return (
        <section className="container admin">
            <h1>Administration</h1>
            <form className="admin__form" onSubmit={handleSubmit}>
                <div className="admin__row">
                    <label className="admin__label" htmlFor="admin-username">
                        Identifiant
                    </label>
                    <input
                        id="admin-username"
                        className="admin__input"
                        name="username"
                        autoComplete="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="admin__row">
                    <label className="admin__label" htmlFor="admin-password">
                        Mot de passe
                    </label>
                    <input
                        id="admin-password"
                        className="admin__input"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {error && <p className="admin__error">{error}</p>}

                <div className="admin__actions">
                    <button
                        className="btn--primary"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Connexion…' : 'Se connecter'}
                    </button>
                    <button
                        className="btn--secondary"
                        type="button"
                        onClick={handleLogout}
                    >
                        Se déconnecter
                    </button>
                </div>
            </form>
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={closeToast}
                />
            )}
        </section>
    );
};

export default Admin;
