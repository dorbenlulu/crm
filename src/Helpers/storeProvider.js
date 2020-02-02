import { createContext } from 'react'
import {ClientsStore} from '../Store/ClientsStore'
import {ClientStore} from '../Store/ClientStore'

export const StoreContext = createContext(ClientsStore)
export const StoreProvider = StoreContext.Provider
export const StoreConsumer = StoreContext.Consumer

export const ClientStoreContext = createContext(ClientStore)

export default StoreContext
