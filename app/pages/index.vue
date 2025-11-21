<script setup lang="ts">
import type { Question } from '~/types'

// Get current locale from i18n
const { locale } = useI18n()
const localePath = useLocalePath()

// Fetch all JavaScript questions using queryCollection (Nuxt Content v3 API) with i18n
const { data: questions } = await useAsyncData(
  `questions-${locale.value}`,
  async () => {
    // Use the correct collection based on locale
    const collectionName = locale.value === 'fr' ? 'content_fr' : 'content_en'
    const allContent = await queryCollection(collectionName).all()
    return allContent.sort(
      (a, b) => (Number(a.id) || 0) - (Number(b.id) || 0)
    ) as unknown as Question[]
  },
  {
    watch: [locale], // Refetch when locale changes
    server: true, // Enable server-side fetching
    lazy: false, // Wait for data before rendering
  }
)

// Composables
const { getFavoriteCount: _getFavoriteCount } = useFavorites()
const {
  searchQuery,
  selectedDifficulties,
  selectedCategories,
  selectedStatus: _selectedStatus,
  showOnlyFavorites: _showOnlyFavorites,
  filterQuestions,
  getAllCategories,
  resetFilters,
  toggleDifficultyFilter,
  toggleCategoryFilter,
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

// Count questions by difficulty (based on filtered results)
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

const categoryStats = computed(() => {
  if (!filteredQuestions.value) return []
  return availableCategories.value.map(({ category }) => ({
    category,
    count: filteredQuestions.value.filter((q) => q.meta.category === category).length,
  }))
})

const questionsByCategory = computed(() => {
  if (!filteredQuestions.value) return {}

  return filteredQuestions.value.reduce(
    (acc, question) => {
      const cat = question.meta.category
      if (!acc[cat]) acc[cat] = []
      acc[cat].push(question)
      return acc
    },
    {} as Record<string, Question[]>
  )
})

const categories = ['javascript', 'html', 'css', 'vuejs', 'reactjs']

const getCategoryClasses = (category: string) => {
  const classes: Record<
    string,
    {
      ring: string
      text: string
      hoverShadow: string
    }
  > = {
    javascript: {
      ring: 'ring-2 ring-blue-500',
      text: 'text-blue-500',
      hoverShadow: 'hover:shadow-blue-500/20',
    },
    html: {
      ring: 'ring-2 ring-orange-500',
      text: 'text-orange-500',
      hoverShadow: 'hover:shadow-orange-500/20',
    },
    css: {
      ring: 'ring-2 ring-indigo-500',
      text: 'text-indigo-500',
      hoverShadow: 'hover:shadow-indigo-500/20',
    },
    vuejs: {
      ring: 'ring-2 ring-green-500',
      text: 'text-green-500',
      hoverShadow: 'hover:shadow-green-500/20',
    },
    reactjs: {
      ring: 'ring-2 ring-cyan-500',
      text: 'text-cyan-500',
      hoverShadow: 'hover:shadow-cyan-500/20',
    },
  }
  return classes[category] || { ring: 'ring-2 ring-gray-500', text: 'text-gray-500', hoverShadow: 'hover:shadow-gray-500/20' }
}

// SEO
const siteUrl = 'https://nicopio.github.io/interview-training'
const canonicalUrl = computed(() => {
  const path = locale.value === 'fr' ? '/' : '/en'
  return `${siteUrl}${path}`
})

useSeoMeta({
  title: 'JS Interview Prep - Master JavaScript Interview Questions',
  description:
    'Practice JavaScript interview questions with interactive flashcards. Prepare for your next technical interview with curated questions covering ES6, closures, promises, and more.',
  ogTitle: 'JS Interview Prep - Master JavaScript Interview Questions',
  ogDescription:
    'Interactive flashcard system with 26+ JavaScript interview questions. Track your progress, test yourself with quiz mode, and ace your next technical interview.',
  ogUrl: canonicalUrl.value,
  ogType: 'website',
  ogImage: `${siteUrl}/og-image.svg`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  twitterCard: 'summary_large_image',
  twitterTitle: 'JS Interview Prep - Master JavaScript Interview Questions',
  twitterDescription:
    '26+ JavaScript interview questions with interactive flashcards, progress tracking, and quiz mode',
  twitterImage: `${siteUrl}/og-image.svg`,
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: canonicalUrl.value,
    },
  ],
})
</script>

