import { User, useUser } from '@/api/user';
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the user details you want to store
export interface UserDetails {
    id: string;
    name: string;
    email: string;
    // Add other user properties as needed
}

// Define the context value type
interface UserContextType {
    user: User | null;
    setUserDetails: (user: User | null) => void;
}

// Create the context with default values
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUserDetails] = useState<User | null>(null);
    const { data } = useUser();

    React.useEffect(() => {
        if (data) {
            setUserDetails(data);
        }
    }, [data]);
    return (
        <UserContext.Provider value={{ user, setUserDetails }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook for consuming the context
export const useUserDetails = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
