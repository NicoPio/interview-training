import { useMagicKeys, whenever } from '@vueuse/core'

export const useKeyboardShortcuts = () => {
  const router = useRouter()
  const localePath = useLocalePath()

  // Get magic keys
  const { shift, slash, h, escape, arrowLeft, arrowRight, question } = useMagicKeys()

  // State for help modal
  const showHelp = useState('keyboard-shortcuts-help', () => false)

  // Search focus (handled by SearchBar component, but we track it here)
  const isSearchFocused = useState('search-focused', () => false)

  // Check if we should handle shortcuts (not in input/textarea)
  const shouldHandleShortcut = () => {
    if (import.meta.server) return false

    const activeElement = document.activeElement
    const tagName = activeElement?.tagName.toLowerCase()

    // Don't handle shortcuts if user is typing
    return !['input', 'textarea', 'select'].includes(tagName || '')
  }

  // Home shortcut: 'h' → go to home
  if (h) {
    whenever(h, () => {
      if (shouldHandleShortcut() && !showHelp.value) {
        router.push(localePath('/'))
      }
    })
  }

  // Help modal: '?' or 'Shift+/' → toggle help
  if (question) {
    whenever(question, () => {
      if (shouldHandleShortcut()) {
        showHelp.value = !showHelp.value
      }
    })
  }

  // Search focus: '/' → focus search input
  if (slash) {
    whenever(slash, () => {
      if (shouldHandleShortcut() && !showHelp.value) {
        isSearchFocused.value = true
      }
    })
  }

  // Escape: close modals
  if (escape) {
    whenever(escape, () => {
      if (showHelp.value) {
        showHelp.value = false
      }
    })
  }

  // Navigation shortcuts are handled per-page (in question pages)
  // Arrow Left/Right will be added in individual page components

  return {
    showHelp,
    isSearchFocused,
    shouldHandleShortcut,
    keys: {
      arrowLeft,
      arrowRight,
      escape,
    }
  }
}