<template>
  <div
    class="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900"
  >
    <!-- Header -->
    <header
      class="sticky top-0 z-50 border-b bg-white/80 backdrop-blur dark:bg-gray-950/80 dark:border-gray-800"
    >
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="flex items-center gap-2" active-class="" exact-active-class="">
            <UIcon name="i-heroicons-code-bracket" class="text-2xl text-primary-500" aria-hidden="true" />
            <span class="font-bold text-lg">JS Interview Prep</span>
          </NuxtLink>
          <div class="flex items-center gap-2">
            <LanguageSwitcher />
            <UColorModeButton />
          </div>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="container mx-auto px-4 py-16 md:py-24">
      <div class="max-w-4xl mx-auto text-center">
        <div class="flex justify-center mb-6 animate-[scale-in_0.5s_ease-out]">
          <UIcon name="i-heroicons-code-bracket" class="text-6xl text-primary-500" aria-hidden="true" />
        </div>

        <h1
          class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-[fade-in-up_0.6s_ease-out_0.1s_both]"
        >
          Master Frontend
          <span class="text-primary-500">Interview Questions</span>
        </h1>

        <p
          class="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto animate-[fade-in-up_0.6s_ease-out_0.2s_both]"
        >
          Practice with interactive flashcards covering essential JavaScript concepts. Reveal
          answers when ready and track your progress.
        </p>

        <div
          class="flex flex-wrap justify-center gap-4 animate-[fade-in-up_0.6s_ease-out_0.3s_both]"
        >
          <UButton
            :to="
              localePath(
                '/javascript/how-do-you-detect-primitive-or-non-primitive-value-types-in-javascript'
              )
            "
            size="xl"
            icon="i-heroicons-play"
          >
            Start Practicing
          </UButton>
          <UButton
            to="#questions"
            size="xl"
            color="neutral"
            variant="outline"
            icon="i-heroicons-queue-list"
          >
            Browse Questions
          </UButton>
        </div>
      </div>
    </section>

    <!-- Progress Section -->
    <section v-if="questions && questions.length > 0" class="container mx-auto px-4 py-12">
      <div class="max-w-4xl mx-auto">
        <ProgressBar :total-questions="stats.total" />
      </div>
    </section>

    <!-- Stats Section -->
    <section class="container mx-auto px-4 py-12">
      <div class="max-w-4xl mx-auto">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <UCard class="animate-[fade-in-up_0.6s_ease-out_0.4s_both]">
            <div class="text-center">
              <div class="text-3xl font-bold text-primary-500">{{ stats.total }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Questions</div>
            </div>
          </UCard>
          <UCard
            class="cursor-pointer hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 hover:scale-105 animate-[fade-in-up_0.6s_ease-out_0.45s_both]"
            :class="{ 'ring-2 ring-green-500': selectedDifficulties.includes('easy') }"
            @click="toggleDifficultyFilter('easy')"
          >
            <div class="text-center">
              <div class="text-3xl font-bold text-green-500">{{ stats.easy }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Easy</div>
            </div>
          </UCard>
          <UCard
            class="cursor-pointer hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 hover:scale-105 animate-[fade-in-up_0.6s_ease-out_0.5s_both]"
            :class="{ 'ring-2 ring-yellow-500': selectedDifficulties.includes('medium') }"
            @click="toggleDifficultyFilter('medium')"
          >
            <div class="text-center">
              <div class="text-3xl font-bold text-yellow-500">{{ stats.medium }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Medium</div>
            </div>
          </UCard>
          <UCard
            class="cursor-pointer hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 hover:scale-105 animate-[fade-in-up_0.6s_ease-out_0.55s_both]"
            :class="{ 'ring-2 ring-red-500': selectedDifficulties.includes('hard') }"
            @click="toggleDifficultyFilter('hard')"
          >
            <div class="text-center">
              <div class="text-3xl font-bold text-red-500">{{ stats.hard }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Hard</div>
            </div>
          </UCard>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="container mx-auto px-4 py-12">
      <div class="max-w-4xl mx-auto">
        <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
          <UCard
            v-for="(categoryData, index) in categoryStats"
            :key="categoryData.category"
            class="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 animate-[fade-in-up_0.6s_ease-out_both]"
            :class="[
              getCategoryClasses(categoryData.category).hoverShadow,
              selectedCategories.includes(categoryData.category) ? getCategoryClasses(categoryData.category).ring : '',
            ]"
            :style="{ animationDelay: `${0.6 + index * 0.05}s` }"
            @click="toggleCategoryFilter(categoryData.category)"
          >
            <div class="text-center">
              <div
                class="text-3xl font-bold"
                :class="getCategoryClasses(categoryData.category).text"
              >
                {{ categoryData.count }}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {{ $t(`filters.category.${categoryData.category}`) }}
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </section>

    <!-- Questions List -->
    <section id="questions" class="container mx-auto px-4 py-12">
      <div class="max-w-4xl mx-auto">
        <div class="flex items-center justify-between mb-8 flex-wrap gap-4">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white">All Questions</h2>
        </div>

        <!-- Search Bar -->
        <div class="mb-6">
          <SearchBar v-model="searchQuery" :result-count="filteredQuestions.length" />
        </div>

        <div v-if="filteredQuestions && filteredQuestions.length > 0" class="space-y-12">
          <CategoryCarousel
            v-for="category in categories"
            :key="category"
            :category="category"
            :questions="questionsByCategory[category] || []"
            :max="10"
          />
        </div>

        <div v-else-if="!questions" class="text-center py-12">
          <p class="text-gray-600 dark:text-gray-400">Loading questions...</p>
        </div>

        <div v-else class="text-center py-12">
          <UIcon
            name="i-heroicons-magnifying-glass"
            class="text-6xl text-gray-300 dark:text-gray-700 mb-4"
            aria-hidden="true"
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
            <UIcon name="i-heroicons-heart-solid" class="text-red-500 inline" aria-hidden="true" />
            using Nuxt 4, Nuxt Content & Nuxt UI
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>
