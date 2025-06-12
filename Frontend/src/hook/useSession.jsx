import { useState, useEffect } from "react";

const useSession =()=>{
    const [session, setSession] = useState(() => {
        // Recuperar sesión del localStorage al inicializar
        const storedSession = localStorage.getItem('session');
        return storedSession ? JSON.parse(storedSession) : null;
    });

    const saveSession = (token) => {
        const data = {token};
        setSession(data);
        localStorage.setItem('session', JSON.stringify(data));
    };

    const clearSession = () => {
        setSession(null);
        localStorage.removeItem('session');
    };

    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === 'session') {
                setSession(event.newValue ? JSON.parse(event.newValue) : null);
            }
        };
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return { session, saveSession, clearSession };
};

export default useSession;