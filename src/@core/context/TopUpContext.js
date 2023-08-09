// src/@core/context/TopUpContext.js

import React from 'react';

// Create Context
const TopUpContext = React.createContext();

// Provider
export function TopUpProvider({ children }) {
    const [topUpOpen, setTopUpOpen] = React.useState(false);

    return (
        <TopUpContext.Provider value={{ topUpOpen, setTopUpOpen }}>
            {children}
        </TopUpContext.Provider>
    );
}

// Custom Hook
export function useTopUp() {
    const context = React.useContext(TopUpContext);
    if (!context) {
        throw new Error('useTopUp must be used within a TopUpProvider');
    }

    return context;
}
