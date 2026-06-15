import { createContext, useContext, useState, useCallback } from 'react'

interface SpeakingContextType {
  isSpeaking: boolean
  currentLine: number
  setSpeaking: (v: boolean) => void
  setCurrentLine: (n: number) => void
}

export const SpeakingContext = createContext<SpeakingContextType>({
  isSpeaking: false,
  currentLine: 0,
  setSpeaking: () => {},
  setCurrentLine: () => {},
})

export function SpeakingProvider({ children }: { children: React.ReactNode }) {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [currentLine, setCurrentLine] = useState(0)

  const setSpeaking = useCallback((v: boolean) => setIsSpeaking(v), [])

  return (
    <SpeakingContext.Provider value={{ isSpeaking, currentLine, setSpeaking, setCurrentLine }}>
      {children}
    </SpeakingContext.Provider>
  )
}

export const useSpeaking = () => useContext(SpeakingContext)
