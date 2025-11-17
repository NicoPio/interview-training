<script setup lang="ts">
import type { Question } from '~/types'
import { whenever } from '@vueuse/core'

definePageMeta({
  layout: 'interview',
})

const route = useRoute()
const category = route.params.category as string
const slug = route.params.slug as string

// Get current locale from i18n
const { locale } = useI18n()
const localePath = useLocalePath()

// Composables for tracking
const { markAsSeen } = useQuestionProgress()

// Fetch the current question with i18n support
const { data: question } = await useAsyncData(
  `question-${slug}-${locale.value}`,
  async () => {
    // Use the correct collection based on locale
    const collectionName = locale.value === 'fr' ? 'content_fr' : 'content_en'
    const allContent = await queryCollection(collectionName).all()
    const result = allContent.find((item) => {
      const q = item as unknown as Question
      return q.meta.slug === slug && q.meta.category === category
    })
    return result as unknown as Question
  },
  {
    watch: [locale], // Refetch when locale changes
  }
)

// Handle 404
if (!question.value) {
  throw createError({
    statusCode: 404,
    message: 'Question not found',
    fatal: true,
  })
}

// Mark as seen when question is viewed
onMounted(() => {
  if (question.value) {
    markAsSeen(String(question.value.id))
  }
})

// Keyboard navigation (Arrow Left/Right)
const router = useRouter()
const { keys } = useKeyboardShortcuts()
const { arrowLeft, arrowRight } = keys

// Navigate to previous question
if (arrowLeft) {
  whenever(arrowLeft, () => {
    if (previousQuestion.value) {
      router.push(
        localePath(`/${previousQuestion.value.meta.category}/${previousQuestion.value.meta.slug}`)
      )
    }
  })
}

// Navigate to next question
if (arrowRight) {
  whenever(arrowRight, () => {
    if (nextQuestion.value) {
      router.push(
        localePath(`/${nextQuestion.value.meta.category}/${nextQuestion.value.meta.slug}`)
      )
    }
  })
}

// Fetch all questions for navigation
const { data: allQuestions } = await useAsyncData(
  `all-questions-${locale.value}`,
  async () => {
    const collectionName = locale.value === 'fr' ? 'content_fr' : 'content_en'
    const allContent = await queryCollection(collectionName).all()
    return allContent.sort(
      (a, b) => (Number(a.id) || 0) - (Number(b.id) || 0)
    ) as unknown as Question[]
  },
  {
    watch: [locale],
  }
)

// Find current question index and prev/next
const currentIndex = computed(() => {
  if (!allQuestions.value || !question.value?.id) return -1
  return allQuestions.value.findIndex((q) => q.id === question.value?.id)
})

const previousQuestion = computed(() => {
  if (!allQuestions.value || currentIndex.value <= 0) return null
  return allQuestions.value[currentIndex.value - 1]
})

const nextQuestion = computed(() => {
  if (
    !allQuestions.value ||
    currentIndex.value === -1 ||
    currentIndex.value >= allQuestions.value.length - 1
  )
    return null
  return allQuestions.value[currentIndex.value + 1]
})

// SEO Meta tags
const siteUrl = 'https://nicopio.github.io/interview-training'
const canonicalUrl = computed(() => {
  const langPrefix = locale.value === 'fr' ? '' : '/en'
  return `${siteUrl}${langPrefix}/${category}/${slug}`
})

useSeoMeta({
  title: question.value.title,
  description: `${question.value.title} - JavaScript Interview Question #${question.value.id}`,
  ogTitle: question.value.title,
  ogDescription: `Prepare for your JavaScript interview with this ${question.value.meta.difficulty} level question.`,
  ogUrl: canonicalUrl.value,
  ogType: 'article',
  ogImage: `${siteUrl}/og-image.svg`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  twitterCard: 'summary_large_image',
  twitterTitle: question.value.title,
  twitterDescription: `${question.value.meta.difficulty} level JavaScript interview question #${question.value.id}`,
  twitterImage: `${siteUrl}/og-image.svg`,
})

// Breadcrumb structured data + canonical
useHead({
  link: [
    {
      rel: 'canonical',
      href: canonicalUrl.value,
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: {
          '@type': 'Question',
          name: question.value.title,
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'JavaScript interview question and detailed answer',
          },
        },
      }),
    },
  ],
})
</script>

<template>
  <div v-if="question" class="max-w-4xl mx-auto">
    <!-- Breadcrumb -->
    <nav class="mb-6">
      <ol class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <li>
          <NuxtLink :to="localePath('/')" class="hover:text-primary-500 transition-colors">
            Home
          </NuxtLink>
        </li>
        <li>
          <UIcon name="i-heroicons-chevron-right" class="text-xs" />
        </li>
        <li>
          <NuxtLink
            :to="localePath(`/${category}`)"
            class="hover:text-primary-500 transition-colors capitalize"
          >
            {{ category }}
          </NuxtLink>
        </li>
        <li>
          <UIcon name="i-heroicons-chevron-right" class="text-xs" />
        </li>
        <li class="text-gray-900 dark:text-white font-medium truncate">
          Question #{{ question.id }}
        </li>
      </ol>
    </nav>

    <!-- Question Card -->
    <QuestionCard
      :id="Number(question.id)"
      :title="question.title ?? question.meta.title"
      :difficulty="question.meta.difficulty"
      :category="question.meta.category"
      :slug="question.meta.slug"
    >
      <template #question>
        <!-- Question is already in the title, so we show a brief intro or nothing -->
        <p class="text-gray-600 dark:text-gray-400">
          Cliquez sur "Voir la réponse" ci-dessous pour afficher la réponse détaillée.
        </p>
      </template>

      <template #answer>
        <!-- Full content with answer -->
        <ContentRenderer :value="question" />
      </template>
    </QuestionCard>

    <!-- Navigation Between Questions -->
    <div class="mt-6 flex items-center justify-between gap-4">
      <UButton
        v-if="previousQuestion"
        :to="localePath(`/${previousQuestion.meta.category}/${previousQuestion.meta.slug}`)"
        color="neutral"
        variant="outline"
      >
        <UIcon name="i-heroicons-arrow-left" />
        Previous
      </UButton>
      <UButton v-else color="neutral" variant="outline" disabled>
        <UIcon name="i-heroicons-arrow-left" />
        Previous
      </UButton>

      <UButton :to="localePath('/')" color="neutral" variant="ghost" size="sm">
        <UIcon name="i-heroicons-squares-2x2" />
        All Questions
      </UButton>

      <UButton
        v-if="nextQuestion"
        :to="localePath(`/${nextQuestion.meta.category}/${nextQuestion.meta.slug}`)"
        color="neutral"
        variant="outline"
      >
        Next
        <UIcon name="i-heroicons-arrow-right" />
      </UButton>
      <UButton v-else color="neutral" variant="outline" disabled>
        Next
        <UIcon name="i-heroicons-arrow-right" />
      </UButton>
    </div>

    <!-- Tags Section -->
    <div v-if="question.meta.tags && question.meta.tags.length" class="mt-6">
      <UCard>
        <div class="flex items-center gap-2 flex-wrap">
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Tags:</span>
          <UBadge
            v-for="tag in question.meta.tags"
            :key="tag"
            color="neutral"
            variant="subtle"
            size="sm"
          >
            {{ tag }}
          </UBadge>
        </div>
      </UCard>
    </div>
  </div>
</template>
