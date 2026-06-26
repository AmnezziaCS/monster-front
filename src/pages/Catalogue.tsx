import AsyncContent from '../components/AsyncContent';
import TypeList from '../components/TypeList';
import { useMonsterTypes } from '../hooks/useMonsterTypes';

const Catalogue = () => {
    const { types, loading, error } = useMonsterTypes();

    return (
        <div>
            <h1>Catalogue Monster Energy</h1>
            <AsyncContent
                loading={loading}
                error={error}
                loadingText="Chargement des types..."
            >
                <h2>Types disponibles ({types.length})</h2>
                <TypeList types={types} />
            </AsyncContent>
        </div>
    );
};

export default Catalogue;
