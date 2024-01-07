import { createContext } from 'react'

interface IEditorContext {
  isAiLoading: boolean
  aiError?: string | null
  setIsAiLoading: any
  setAiError: any
}

export const EditorContext = createContext<IEditorContext>({
  isAiLoading: false,
  aiError: null,
  setIsAiLoading: () => {},
  setAiError: () => {},
})
