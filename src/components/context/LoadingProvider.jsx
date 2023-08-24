import React, { createContext, useState } from 'react'

export const loadingContext = createContext();

export default function LoadingProvider({children}) {

    const [loading, setLoading] = useState(false);

    return (
    <loadingContext.Provider value={{ loading, setLoading }}>
        {children}
    </loadingContext.Provider>
  )
}
