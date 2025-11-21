<script setup lang="ts">
import type { Question } from '~/types'

interface Props {
  category: string
  questions: Question[]
  max?: number
}

const props = withDefaults(defineProps<Props>(), {
  max: 10,
})

const localePath = useLocalePath()

const limitedQuestions = computed(() => props.questions.slice(0, props.max))

const categoryLabels: Record<string, string> = {
  javascript: 'JavaScript',
  html: 'HTML',
  css: 'CSS',
  vuejs: 'Vue.js',
  reactjs: 'React.js',
}

const categoryIcons: Record<string, string> = {
  javascript: 'i-heroicons-code-bracket',
  html: 'i-heroicons-code-bracket-square',
  css: 'i-heroicons-paint-brush',
  vuejs: 'i-heroicons-cube',
  reactjs: 'i-heroicons-cube-transparent',
}
</script>

<template>
  <section class="mb-12">
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-3">
        <UIcon :name="categoryIcons[category] || 'i-heroicons-code-bracket'" class="text-3xl text-primary-500" />
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
          {{ categoryLabels[category] }}
        </h2>
        <UBadge color="neutral" variant="subtle">
          {{ questions.length }} question{{ questions.length > 1 ? 's' : '' }}
        </UBadge>
      </div>

      <NuxtLink
        :to="localePath(`/${category}`)"
        class="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 font-medium flex items-center gap-2 transition-colors"
      >
        Voir tout
        <UIcon name="i-heroicons-arrow-right" />
      </NuxtLink>
    </div>

    <UCarousel
      v-if="limitedQuestions.length > 0"
      v-slot="{ item }"
      :items="limitedQuestions"
      :arrows="true"
      :dots="false"
      :loop="false"
      :ui="{
        item: 'basis-full md:basis-1/2 lg:basis-1/3 px-2',
        container: 'gap-4 items-stretch',
      }"
      class="w-full"
    >
      <QuestionCardLink
        :id="Number(item.id)"
        :title="item.title ?? item.meta.title"
        :difficulty="item.meta.difficulty || 'easy'"
        :category="item.meta.category || category"
        :slug="item.meta.slug || ''"
      />
    </UCarousel>

    <div v-else class="text-center py-8 text-gray-500 dark:text-gray-400">
      Aucune question disponible pour cette catégorie
    </div>
  </section>
</template>
