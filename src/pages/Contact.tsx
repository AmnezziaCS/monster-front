import { useState } from 'react';

import './Contact.css';

const Contact = () => {
    const [sent, setSent] = useState(false);
    return (
        <main className="container contact">
            <h1>Contact</h1>
            {sent ? (
                <p className="contact__note">
                    Merci ! Ton message a été envoyé (mais on s'en fou en vrai).
                </p>
            ) : (
                <form
                    className="contact__form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        setSent(true);
                    }}
                >
                    <div className="contact__row">
                        <label className="contact__label">Nom</label>
                        <input
                            className="contact__input"
                            name="name"
                            required
                        />
                    </div>

                    <div className="contact__row">
                        <label className="contact__label">Message</label>
                        <textarea
                            className="contact__textarea"
                            name="message"
                            required
                        />
                    </div>

                    <div className="contact__actions">
                        <button className="btn--primary" type="submit">
                            Envoyer
                        </button>
                        <span className="contact__note">
                            Nous répondrons rapidement (ou pas :D).
                        </span>
                    </div>
                </form>
            )}
        </main>
    );
};

export default Contact;
