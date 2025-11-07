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

const route = useRoute()
const category = route.params.category as string

// Get current locale from i18n
const { locale } = useI18n()
const localePath = useLocalePath()

// Fetch questions for this category with i18n support
const { data: questions } = await useAsyncData(`category-${category}-${locale.value}`, async () => {
    // Use the correct collection based on locale
    const collectionName = locale.value === 'fr' ? 'content_fr' : 'content_en'
    // @ts-ignore - queryCollection type doesn't recognize our custom collection names
    const allContent = await queryCollection(collectionName).all()
    const filtered = allContent.filter((item) => {
        const q = item as unknown as Question
        return q.meta.category === category
    })
    return filtered.sort((a, b) => (Number(a.id) || 0) - (Number(b.id) || 0)) as unknown as Question[]
}, {
    watch: [locale] // Refetch when locale changes
})

// Handle 404 if category has no questions
if (!questions.value || questions.value.length === 0) {
    throw createError({
        statusCode: 404,
        message: `No questions found in category: ${category}`,
        fatal: true
    })
}

// Count questions by difficulty for this category
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

// SEO Meta tags
useSeoMeta({
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} Interview Questions`,
    description: `Browse ${stats.value.total} ${category} interview questions. Practice and prepare for your next technical interview.`
})
</script>

<template>
    <div class="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <!-- Breadcrumb -->
        <section class="container mx-auto px-4 py-6">
            <nav class="mb-6">
                <ol class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <li>
                        <NuxtLink to="/" class="hover:text-primary-500 transition-colors">
                            Home
                        </NuxtLink>
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
                    Browse {{ stats.total }} {{ category }} interview questions to prepare for your next technical
                    interview.
                </p>

                <!-- Stats Cards -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <UCard>
                        <div class="text-center">
                            <div class="text-2xl font-bold text-primary-500">{{ stats.total }}</div>
                            <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Total</div>
                        </div>
                    </UCard>
                    <UCard>
                        <div class="text-center">
                            <div class="text-2xl font-bold text-green-500">{{ stats.easy }}</div>
                            <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Easy</div>
                        </div>
                    </UCard>
                    <UCard>
                        <div class="text-center">
                            <div class="text-2xl font-bold text-yellow-500">{{ stats.medium }}</div>
                            <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Medium</div>
                        </div>
                    </UCard>
                    <UCard>
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
                    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                        All Questions
                    </h2>
                    <UColorModeButton />
                </div>

                <div v-if="questions" class="space-y-3">
                    <NuxtLink v-for="question in questions" :key="question.id"
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
