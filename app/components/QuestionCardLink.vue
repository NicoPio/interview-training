<script setup lang="ts">
interface Props {
  id: number
  title: string | undefined
  difficulty?: 'easy' | 'medium' | 'hard'
  category: string
  slug: string
}

defineProps<Props>()
const localePath = useLocalePath()
</script>

<template>
  <div class="h-full flex flex-col">
    <NuxtLink :to="localePath(`/${category}/${slug}`)" class="flex h-full">
      <QuestionCard
        :id="id"
        :title="title as string"
        :difficulty="difficulty"
        :category="category"
        :slug="slug"
        :compact="true"
        :clickable="false"
      />
    </NuxtLink>
  </div>
</template>
