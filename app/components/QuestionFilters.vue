<script setup lang="ts">
import type { DifficultyLevel } from '~/types'

interface Props {
  availableTags: string[]
}

const props = defineProps<Props>()

const { t } = useI18n()

const {
  selectedDifficulties,
  selectedTags,
  selectedStatus,
  showOnlyFavorites,
  resetFilters,
  getActiveFiltersCount,
} = useQuestionFilters()

const difficultyOptions = computed(() => [
  { value: 'easy', label: t('filters.difficulty.easy') },
  { value: 'medium', label: t('filters.difficulty.medium') },
  { value: 'hard', label: t('filters.difficulty.hard') },
])

const statusOptions = computed(() => [
  { value: 'all', label: t('filters.status.all') },
  { value: 'not-seen', label: t('filters.status.notSeen') },
  { value: 'seen', label: t('filters.status.seen') },
  { value: 'mastered', label: t('filters.status.mastered') },
])

const tagOptions = computed(() => {
  return props.availableTags.map((tag) => ({
    label: tag,
    value: tag,
  }))
})

const activeCount = computed(() => getActiveFiltersCount())

const toggleDifficulty = (value: DifficultyLevel) => {
  const index = selectedDifficulties.value.indexOf(value)
  if (index > -1) {
    selectedDifficulties.value.splice(index, 1)
  } else {
    selectedDifficulties.value.push(value)
  }
}

const isDifficultySelected = (value: DifficultyLevel) => {
  return selectedDifficulties.value.includes(value)
}
</script>

<template>
  <div class="space-y-6 gap-2">
    <UFormGroup :label="t('filters.difficulty.label')">
      <div class="flex flex-wrap gap-2">
        <UCheckbox
          v-for="option in difficultyOptions"
          :key="option.value"
          :model-value="isDifficultySelected(option.value as DifficultyLevel)"
          :label="option.label"
          @update:model-value="toggleDifficulty(option.value as DifficultyLevel)"
        />
      </div>
    </UFormGroup>

    <UFormGroup :label="selectedTags.length > 0 ? `${t('filters.tags.label')} (${selectedTags.length})` : t('filters.tags.label')">
      <USelectMenu
        v-model="selectedTags"
        :options="tagOptions"
        multiple
        searchable
        :placeholder="t('filters.tags.placeholder')"
      />
    </UFormGroup>

    <UFormGroup :label="t('filters.status.label')">
      <URadioGroup v-model="selectedStatus" :options="statusOptions" />
    </UFormGroup>

    <UFormGroup>
      <UCheckbox v-model="showOnlyFavorites" :label="t('filters.favorites')" />
    </UFormGroup>

    <div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
      <UButton
        :disabled="activeCount === 0"
        variant="outline"
        color="neutral"
        @click="resetFilters"
      >
        {{ t('filters.reset') }}
      </UButton>
      <UBadge v-if="activeCount > 0" color="primary">
        {{ activeCount }} {{ t('filters.active') }}
      </UBadge>
    </div>
  </div>
</template>
