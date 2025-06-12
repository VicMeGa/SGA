import { Navigate } from 'react-router-dom';
import useSession from './useSession';

const ProtectedRoute = ({ children }) => {
    const { session } = useSession();

    if (!session) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
