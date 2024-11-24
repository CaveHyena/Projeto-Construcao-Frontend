import { createContext } from "react";
import {data} from "../restApi.json"

export const AppContext = createContext()

const AppContextProvider = (props) => {
  const value = { data }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider