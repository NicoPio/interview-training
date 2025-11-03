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

definePageMeta({
  layout: 'interview'
})

const route = useRoute()
const category = route.params.category as string
const slug = route.params.slug as string

// Fetch the current question
const { data: question } = await useAsyncData(`question-${slug}`, async () => {
  const allContent = await queryCollection('content').all()
  const result = allContent.find((item) => {
    const q = item as unknown as Question
    return q.meta.slug === slug && q.meta.category === category
  })
  return result as unknown as Question
})

// Handle 404
if (!question.value) {
  throw createError({
    statusCode: 404,
    message: 'Question not found',
    fatal: true
  })
}

// SEO Meta tags
useSeoMeta({
  title: question.value.title,
  description: `${question.value.title} - JavaScript Interview Question #${question.value.id}`,
  ogTitle: question.value.title,
  ogDescription: `Prepare for your JavaScript interview with this ${question.value.meta.difficulty} level question.`,
  ogImage: '/og-image.png',
  twitterCard: 'summary_large_image'
})

// Breadcrumb structured data
useHead({
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
            text: 'JavaScript interview question and detailed answer'
          }
        }
      })
    }
  ]
})
</script>

<template>
  <div v-if="question" class="max-w-4xl mx-auto">
    <!-- Breadcrumb -->
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
        <li>
          <NuxtLink :to="`/${category}`" class="hover:text-primary-500 transition-colors capitalize">
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
    <QuestionCard :title="question.title" :id="Number(question.id)" :difficulty="question.meta.difficulty"
      :category="question.meta.category" :slug="question.meta.slug">
      <template #question>
        <ContentRenderer :value="question" :excerpt="false">
          <template #default="{ data }">
            <ContentRendererMarkdown :value="data" />
          </template>
        </ContentRenderer>
      </template>

      <template #answer>
        <ContentRenderer :value="question" :excerpt="false">
          <template #default="{ data }">
            <ContentRendererMarkdown :value="data" />
          </template>
        </ContentRenderer>
      </template>
    </QuestionCard>

    <!-- Navigation Between Questions -->
    <div class="mt-6 flex items-center justify-between gap-4">
      <UButton color="neutral" variant="outline" disabled>
        <UIcon name="i-heroicons-arrow-left" />
        Previous
      </UButton>

      <UButton to="/" color="neutral" variant="ghost" size="sm">
        <UIcon name="i-heroicons-squares-2x2" />
        All Questions
      </UButton>

      <UButton color="neutral" variant="outline" disabled>
        Next
        <UIcon name="i-heroicons-arrow-right" />
      </UButton>
    </div>

    <!-- Tags Section -->
    <div v-if="question.meta.tags && question.meta.tags.length" class="mt-6">
      <UCard>
        <div class="flex items-center gap-2 flex-wrap">
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Tags:</span>
          <UBadge v-for="tag in question.meta.tags" :key="tag" color="neutral" variant="subtle" size="sm">
            {{ tag }}
          </UBadge>
        </div>
      </UCard>
    </div>
  </div>
</template>
