import { useLayoutEffect, useState } from 'react'
import type { components } from '../types/api-types'

const API_URL = import.meta.env.VITE_API_URL || '/api'

interface CatalogueProps {
    onTypeClick?: (type: string) => void
}

const Catalogue = ({ onTypeClick }: CatalogueProps) => {
    const [types, setTypes] = useState<string[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useLayoutEffect(() => {
        const fetchTypes = async () => {
            try {
                setLoading(true)
                setError(null)
                const response = await fetch(`${API_URL}/monsters`)

                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`)
                }

                const data: components['schemas']['MonsterDto'][] =
                    await response.json()

                const uniqueTypes = [
                    ...new Set(data.map((monster) => monster.type)),
                ]
                setTypes(uniqueTypes.sort())
            } catch (error) {
                console.error('Erreur de chargement :', error)
                setError(
                    error instanceof Error ? error.message : 'Erreur inconnue'
                )
            } finally {
                setLoading(false)
            }
        }
        fetchTypes()
    }, [])

    if (loading) {
        return (
            <div>
                <h1>Catalogue</h1>
                <p>Chargement des types...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div>
                <h1>Catalogue</h1>
                <p style={{ color: 'red' }}>Erreur: {error}</p>
            </div>
        )
    }

    return (
        <div>
            <h1>Catalogue Monster Energy</h1>
            <h2>Types disponibles ({types.length})</h2>
            <ul>
                {types.map((type) => (
                    <li key={type}>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                onTypeClick?.(type)
                            }}
                        >
                            {type}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Catalogue
