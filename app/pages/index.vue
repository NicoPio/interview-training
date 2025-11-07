<script setup lang="ts">
interface Question {
    id: string
    title: string
    meta: {
        slug: string
        category: string
        difficulty?: 'easy' | 'medium' | 'hard'
        tags?: string[]
    }
}

// Get current locale from i18n
const { locale } = useI18n()
const localePath = useLocalePath()

// Fetch all JavaScript questions using queryCollection (Nuxt Content v3 API) with i18n
const { data: questions } = await useAsyncData(`questions-${locale.value}`, async () => {
    // Use the correct collection based on locale
    const collectionName = locale.value === 'fr' ? 'content_fr' : 'content_en'
    // @ts-ignore - queryCollection type doesn't recognize our custom collection names
    const allContent = await queryCollection(collectionName).all()
    return allContent.sort((a, b) => (Number(a.id) || 0) - (Number(b.id) || 0)) as unknown as Question[]
}, {
    watch: [locale], // Refetch when locale changes
    server: true, // Enable server-side fetching
    lazy: false // Wait for data before rendering
})

// Composables
const { getFavoriteIds, getFavoriteCount } = useFavorites()

// Filter state
const showOnlyFavorites = ref(false)

// Filtered questions
const filteredQuestions = computed(() => {
    if (!questions.value) return []
    if (!showOnlyFavorites.value) return questions.value

    const favoriteIds = getFavoriteIds.value
    return questions.value.filter(q => favoriteIds.includes(String(q.id)))
})

// Count questions by difficulty
const stats = computed(() => {
    if (!questions.value) return { easy: 0, medium: 0, hard: 0, total: 0 }

    const items = questions.value
    return {
        easy: items.filter((q) => q.meta.difficulty === 'easy').length,
        medium: items.filter((q) => q.meta.difficulty === 'medium').length,
        hard: items.filter((q) => q.meta.difficulty === 'hard').length,
        total: items.length
    }
})

// Difficulty colors
const difficultyColors: Record<string, 'success' | 'warning' | 'error'> = {
    easy: 'success',
    medium: 'warning',
    hard: 'error'
}

useSeoMeta({
    title: 'JS Interview Prep - Master JavaScript Interview Questions',
    description: 'Practice JavaScript interview questions with interactive flashcards. Prepare for your next technical interview with curated questions covering ES6, closures, promises, and more.'
})
</script>

<template>
    <div class="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <!-- Header -->
        <header class="sticky top-0 z-50 border-b bg-white/80 backdrop-blur dark:bg-gray-950/80 dark:border-gray-800">
            <div class="container mx-auto px-4 py-4">
                <div class="flex items-center justify-between">
                    <NuxtLink to="/" class="flex items-center gap-2">
                        <UIcon name="i-heroicons-code-bracket" class="text-2xl text-primary-500" />
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
                <div class="flex justify-center mb-6">
                    <UIcon name="i-heroicons-code-bracket" class="text-6xl text-primary-500" />
                </div>

                <h1 class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                    Master Frontend
                    <span class="text-primary-500">Interview Questions</span>
                </h1>

                <p class="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                    Practice with interactive flashcards covering essential JavaScript concepts.
                    Reveal answers when ready and track your progress.
                </p>

                <div class="flex flex-wrap justify-center gap-4">
                    <UButton :to="localePath('/javascript/how-do-you-detect-primitive-or-non-primitive-value-types-in-javascript')"
                        size="xl" icon="i-heroicons-play">
                        Start Practicing
                    </UButton>
                    <UButton to="#questions" size="xl" color="neutral" variant="outline" icon="i-heroicons-queue-list">
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
                    <UCard>
                        <div class="text-center">
                            <div class="text-3xl font-bold text-primary-500">{{ stats.total }}</div>
                            <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Questions</div>
                        </div>
                    </UCard>
                    <UCard>
                        <div class="text-center">
                            <div class="text-3xl font-bold text-green-500">{{ stats.easy }}</div>
                            <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Easy</div>
                        </div>
                    </UCard>
                    <UCard>
                        <div class="text-center">
                            <div class="text-3xl font-bold text-yellow-500">{{ stats.medium }}</div>
                            <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Medium</div>
                        </div>
                    </UCard>
                    <UCard>
                        <div class="text-center">
                            <div class="text-3xl font-bold text-red-500">{{ stats.hard }}</div>
                            <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Hard</div>
                        </div>
                    </UCard>
                </div>
            </div>
        </section>

        <!-- Questions List -->
        <section id="questions" class="container mx-auto px-4 py-12">
            <div class="max-w-4xl mx-auto">
                <div class="flex items-center justify-between mb-8 flex-wrap gap-4">
                    <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
                        All Questions
                    </h2>
                    <div class="flex items-center gap-2">
                        <UButton
                            :icon="showOnlyFavorites ? 'i-heroicons-heart-solid' : 'i-heroicons-heart'"
                            :color="showOnlyFavorites ? 'error' : 'neutral'"
                            :variant="showOnlyFavorites ? 'solid' : 'outline'"
                            size="sm"
                            @click="showOnlyFavorites = !showOnlyFavorites"
                        >
                            Favorites {{ getFavoriteCount > 0 ? `(${getFavoriteCount})` : '' }}
                        </UButton>
                    </div>
                </div>

                <div v-if="filteredQuestions && filteredQuestions.length > 0" class="space-y-3">
                    <NuxtLink v-for="question in filteredQuestions" :key="question.id"
                        :to="localePath(`/${question.meta.category}/${question.meta.slug}`)" class="block group">
                        <UCard class="hover:shadow-lg transition-all duration-200 hover:scale-[1.01]">
                            <div class="flex items-start gap-4">


                                <div class="flex-1 min-w-0">
                                    <h3
                                        class="font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors mb-2">
                                        {{ question.title }}
                                    </h3>

                                    <div class="flex items-center gap-2 flex-wrap">
                                        <UBadge :color="difficultyColors[question.meta.difficulty || 'easy']"
                                            variant="subtle" size="xs">
                                            {{ question.meta.difficulty || 'easy' }}
                                        </UBadge>
                                        <UBadge v-for="tag in question.meta.tags?.slice(0, 3)" :key="tag"
                                            color="neutral" variant="subtle" size="xs">
                                            {{ tag }}
                                        </UBadge>
                                    </div>
                                </div>

                                <UIcon name="i-heroicons-chevron-right"
                                    class="text-gray-400 group-hover:text-primary-500 transition-colors shrink-0" />
                            </div>
                        </UCard>
                    </NuxtLink>
                </div>

                <div v-else-if="!questions" class="text-center py-12">
                    <p class="text-gray-600 dark:text-gray-400">Loading questions...</p>
                </div>

                <div v-else class="text-center py-12">
                    <UIcon name="i-heroicons-heart" class="text-6xl text-gray-300 dark:text-gray-700 mb-4" />
                    <p class="text-gray-600 dark:text-gray-400">No favorite questions yet.</p>
                    <p class="text-sm text-gray-500 dark:text-gray-500 mt-2">Click the heart icon on questions to add them to favorites.</p>
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