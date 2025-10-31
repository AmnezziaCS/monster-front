import { useState } from 'react'

const Contact = () => {
  const [sent, setSent] = useState(false)
  return (
    <main className="container">
      <h1>Contact</h1>
      {sent ? (
        <p>Merci ! Ton message a été envoyé (enfin, pas vraiment — c'est juste une démo).</p>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
          <div>
            <label>Nom<input name="name" required /></label>
          </div>
          <div>
            <label>Message<textarea name="message" required /></label>
          </div>
          <button type="submit">Envoyer</button>
        </form>
      )}
    </main>
  )
}

export default Contact
