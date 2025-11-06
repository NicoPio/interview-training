<script setup lang="ts">
interface Props {
  title: string
  id: number
  difficulty?: 'easy' | 'medium' | 'hard'
  category: string
  slug: string
}

const props = defineProps<Props>()

// Composables
const { isFavorite, toggleFavorite } = useFavorites()
const { getProgress, markAsMastered, markAsNotMastered } = useQuestionProgress()

// Question ID as string for storage
const questionId = computed(() => String(props.id))

// Favorite state
const favorited = computed(() => isFavorite(questionId.value))

// Progress state
const progress = computed(() => getProgress(questionId.value))
const isMastered = computed(() => progress.value.status === 'mastered')

// Handlers
const handleFavoriteClick = () => {
  toggleFavorite(questionId.value)
}

const handleMasteredToggle = () => {
  if (isMastered.value) {
    markAsNotMastered(questionId.value)
  } else {
    markAsMastered(questionId.value)
  }
}

// Difficulty colors
const difficultyColors: Record<string, 'success' | 'warning' | 'error'> = {
  easy: 'success',
  medium: 'warning',
  hard: 'error'
}

</script>

<template>
  <UCard>
    <!-- Card Header -->
    <template #header>
      <div class="flex items-start justify-between gap-4">
        <div class="flex-1">
          <div class="flex items-center gap-2 mb-2">
            <UBadge :color="difficultyColors[difficulty || 'easy']" variant="subtle" size="xs">
              {{ props.difficulty || 'easy' }}
            </UBadge>
            <UBadge color="neutral" variant="subtle" size="xs">
              {{ props.category }}
            </UBadge>
            <UBadge color="neutral" variant="outline" size="xs">
              #{{ props.id }}
            </UBadge>
          </div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">
            {{ props.title }}
          </h2>
        </div>
      </div>
    </template>

    <!-- Card Body -->
    <div class="space-y-6">
      <!-- Question Section (Always visible) -->
      <div class="prose prose-gray dark:prose-invert max-w-none">
        <slot name="question" />
      </div>
    </div>
    <!-- Card Footer -->
    <template #footer>
      <div class="flex items-center justify-between flex-wrap gap-2">
        <div class="flex gap-2">
          <UButton
            :icon="favorited ? 'i-heroicons-heart-solid' : 'i-heroicons-heart'"
            :color="favorited ? 'error' : 'neutral'"
            variant="ghost"
            size="sm"
            @click="handleFavoriteClick"
          >
            {{ favorited ? 'Favorited' : 'Favorite' }}
          </UButton>
          <UButton
            :icon="isMastered ? 'i-heroicons-check-circle-solid' : 'i-heroicons-check-circle'"
            :color="isMastered ? 'success' : 'neutral'"
            variant="ghost"
            size="sm"
            @click="handleMasteredToggle"
          >
            {{ isMastered ? 'Mastered' : 'Mark as Mastered' }}
          </UButton>
        </div>
        <div class="text-xs text-gray-500">
          <NuxtLink :to="`/${category}/${slug}`" class="hover:text-primary-500 transition-colors">
            Permalink
          </NuxtLink>
        </div>
      </div>
    </template>
  </UCard>
</template>
