import type { ProgressStatus } from './useQuestionProgress'

export type DifficultyLevel = 'easy' | 'medium' | 'hard'
export type FilterStatus = 'all' | 'not-seen' | 'seen' | 'mastered'

interface Question {
  id: string | number
  meta: {
    title: string
    difficulty?: DifficultyLevel
    tags?: string[]
    category?: string
  }
}

const normalizeString = (str: string | undefined): string => {
  if (!str) return ''
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

const parseQueryArray = (value: string | string[] | undefined): string[] => {
  if (!value) return []
  if (Array.isArray(value)) return value
  return value.split(',').filter(Boolean)
}

export const useQuestionFilters = () => {
  const route = useRoute()
  const router = useRouter()
  const { getProgress } = useQuestionProgress()
  const { isFavorite } = useFavorites()

  const searchQuery = ref<string>('')
  const selectedDifficulties = ref<DifficultyLevel[]>([])
  const selectedTags = ref<string[]>([])
  const selectedStatus = ref<FilterStatus>('all')
  const showOnlyFavorites = ref<boolean>(false)

  if (import.meta.client) {
    searchQuery.value = (route.query.search as string) || ''
    selectedDifficulties.value = parseQueryArray(route.query.difficulty) as DifficultyLevel[]
    selectedTags.value = parseQueryArray(route.query.tags)
    selectedStatus.value = (route.query.status as FilterStatus) || 'all'
    showOnlyFavorites.value = route.query.favorites === 'true'
  }

  const updateURL = () => {
    const query: Record<string, string> = {}

    if (searchQuery.value) {
      query.search = searchQuery.value
    }

    if (selectedDifficulties.value.length > 0) {
      query.difficulty = selectedDifficulties.value.join(',')
    }

    if (selectedTags.value.length > 0) {
      query.tags = selectedTags.value.join(',')
    }

    if (selectedStatus.value !== 'all') {
      query.status = selectedStatus.value
    }

    if (showOnlyFavorites.value) {
      query.favorites = 'true'
    }

    router.replace({ query })
  }

  watch(
    [searchQuery, selectedDifficulties, selectedTags, selectedStatus, showOnlyFavorites],
    () => {
      updateURL()
    },
    { deep: true }
  )

  const matchesSearch = (question: Question, query: string): boolean => {
    if (!query) return true

    const normalizedQuery = normalizeString(query)

    const titleMatch = normalizeString(question.meta?.title).includes(normalizedQuery)

    const tagsMatch = question.meta?.tags?.some((tag: string) =>
      normalizeString(tag).includes(normalizedQuery)
    )

    return titleMatch || tagsMatch
  }

  const matchesStatus = (question: Question, status: FilterStatus): boolean => {
    if (status === 'all') return true

    const questionId = String(question.id)
    const progress = getProgress(questionId)

    switch (status) {
      case 'not-seen':
        return progress.status === 'not-seen'
      case 'seen':
        return progress.status === 'seen'
      case 'mastered':
        return progress.status === 'mastered'
      default:
        return true
    }
  }

  const filterQuestions = (questions: Question[]): Question[] => {
    return questions.filter((question) => {
      if (!matchesSearch(question, searchQuery.value)) return false

      if (
        selectedDifficulties.value.length > 0 &&
        !selectedDifficulties.value.includes(question.meta.difficulty as DifficultyLevel)
      ) {
        return false
      }

      if (selectedTags.value.length > 0) {
        const questionTags = question.meta.tags || []
        const hasMatchingTag = selectedTags.value.some((tag) => questionTags.includes(tag))
        if (!hasMatchingTag) return false
      }

      if (!matchesStatus(question, selectedStatus.value)) return false

      if (showOnlyFavorites.value) {
        const questionId = String(question.id)
        if (!isFavorite(questionId)) return false
      }

      return true
    })
  }

  const getAllUniqueTags = (questions: Question[]): string[] => {
    const tagsSet = new Set<string>()
    questions.forEach((question) => {
      question.meta.tags?.forEach((tag) => tagsSet.add(tag))
    })
    return Array.from(tagsSet).sort()
  }

  const getActiveFiltersCount = (): number => {
    let count = 0
    if (searchQuery.value) count++
    if (selectedDifficulties.value.length > 0) count++
    if (selectedTags.value.length > 0) count++
    if (selectedStatus.value !== 'all') count++
    if (showOnlyFavorites.value) count++
    return count
  }

  const resetFilters = () => {
    searchQuery.value = ''
    selectedDifficulties.value = []
    selectedTags.value = []
    selectedStatus.value = 'all'
    showOnlyFavorites.value = false
  }

  const toggleDifficultyFilter = (difficulty: DifficultyLevel) => {
    const index = selectedDifficulties.value.indexOf(difficulty)
    if (index > -1) {
      selectedDifficulties.value.splice(index, 1)
    } else {
      selectedDifficulties.value.push(difficulty)
    }
  }

  return {
    searchQuery,
    selectedDifficulties,
    selectedTags,
    selectedStatus,
    showOnlyFavorites,
    filterQuestions,
    getAllUniqueTags,
    getActiveFiltersCount,
    resetFilters,
    toggleDifficultyFilter,
  }
}
