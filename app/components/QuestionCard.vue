<script setup lang="ts">
import { useMagicKeys, whenever } from '@vueuse/core'

interface Props {
  title: string
  id: number
  difficulty?: 'easy' | 'medium' | 'hard'
  category: string
  slug: string
}

const props = defineProps<Props>()
const localePath = useLocalePath()

// Composables
const { isFavorite, toggleFavorite } = useFavorites()
const { getProgress, markAsMastered, markAsNotMastered } = useQuestionProgress()
const { getRevealState, markRevealed, markHidden } = useAnswerRevealState()
const { mode } = useQuizMode()

// Question ID as string for storage
const questionId = computed(() => String(props.id))

// Tracking for time to reveal
const pageLoadTime = ref(Date.now())

// Answer reveal state - initialize from localStorage
const revealState = computed(() => getRevealState(questionId.value))
const showAnswer = ref(revealState.value.revealed)

// Quiz mode timer
const quizTimer = ref<number | null>(null)
const quizTimerDuration = 30 // seconds
const isQuizMode = computed(() => mode.value === 'quiz')

// Refs for scroll
const answerSection = ref<HTMLElement | null>(null)

// Favorite state
const favorited = computed(() => isFavorite(questionId.value))

// Progress state
const progress = computed(() => getProgress(questionId.value))
const isMastered = computed(() => progress.value.status === 'mastered')

// Keyboard shortcuts
const { space } = useMagicKeys()

// Handle keyboard shortcuts
if (space) {
  whenever(space, () => {
    if (import.meta.client && !isQuizMode.value) {
      toggleAnswer()
    }
  })
}

// Quiz mode timer logic
const startQuizTimer = () => {
  if (isQuizMode.value && !showAnswer.value) {
    quizTimer.value = quizTimerDuration
    const interval = setInterval(() => {
      if (quizTimer.value !== null && quizTimer.value > 0) {
        quizTimer.value--
      } else {
        clearInterval(interval)
        if (!showAnswer.value) {
          // Auto-reveal after timer
          toggleAnswer()
        }
      }
    }, 1000)
  }
}

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

const toggleAnswer = () => {
  showAnswer.value = !showAnswer.value

  if (showAnswer.value) {
    // Calculate time to reveal
    const timeToReveal = Date.now() - pageLoadTime.value
    markRevealed(questionId.value, timeToReveal)

    // Scroll to answer after animation
    nextTick(() => {
      setTimeout(() => {
        if (answerSection.value) {
          answerSection.value.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
        }
      }, 100) // Wait for transition
    })
  } else {
    markHidden(questionId.value)
  }
}

// Start quiz timer on mount if in quiz mode
onMounted(() => {
  startQuizTimer()
})

// Difficulty colors
const difficultyColors: Record<string, 'success' | 'warning' | 'error'> = {
  easy: 'success',
  medium: 'warning',
  hard: 'error',
}

// Share URL
const shareUrl = computed(() => {
  if (import.meta.client) {
    return `${window.location.origin}${localePath(`/${props.category}/${props.slug}`)}`
  }
  return ''
})
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
            <UBadge color="neutral" variant="outline" size="xs"> #{{ props.id }} </UBadge>
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
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Question</h3>
        <slot name="question" />
      </div>

      <!-- Quiz Timer (if in quiz mode) -->
      <div
        v-if="isQuizMode && quizTimer !== null && !showAnswer"
        class="flex justify-center"
        role="timer"
        aria-live="polite"
        :aria-label="`Auto-révélation dans ${quizTimer} secondes`"
      >
        <UBadge color="warning" size="lg" class="px-4 py-2">
          <UIcon name="i-heroicons-clock" class="mr-2" aria-hidden="true" />
          Auto-reveal dans {{ quizTimer }}s
        </UBadge>
      </div>

      <!-- Reveal Answer Button -->
      <div class="flex flex-col items-center gap-2 pt-4">
        <UButton
          :icon="showAnswer ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
          :color="showAnswer ? 'neutral' : 'primary'"
          :disabled="isQuizMode && quizTimer !== null && quizTimer > 0"
          size="lg"
          :aria-expanded="showAnswer"
          aria-controls="answer-content"
          :aria-label="showAnswer ? 'Masquer la réponse de la question' : 'Révéler la réponse de la question'"
          @click="toggleAnswer"
        >
          {{ showAnswer ? 'Masquer la réponse' : 'Voir la réponse' }}
        </UButton>

        <!-- Keyboard shortcut hint -->
        <p v-if="!isQuizMode" class="text-xs text-gray-500 dark:text-gray-400">
          Raccourci:
          <kbd
            class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700"
            aria-hidden="true"
          >Espace</kbd
          >
        </p>

        <!-- Reveal statistics -->
        <p v-if="revealState.revealCount > 0" class="text-xs text-gray-500 dark:text-gray-400">
          Révélé {{ revealState.revealCount }} fois
          <span v-if="revealState.timeToReveal">
            ({{ Math.round(revealState.timeToReveal / 1000) }}s avant première révélation)
          </span>
        </p>
      </div>

      <!-- Answer Section (Collapsible) -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 transform -translate-y-4"
        enter-to-class="opacity-100 transform translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 transform translate-y-0"
        leave-to-class="opacity-0 transform -translate-y-4"
      >
        <div
          v-if="showAnswer"
          id="answer-content"
          ref="answerSection"
          role="region"
          aria-labelledby="answer-heading"
          aria-live="polite"
          class="prose prose-gray dark:prose-invert max-w-none border-t pt-6"
        >
          <h3 id="answer-heading" class="text-lg font-semibold text-green-600 dark:text-green-400 mb-4">
            Réponse
          </h3>
          <slot name="answer" />
        </div>
      </Transition>
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
            :aria-pressed="favorited"
            :aria-label="favorited ? 'Retirer des favoris' : 'Ajouter aux favoris'"
            @click="handleFavoriteClick"
          >
            {{ favorited ? 'Favorited' : 'Favorite' }}
          </UButton>
          <UButton
            :icon="isMastered ? 'i-heroicons-check-circle-solid' : 'i-heroicons-check-circle'"
            :color="isMastered ? 'success' : 'neutral'"
            variant="ghost"
            size="sm"
            :aria-pressed="isMastered"
            :aria-label="isMastered ? 'Marquer comme non maîtrisé' : 'Marquer comme maîtrisé'"
            @click="handleMasteredToggle"
          >
            {{ isMastered ? 'Mastered' : 'Mark as Mastered' }}
          </UButton>
          <ShareButton v-if="shareUrl" :url="shareUrl" :title="title" />
        </div>
        <div class="text-xs text-gray-500">
          <NuxtLink
            :to="localePath(`/${category}/${slug}`)"
            class="hover:text-primary-500 transition-colors"
          >
            Permalink
          </NuxtLink>
        </div>
      </div>
    </template>
  </UCard>
</template>
