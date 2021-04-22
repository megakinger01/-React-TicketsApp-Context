import React, { createContext, useState } from 'react'

export const UiContext= createContext()

export const UiProvider = ({children}) => {

    const [ocultar, setOcultar] = useState(false)

    const menuOculto = () => {
        setOcultar(true)
    }

    const menu = () => {
        setOcultar(false)
    }

    return (
        <UiContext.Provider value={{ ocultar, menuOculto , menu }}>
            { children }
        </UiContext.Provider>
    )
}
