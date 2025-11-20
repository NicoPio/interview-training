<script setup lang="ts">
interface Props {
  id: number
  title: string
  difficulty?: 'easy' | 'medium' | 'hard'
  category: string
  slug: string
}

defineProps<Props>()
const localePath = useLocalePath()
</script>

<template>
  <NuxtLink :to="localePath(`/${category}/${slug}`)" class="block h-full">
    <QuestionCard
      :id="id"
      :title="title"
      :difficulty="difficulty"
      :category="category"
      :slug="slug"
      :compact="true"
      :clickable="false"
    >
      <template #question>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Cliquez pour voir la question complète
        </p>
      </template>
      <template #answer>
        <div />
      </template>
    </QuestionCard>
  </NuxtLink>
</template>
