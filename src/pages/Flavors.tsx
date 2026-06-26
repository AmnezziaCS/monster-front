import AsyncContent from '../components/AsyncContent';
import TypeList from '../components/TypeList';
import { useMonsterTypes } from '../hooks/useMonsterTypes';

const Flavors = () => {
    const { types, loading, error } = useMonsterTypes();

    return (
        <main className="container">
            <h1>Saveurs</h1>
            <AsyncContent
                loading={loading}
                error={error}
                loadingText="Chargement des saveurs..."
            >
                <TypeList types={types} />
            </AsyncContent>
        </main>
    );
};

export default Flavors;
