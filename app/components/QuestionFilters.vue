<script setup lang="ts">
import type { DifficultyLevel, Category } from '~/types'

interface Props {
  availableCategories: { category: Category; count: number }[]
}

const props = defineProps<Props>()

const { t } = useI18n()

const {
  selectedDifficulties,
  selectedCategories,
  showOnlyFavorites,
  resetFilters,
  getActiveFiltersCount,
  toggleCategoryFilter,
} = useQuestionFilters()

const difficultyOptions = computed(() => [
  { value: 'easy', label: t('filters.difficulty.easy') },
  { value: 'medium', label: t('filters.difficulty.medium') },
  { value: 'hard', label: t('filters.difficulty.hard') },
])

const categoryOptions = computed(() => {
  return props.availableCategories.map(({ category, count }) => ({
    value: category,
    label: t(`filters.category.${category}`),
    count,
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

const toggleCategory = (value: Category) => {
  toggleCategoryFilter(value)
}

const isCategorySelected = (value: Category) => {
  return selectedCategories.value.includes(value)
}
</script>

<template>
  <div class="space-y-6 gap-2">
    <UFormField :label="t('filters.difficulty.label')">
      <div class="flex flex-wrap gap-6">
        <UCheckbox
          v-for="option in difficultyOptions"
          :id="`difficulty-${option.value}`"
          :key="option.value"
          :model-value="isDifficultySelected(option.value as DifficultyLevel)"
          :label="option.label"
          @update:model-value="toggleDifficulty(option.value as DifficultyLevel)"
        />
      </div>
    </UFormField>

    <UFormField :label="t('filters.category.label')">
      <div class="flex flex-wrap gap-6">
        <UCheckbox
          v-for="option in categoryOptions"
          :id="`category-${option.value}`"
          :key="option.value"
          :model-value="isCategorySelected(option.value as Category)"
          @update:model-value="toggleCategory(option.value as Category)"
        >
          <template #label>
            <span class="flex items-center gap-1">
              {{ option.label }}
              <UBadge size="xs" color="neutral" variant="subtle">{{ option.count }}</UBadge>
            </span>
          </template>
        </UCheckbox>
      </div>
    </UFormField>


    <div class="mt-4">
      <UCheckbox id="show-favorites" v-model="showOnlyFavorites" :label="t('filters.favorites')" />
    </div>

    <div
      class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800"
    >
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
