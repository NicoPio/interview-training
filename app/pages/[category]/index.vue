<script setup lang="ts">
import type { Question } from '~/types'

const route = useRoute()
const category = route.params.category as string

// Get current locale from i18n
const { locale } = useI18n()

// Fetch questions for this category with i18n support
const { data: questions } = await useAsyncData(
  `category-${category}-${locale.value}`,
  async () => {
    // Use the correct collection based on locale
    const collectionName = locale.value === 'fr' ? 'content_fr' : 'content_en'
    const allContent = await queryCollection(collectionName).all()
    const filtered = allContent.filter((item) => {
      const q = item as unknown as Question
      return q.meta.category === category
    })
    return filtered.sort(
      (a, b) => (Number(a.id) || 0) - (Number(b.id) || 0)
    ) as unknown as Question[]
  },
  {
    watch: [locale], // Refetch when locale changes
  }
)

// Handle 404 if category has no questions
if (!questions.value || questions.value.length === 0) {
  throw createError({
    statusCode: 404,
    message: `No questions found in category: ${category}`,
    fatal: true,
  })
}

// Composables
const {
  searchQuery,
  selectedDifficulties,
  selectedStatus: _selectedStatus,
  showOnlyFavorites: _showOnlyFavorites,
  filterQuestions,
  getAllCategories,
  getActiveFiltersCount,
  resetFilters,
  toggleDifficultyFilter,
} = useQuestionFilters()

// Filtered questions
const filteredQuestions = computed(() => {
  if (!questions.value) return []
  return filterQuestions(questions.value)
})

// Available categories for filter
const availableCategories = computed(() => {
  if (!questions.value) return []
  return getAllCategories(questions.value)
})

// Count questions by difficulty for this category (based on filtered results)
const stats = computed(() => {
  if (!filteredQuestions.value) return { easy: 0, medium: 0, hard: 0, total: 0 }

  const items = filteredQuestions.value
  return {
    easy: items.filter((q) => q.meta.difficulty === 'easy').length,
    medium: items.filter((q) => q.meta.difficulty === 'medium').length,
    hard: items.filter((q) => q.meta.difficulty === 'hard').length,
    total: items.length,
  }
})

const activeFiltersCount = computed(() => getActiveFiltersCount())

// SEO Meta tags
useSeoMeta({
  title: `${category.charAt(0).toUpperCase() + category.slice(1)} Interview Questions`,
  description: `Browse ${stats.value.total} ${category} interview questions. Practice and prepare for your next technical interview.`,
})
</script>

<template>
  <div
    class="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900"
  >
    <!-- Breadcrumb -->
    <section class="container mx-auto px-4 py-6">
      <nav class="mb-6">
        <ol class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <li>
            <NuxtLink to="/" class="hover:text-primary-500 transition-colors"> Home </NuxtLink>
          </li>
          <li>
            <UIcon name="i-heroicons-chevron-right" class="text-xs" />
          </li>
          <li class="text-gray-900 dark:text-white font-medium capitalize">
            {{ category }}
          </li>
        </ol>
      </nav>
    </section>

    <!-- Header Section -->
    <section class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <div class="flex items-center gap-4 mb-6">
          <UIcon name="i-heroicons-code-bracket" class="text-4xl text-primary-500" />
          <h1 class="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white capitalize">
            {{ category }} Questions
          </h1>
        </div>

        <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Browse {{ stats.total }} {{ category }} interview questions to prepare for your next
          technical interview.
        </p>

        <!-- Stats Cards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <UCard>
            <div class="text-center">
              <div class="text-2xl font-bold text-primary-500">{{ stats.total }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Total</div>
            </div>
          </UCard>
          <UCard
            class="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
            :class="{ 'ring-2 ring-green-500': selectedDifficulties.includes('easy') }"
            @click="toggleDifficultyFilter('easy')"
          >
            <div class="text-center">
              <div class="text-2xl font-bold text-green-500">{{ stats.easy }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Easy</div>
            </div>
          </UCard>
          <UCard
            class="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
            :class="{ 'ring-2 ring-yellow-500': selectedDifficulties.includes('medium') }"
            @click="toggleDifficultyFilter('medium')"
          >
            <div class="text-center">
              <div class="text-2xl font-bold text-yellow-500">{{ stats.medium }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Medium</div>
            </div>
          </UCard>
          <UCard
            class="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
            :class="{ 'ring-2 ring-red-500': selectedDifficulties.includes('hard') }"
            @click="toggleDifficultyFilter('hard')"
          >
            <div class="text-center">
              <div class="text-2xl font-bold text-red-500">{{ stats.hard }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Hard</div>
            </div>
          </UCard>
        </div>
      </div>
    </section>

    <!-- Questions List -->
    <section class="container mx-auto px-4 py-6">
      <div class="max-w-4xl mx-auto">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">All Questions</h2>
        </div>

        <!-- Search Bar -->
        <div class="mb-6">
          <SearchBar v-model="searchQuery" :result-count="filteredQuestions.length" />
        </div>

        <!-- Filters Section -->
        <UCard class="mb-8">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold">Filtres</h3>
              <UBadge v-if="activeFiltersCount > 0" color="primary">
                {{ activeFiltersCount }}
              </UBadge>
            </div>
          </template>
          <QuestionFilters  :available-categories="availableCategories" />
        </UCard>

        <div v-if="filteredQuestions && filteredQuestions.length > 0">
          <QuestionCarousel
            :questions="filteredQuestions"
            :show-arrows="true"
            :show-dots="true"
            :loop="true"
          />
        </div>

        <div v-else class="text-center py-12">
          <UIcon
            name="i-heroicons-magnifying-glass"
            class="text-6xl text-gray-300 dark:text-gray-700 mb-4"
          />
          <p class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Aucun résultat trouvé
          </p>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Aucune question ne correspond aux filtres sélectionnés.
          </p>
          <UButton color="primary" variant="outline" @click="resetFilters">
            Réinitialiser les filtres
          </UButton>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t mt-12 bg-white dark:bg-gray-950 dark:border-gray-800">
      <div class="container mx-auto px-4 py-8">
        <div class="max-w-4xl mx-auto text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            Built with
            <UIcon name="i-heroicons-heart-solid" class="text-red-500 inline" />
            using Nuxt 4, Nuxt Content & Nuxt UI
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>
