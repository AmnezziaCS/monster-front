import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { isAdminSession } from '../api';

const RequireAdmin = ({ children }: { children: ReactNode }) => {
    if (!isAdminSession()) {
        return <Navigate to="/admin" replace />;
    }
    return <>{children}</>;
};

export default RequireAdmin;
