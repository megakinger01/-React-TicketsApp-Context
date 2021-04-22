import  { useContext, useEffect } from 'react'
import { UiContext } from '../context/UiContext'

export const useOcultarMenu = ( ocultar ) => {

    const { menuOculto , menu  } = useContext(UiContext)

    useEffect(() => {

        if (ocultar) {
            menuOculto()
            
        }else {
            menu()
        }
       
    }, [ ocultar , menuOculto , menu ])

}
