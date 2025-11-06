<script setup lang="ts">
interface Question {
  id: number
  title: string
  meta: {

    slug: string
    category: string
    difficulty?: 'easy' | 'medium' | 'hard'
  }
  _path: string
}

interface Props {
  questions: Question[]
  currentSlug?: string
}

const props = defineProps<Props>()
const route = useRoute()

// Composables
const { getProgress } = useQuestionProgress()
const { isFavorite } = useFavorites()

// Determine active question
const isActive = (question: Question) => {
  return props.currentSlug === question.meta.slug || route.params.slug === question.meta.slug
}

// Get question status
const getQuestionStatus = (question: Question) => {
  const questionId = String(question.id)
  const progress = getProgress(questionId)
  return {
    ...progress,
    isFavorite: isFavorite(questionId)
  }
}

// Status icon
const getStatusIcon = (status: string) => {
  switch (status) {
    case 'mastered':
      return 'i-heroicons-check-circle-solid'
    case 'seen':
      return 'i-heroicons-eye-solid'
    default:
      return null
  }
}

// Status color
const getStatusColor = (status: string) => {
  switch (status) {
    case 'mastered':
      return 'text-green-500'
    case 'seen':
      return 'text-blue-500'
    default:
      return 'text-gray-400'
  }
}

// Difficulty colors
const difficultyColors: Record<string, 'success' | 'warning' | 'error'> = {
  easy: 'success',
  medium: 'warning',
  hard: 'error',
}
</script>

<template>
  <div class="sticky top-4 h-[calc(100vh-2rem)] overflow-hidden flex flex-col">
    <UCard class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-bold text-gray-900 dark:text-white">
            Questions
          </h2>
          <UBadge color="primary" variant="subtle">
            {{ questions.length }}
          </UBadge>
        </div>
      </template>

      <!-- Scrollable List -->
      <div class="flex-1 overflow-y-auto -mx-4 px-4">
        <nav class="space-y-1">
          <NuxtLink v-for="question in questions" :key="question.id" :to="`/${question.meta.category}/${question.meta.slug}`"
            class="block group">
            <div :class="[
              'p-3 rounded-lg transition-all duration-200',
              isActive(question)
                ? 'bg-primary-50 dark:bg-primary-900/20 border-l-2 border-primary-500'
                : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-l-2 border-transparent'
            ]">
              <div class="flex items-start gap-2">
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-1 mb-1">
                    <p :class="[
                      'text-sm font-medium line-clamp-2 flex-1',
                      isActive(question)
                        ? 'text-primary-700 dark:text-primary-400'
                        : 'text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white'
                    ]">
                      {{ question.title }}
                    </p>
                    <UIcon
                      v-if="getQuestionStatus(question).isFavorite"
                      name="i-heroicons-heart-solid"
                      class="text-red-500 text-sm shrink-0"
                    />
                  </div>
                  <div class="flex items-center gap-1 mt-1">
                    <UBadge v-if="question.meta.difficulty" :color="difficultyColors[question.meta.difficulty]" variant="subtle"
                      size="xs">
                      {{ question.meta.difficulty }}
                    </UBadge>
                    <UIcon
                      v-if="getStatusIcon(getQuestionStatus(question).status)"
                      :name="getStatusIcon(getQuestionStatus(question).status)!"
                      :class="['text-xs', getStatusColor(getQuestionStatus(question).status)]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </NuxtLink>
        </nav>
      </div>

      <!-- Footer with Stats -->
      <template #footer>
        <div class="text-xs text-gray-500 dark:text-gray-400">
          <div class="flex items-center justify-between">
            <span>Category: JavaScript</span>
            <UButton to="/" icon="i-heroicons-home" color="neutral" variant="ghost" size="xs">
              Home
            </UButton>
          </div>
        </div>
      </template>
    </UCard>
  </div>
</template>

<style scoped>
/* Custom scrollbar for the list */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgb(209 213 219);
  border-radius: 3px;
}

.dark .overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgb(75 85 99);
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgb(156 163 175);
}

.dark .overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgb(107 114 128);
}
</style>
