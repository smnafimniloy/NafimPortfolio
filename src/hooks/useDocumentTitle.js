import { useEffect } from 'react'

// Keeps the browser tab title right when moving between pages without a reload.
// (The first load already has the right <title> from the prerendered HTML.)
export function useDocumentTitle(title) {
  useEffect(() => {
    if (title) document.title = title
  }, [title])
}
