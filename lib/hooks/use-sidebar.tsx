'use client'

import * as React from 'react'

const LOCAL_STORAGE_KEY = 'sidebar'

interface SidebarContext {
  isSidebarOpen: boolean
  toggleSidebar: (toggleMode: string) => void
  isLoading: boolean
  mode: string
  changeMode: (mode: string) => void
}

const SidebarContext = React.createContext<SidebarContext | undefined>(
  undefined
)

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebarContext must be used within a SidebarProvider')
  }
  return context
}

interface SidebarProviderProps {
  children: React.ReactNode
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isSidebarOpen, setSidebarOpen] = React.useState(true)
  const [isLoading, setLoading] = React.useState(true)
  const [mode, setMode] = React.useState('chatMode')

  React.useEffect(() => {
    const value = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (value) {
      setSidebarOpen(JSON.parse(value))
    }
    setLoading(false)
  }, [])

  const toggleSidebar = (toggleMode: string) => {
    const isModeMatch = toggleMode === mode;
    const newState = isModeMatch ? !isSidebarOpen : true;
  
    setSidebarOpen(newState);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
  };

  const changeMode = (mode: string) => {
    setMode(mode);
  }

  if (isLoading) {
    return null
  }

  return (
    <SidebarContext.Provider
      value={{ isSidebarOpen, toggleSidebar, isLoading, mode, changeMode }}
    >
      {children}
    </SidebarContext.Provider>
  )
}
