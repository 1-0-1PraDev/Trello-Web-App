import { createContext, useState } from "react"
import React, { ReactNode } from "react";

interface ThemeContextProps{
    theme: string;
    toggleTheme: (newTheme: string) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider:React.FC<{children: ReactNode}> = ({ children }) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = (newTheme: string) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    }

    return(
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            { children }
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = React.useContext(ThemeContext);
    if(!context){
        throw new Error('useTheme must be used within an ThemeProvider');
    }
    return context;
}