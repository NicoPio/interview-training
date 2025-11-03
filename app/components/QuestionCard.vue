<script setup lang="ts">
interface Props {
  title: string
  id: number
  difficulty?: 'easy' | 'medium' | 'hard'
  category: string
  slug: string
}

const props = defineProps<Props>()


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
      <div class="flex items-center justify-between">
        <div class="flex gap-2">
          <UButton icon="i-heroicons-heart" color="neutral" variant="ghost" size="sm">
            Favorite
          </UButton>
          <UButton icon="i-heroicons-share" color="neutral" variant="ghost" size="sm">
            Share
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
