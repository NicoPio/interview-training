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
  selectedDifficulties,
  selectedStatus,
  showOnlyFavorites,
  filterQuestions,
  getActiveFiltersCount,
  resetFilters,
  toggleDifficultyFilter,
  toggleStatusFilter,
} = useQuestionFilters()

// Filtered questions
const filteredQuestions = computed(() => {
  if (!questions.value) return []
  return filterQuestions(questions.value)
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


// Status stats
const { getProgress } = useQuestionProgress()
const statusStats = computed(() => {
  if (!questions.value) return { notSeen: 0, seen: 0, mastered: 0 }
  return {
    notSeen: questions.value.filter((q) => {
      const progress = getProgress(String(q.id))
      return !progress || progress.status === 'not-seen'
    }).length,
    seen: questions.value.filter((q) => {
      const progress = getProgress(String(q.id))
      return progress?.status === 'seen'
    }).length,
    mastered: questions.value.filter((q) => {
      const progress = getProgress(String(q.id))
      return progress?.status === 'mastered'
    }).length,
  }
})

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

        <!-- Filters Section -->
        <div class="mb-8 space-y-6">

          <!-- Status Filter -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Statut</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <UCard
                class="cursor-pointer hover:shadow-lg hover:shadow-gray-500/20 transition-all duration-300 hover:scale-105"
                :class="{ 'ring-2 ring-gray-500': selectedStatus === 'all' }"
                @click="toggleStatusFilter('all')"
              >
                <div class="text-center">
                  <div class="text-2xl font-bold text-gray-500">{{ stats.total }}</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Toutes</div>
                </div>
              </UCard>
              <UCard
                class="cursor-pointer hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:scale-105"
                :class="{ 'ring-2 ring-blue-500': selectedStatus === 'not-seen' }"
                @click="toggleStatusFilter('not-seen')"
              >
                <div class="text-center">
                  <div class="text-2xl font-bold text-blue-500">{{ statusStats.notSeen }}</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Non vues</div>
                </div>
              </UCard>
              <UCard
                class="cursor-pointer hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 hover:scale-105"
                :class="{ 'ring-2 ring-yellow-500': selectedStatus === 'seen' }"
                @click="toggleStatusFilter('seen')"
              >
                <div class="text-center">
                  <div class="text-2xl font-bold text-yellow-500">{{ statusStats.seen }}</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Vues</div>
                </div>
              </UCard>
              <UCard
                class="cursor-pointer hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105"
                :class="{ 'ring-2 ring-purple-500': selectedStatus === 'mastered' }"
                @click="toggleStatusFilter('mastered')"
              >
                <div class="text-center">
                  <div class="text-2xl font-bold text-purple-500">{{ statusStats.mastered }}</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Maîtrisées</div>
                </div>
              </UCard>
            </div>
          </div>

          <!-- Favorites Toggle -->
          <div>
            <UCard
              class="cursor-pointer hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300"
              :class="{ 'ring-2 ring-pink-500': showOnlyFavorites }"
              @click="showOnlyFavorites = !showOnlyFavorites"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <UIcon
                    name="i-heroicons-heart-solid"
                    class="text-2xl"
                    :class="showOnlyFavorites ? 'text-pink-500' : 'text-gray-400'"
                  />
                  <span class="font-semibold text-gray-900 dark:text-white">Favoris uniquement</span>
                </div>
                <USwitch v-model="showOnlyFavorites" />
              </div>
            </UCard>
          </div>

          <!-- Reset Button -->
          <div v-if="activeFiltersCount > 0" class="flex justify-between items-center">
            <UButton
              variant="outline"
              color="neutral"
              @click="resetFilters"
            >
              Réinitialiser les filtres
            </UButton>
            <UBadge color="primary">
              {{ activeFiltersCount }} {{ activeFiltersCount > 1 ? 'filtres actifs' : 'filtre actif' }}
            </UBadge>
          </div>
        </div>

        <div v-if="filteredQuestions && filteredQuestions.length > 0">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <QuestionCardLink
              v-for="question in filteredQuestions"
              :id="Number(question.id)"
              :key="question.id"
              :title="question.title"
              :difficulty="question.meta.difficulty"
              :category="question.meta.category"
              :slug="question.meta.slug"
            />
          </div>
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
