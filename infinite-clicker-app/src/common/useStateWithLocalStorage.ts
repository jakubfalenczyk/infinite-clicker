import { useState, useEffect } from "react"

export function useStateWithLocalStorage<T>(defaultValue: T, key: string) {
  const save = localStorage.getItem(key)
  const savedState = save ? JSON.parse(save) as T : defaultValue
  const [state, setState] = useState(savedState)

  useEffect(() => {
    const stateToSave = JSON.stringify(state)
    localStorage.setItem(key, stateToSave)
  }, [state, key])

  return {
    state,
    setState
  }
}