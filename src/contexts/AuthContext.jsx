import { createContext, ReactNode } from 'react';
const AuthContext  = createContext(undefined);

export function AuthProvider({children}{children :ReactNode }) {
    const auth  = useAuthhook();
    return (
        <AuthContext.Provider value = {auth}>
            {children}
        </AuthContext.Provider>
    )
}