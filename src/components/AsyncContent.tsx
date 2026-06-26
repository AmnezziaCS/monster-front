interface AsyncContentProps {
    loading: boolean;
    error: string | null;
    loadingText?: string;
    children: React.ReactNode;
}

const AsyncContent = ({
    loading,
    error,
    loadingText = 'Chargement...',
    children,
}: AsyncContentProps) => {
    if (loading) return <p>{loadingText}</p>;
    if (error)
        return (
            <p role="alert" style={{ color: 'red' }}>
                Erreur: {error}
            </p>
        );
    return <>{children}</>;
};

export default AsyncContent;
