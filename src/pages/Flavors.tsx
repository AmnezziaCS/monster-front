import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { MonsterType } from '../types/front-types'

const API_URL = (import.meta.env.VITE_API_URL as string) || '/api'

const Flavors = () => {
    const [types, setTypes] = useState<string[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const run = async () => {
            try {
                setLoading(true)
                const res = await fetch(`${API_URL}/monsters`)
                if (!res.ok) throw new Error(`HTTP ${res.status}`)
                const data: MonsterType[] = await res.json()
                const unique = Array.from(
                    new Set(data.map((d) => d.type))
                ).sort()
                setTypes(unique)
            } catch (e) {
                setError(e instanceof Error ? e.message : 'Erreur')
            } finally {
                setLoading(false)
            }
        }
        run()
    }, [])

    if (loading)
        return (
            <main className="container">
                <p>Chargement des saveurs...</p>
            </main>
        )
    if (error)
        return (
            <main className="container">
                <p role="alert">Erreur: {error}</p>
            </main>
        )

    return (
        <main className="container">
            <h1>Saveurs</h1>
            <ul>
                {types.map((t) => (
                    <li key={t}>
                        <Link to={`/type/${encodeURIComponent(t)}`}>{t}</Link>
                    </li>
                ))}
            </ul>
        </main>
    )
}

export default Flavors
