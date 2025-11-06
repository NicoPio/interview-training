<script setup lang="ts">
interface Props {
  totalQuestions: number
}

const props = defineProps<Props>()

const { getStats, getProgressPercentage, getMasteryPercentage } = useQuestionProgress()
const { getGlobalStats } = useAnswerRevealState()

const stats = computed(() => getStats())
const progressPercentage = computed(() => getProgressPercentage(props.totalQuestions))
const masteryPercentage = computed(() => getMasteryPercentage(props.totalQuestions))
const revealStats = computed(() => getGlobalStats())

const notSeenCount = computed(() => props.totalQuestions - stats.value.total)
</script>

<template>
  <UCard>
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          Your Progress
        </h3>
        <UBadge color="primary" variant="subtle">
          {{ progressPercentage }}% Complete
        </UBadge>
      </div>

      <!-- Progress Bar -->
      <div class="space-y-2">
        <div class="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Overall Progress</span>
          <span>{{ stats.seen + stats.mastered }} / {{ totalQuestions }}</span>
        </div>
        <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
            :style="{ width: `${progressPercentage}%` }"
          />
        </div>
      </div>

      <!-- Mastery Bar -->
      <div class="space-y-2">
        <div class="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Mastered</span>
          <span>{{ stats.mastered }} / {{ totalQuestions }}</span>
        </div>
        <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500"
            :style="{ width: `${masteryPercentage}%` }"
          />
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-3 gap-2 pt-2">
        <div class="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div class="text-2xl font-bold text-gray-400 dark:text-gray-500">
            {{ notSeenCount }}
          </div>
          <div class="text-xs text-gray-600 dark:text-gray-400">Not Seen</div>
        </div>
        <div class="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {{ stats.seen }}
          </div>
          <div class="text-xs text-gray-600 dark:text-gray-400">Seen</div>
        </div>
        <div class="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div class="text-2xl font-bold text-green-600 dark:text-green-400">
            {{ stats.mastered }}
          </div>
          <div class="text-xs text-gray-600 dark:text-gray-400">Mastered</div>
        </div>
      </div>

      <!-- Reveal Statistics -->
      <div v-if="revealStats.totalReveals > 0" class="border-t pt-4">
        <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Statistiques de révélation
        </h4>
        <div class="grid grid-cols-3 gap-2">
          <div class="text-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div class="text-xl font-bold text-purple-600 dark:text-purple-400">
              {{ revealStats.totalReveals }}
            </div>
            <div class="text-xs text-gray-600 dark:text-gray-400">Total Révélations</div>
          </div>
          <div class="text-center p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <div class="text-xl font-bold text-orange-600 dark:text-orange-400">
              {{ revealStats.questionsRevealed }}
            </div>
            <div class="text-xs text-gray-600 dark:text-gray-400">Questions Vues</div>
          </div>
          <div class="text-center p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
            <div class="text-xl font-bold text-indigo-600 dark:text-indigo-400">
              {{ revealStats.avgTimeToReveal }}s
            </div>
            <div class="text-xs text-gray-600 dark:text-gray-400">Temps Moyen</div>
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>
