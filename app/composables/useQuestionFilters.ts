import type { Question, DifficultyLevel, FilterStatus, Category } from '~/types'
import type { LocationQueryValue } from 'vue-router'

const normalizeString = (str: string | undefined): string => {
  if (!str) return ''
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

const parseQueryArray = (value: LocationQueryValue | LocationQueryValue[]): string[] => {
  if (!value) return []
  if (Array.isArray(value)) {
    return value.filter((v): v is string => v !== null)
  }
  if (typeof value === 'string') {
    return value.split(',').filter(Boolean)
  }
  return []
}

export const useQuestionFilters = () => {
  const route = useRoute()
  const router = useRouter()
  const { getProgress } = useQuestionProgress()
  const { isFavorite } = useFavorites()

  const searchQuery = useState<string>('search-query', () => '')
  const selectedDifficulties = useState<DifficultyLevel[]>('selected-difficulties', () => [])
  const selectedCategories = useState<Category[]>('selected-categories', () => [])
  const selectedStatus = useState<FilterStatus>('selected-status', () => 'all')
  const showOnlyFavorites = useState<boolean>('show-only-favorites', () => false)

  if (import.meta.client) {
    searchQuery.value = (route.query.search as string) || ''
    selectedDifficulties.value = parseQueryArray(
      route.query.difficulty as LocationQueryValue | LocationQueryValue[]
    ) as DifficultyLevel[]
    selectedCategories.value = parseQueryArray(
      route.query.categories as LocationQueryValue | LocationQueryValue[]
    ) as Category[]
    selectedStatus.value = (route.query.status as FilterStatus) || 'all'
    showOnlyFavorites.value = Boolean(route.query.favorites === 'true')
  }

  const updateURL = () => {
    const query: Record<string, string> = {}

    if (searchQuery.value) {
      query.search = searchQuery.value
    }

    if (selectedDifficulties.value.length > 0) {
      query.difficulty = selectedDifficulties.value.join(',')
    }

    if (selectedCategories.value.length > 0) {
      query.categories = selectedCategories.value.join(',')
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
    [searchQuery, selectedDifficulties, selectedCategories, selectedStatus, showOnlyFavorites],
    () => {
      updateURL()
    },
    { deep: true }
  )

  const matchesSearch = (question: Question, query: string): boolean => {
    if (!query) return true

    const normalizedQuery = normalizeString(query)

    const titleMatch = normalizeString(question.meta?.title).includes(normalizedQuery)

    const tagsMatch =
      question.meta?.tags?.some((tag: string) => normalizeString(tag).includes(normalizedQuery)) ??
      false

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

      if (
        selectedCategories.value.length > 0 &&
        !selectedCategories.value.includes(question.meta.category as Category)
      ) {
        return false
      }

      if (!matchesStatus(question, selectedStatus.value)) return false

      if (showOnlyFavorites.value) {
        const questionId = String(question.id)
        if (!isFavorite(questionId)) return false
      }

      return true
    })
  }

  const getAllCategories = (questions: Question[]): { category: Category; count: number }[] => {
    const categoryCount = new Map<Category, number>()
    questions.forEach((question) => {
      const category = question.meta.category as Category
      categoryCount.set(category, (categoryCount.get(category) || 0) + 1)
    })

    // Order: javascript, html, css, vuejs, reactjs
    const orderedCategories: Category[] = ['javascript', 'html', 'css', 'vuejs', 'reactjs']
    return orderedCategories
      .filter((cat) => categoryCount.has(cat))
      .map((cat) => ({ category: cat, count: categoryCount.get(cat)! }))
  }

  const getActiveFiltersCount = (): number => {
    let count = 0
    if (searchQuery.value) count++
    if (selectedDifficulties.value.length > 0) count++
    if (selectedCategories.value.length > 0) count++
    if (selectedStatus.value !== 'all') count++
    if (showOnlyFavorites.value) count++
    return count
  }

  const resetFilters = () => {
    searchQuery.value = ''
    selectedDifficulties.value = []
    selectedCategories.value = []
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

  const toggleCategoryFilter = (category: Category) => {
    const index = selectedCategories.value.indexOf(category)
    if (index > -1) {
      selectedCategories.value.splice(index, 1)
    } else {
      selectedCategories.value.push(category)
    }
  }

  return {
    searchQuery,
    selectedDifficulties,
    selectedCategories,
    selectedStatus,
    showOnlyFavorites,
    filterQuestions,
    getAllCategories,
    getActiveFiltersCount,
    resetFilters,
    toggleDifficultyFilter,
    toggleCategoryFilter,
  }
}
