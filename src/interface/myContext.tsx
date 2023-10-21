import { createContext, useContext, ReactNode, useState } from 'react';

interface MyContextType {
    menu: string;
    updateMenu: (newData: string) => void;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

export function MyProvider({ children }: { children: ReactNode }) {
    const [menu, setMenu] = useState<string>("Initial Data");

    const updateMenu = (newData: string) => {
        setMenu(newData);
    };

    return <MyContext.Provider value={{ menu, updateMenu }}>{children}</MyContext.Provider>;
}

export function useMyContext() {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error('useMyContext must be used within a MyProvider');
    }
    return context;
}