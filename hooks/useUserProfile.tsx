import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { api } from "@/utils/api";
import { AccountType } from "@/lib/types/AccountType";

type UserProfileContextType = {
    data?: AccountType;
    setData: React.Dispatch<React.SetStateAction<AccountType | undefined>>;
    refreshKey: number;
    setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
};

const UserProfileContext = createContext<UserProfileContextType | null>(null);

export function UserProfileProvider({ children }: any) {
    const [data, setData] = useState<AccountType>();
    const { isAuthenticated, loading } = useAuth();
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        if (isAuthenticated && !loading) {
            const fetchData = async () => {
                const response = await api("/api/profile", {
                    method: "GET",
                });

                setData(response.account);
            };

            fetchData();
        }
    }, [isAuthenticated, loading, refreshKey]);

    return (
        <UserProfileContext.Provider value={{ data, setData, refreshKey, setRefreshKey }}>
            {children}
        </UserProfileContext.Provider>
    );
}

export const useUserProfile = () => {
    const context = useContext(UserProfileContext);

    if (!context) {
        throw new Error("useUserProfile must be used inside UserProfileProvider");
    }
    return context;
};