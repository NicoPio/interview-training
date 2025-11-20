<script setup lang="ts">
import type { Question } from '~/types'

interface Props {
  questions: Question[]
  showArrows?: boolean
  showDots?: boolean
  loop?: boolean
}

withDefaults(defineProps<Props>(), {
  showArrows: true,
  showDots: true,
  loop: false,
})

const localePath = useLocalePath()
const { t } = useI18n()
</script>

<template>
  <div class="w-full">
    <UCarousel
      v-slot="{ item }"
      :items="questions"
      :arrows="showArrows"
      :dots="showDots"
      :loop="loop"
      :ui="{
        item: 'basis-full md:basis-1/2 lg:basis-1/3 px-2',
        container: 'gap-4',
        controls: 'mt-6',
        dots: 'gap-2 mt-4',
        dot: 'w-8 h-2 rounded-full',
      }"
      class="w-full"
      data-testid="question-carousel"
    >
      <QuestionCard
        :id="Number(item.id)"
        :title="item.title ?? item.meta.title"
        :difficulty="item.meta.difficulty"
        :category="item.meta.category"
        :slug="item.meta.slug"
        :compact="true"
      >
        <template #question>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ t('carousel.clickToReveal') }}
          </p>
        </template>

        <template #answer>
          <div class="prose prose-sm dark:prose-invert max-w-none">
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{ t('carousel.answerPreview') }}
            </p>
            <NuxtLink
              :to="localePath(`/${item.meta.category}/${item.meta.slug}`)"
              class="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
            >
              {{ t('carousel.viewFullQuestion') }}
              <UIcon name="i-heroicons-arrow-right" />
            </NuxtLink>
          </div>
        </template>
      </QuestionCard>
    </UCarousel>
  </div>
</template>
