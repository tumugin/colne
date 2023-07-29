import React, { useEffect } from 'react'

export function useOnFirstMount(
  onMount: () => (() => void) | void | Promise<void>,
) {
  const isCompleted = React.useRef(false)

  useEffect(() => {
    if (!isCompleted.current) {
      try {
        const result = onMount()
        if (result && typeof result === 'function') {
          return result
        }
      } catch (e) {
        throw e
      } finally {
        isCompleted.current = true
      }
    }
  }, [onMount])
}
