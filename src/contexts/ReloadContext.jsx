import React, { createContext} from 'react';
import {useUpdate}  from '../hooks/useUpdate';

const ReloadContext = createContext();

 

const ReloadProvider = ({ children }) => {
    const savedList = useUpdate()

    return (
        <ReloadContext.Provider value={{savedList }}>
            {children}
        </ReloadContext.Provider>
    );
}

export { ReloadContext, ReloadProvider };