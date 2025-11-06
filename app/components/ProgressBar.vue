<script setup lang="ts">
interface Props {
  totalQuestions: number
}

const props = defineProps<Props>()

const { getStats, getProgressPercentage, getMasteryPercentage } = useQuestionProgress()

const stats = computed(() => getStats())
const progressPercentage = computed(() => getProgressPercentage(props.totalQuestions))
const masteryPercentage = computed(() => getMasteryPercentage(props.totalQuestions))

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
    </div>
  </UCard>
</template>
