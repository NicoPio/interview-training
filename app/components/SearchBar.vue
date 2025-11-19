<script setup lang="ts">
import { useDebounceFn, useMagicKeys } from '@vueuse/core'

interface Props {
  modelValue: string
  placeholder?: string
  resultCount?: number
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Rechercher une question...',
  resultCount: 0,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

// i18n is available for future translations if needed
// const { t } = useI18n()

const localValue = ref(props.modelValue)

const debouncedUpdate = useDebounceFn((value: string) => {
  emit('update:modelValue', value)
}, 300)

watch(localValue, (newValue) => {
  debouncedUpdate(newValue)
})

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== localValue.value) {
      localValue.value = newValue
    }
  }
)

const inputRef = ref<HTMLInputElement>()

const { slash } = useMagicKeys()

if (slash) {
  watch(slash, (pressed) => {
    if (pressed && inputRef.value) {
      inputRef.value.focus()
    }
  })
}

const clearSearch = () => {
  localValue.value = ''
  emit('update:modelValue', '')
}
</script>

<template>
  <div class="relative w-full">
    <UInput
      ref="inputRef"
      v-model="localValue"
      :placeholder="placeholder"
      icon="i-heroicons-magnifying-glass"
      size="lg"
      aria-label="Rechercher des questions dans la liste"
      :aria-describedby="modelValue && resultCount !== undefined ? 'search-results-count' : undefined"
      type="search"
      role="searchbox"
    >
      <template #trailing>
        <div class="flex items-center gap-2">
          <UBadge
            v-if="resultCount !== undefined && modelValue"
            id="search-results-count"
            color="neutral"
            variant="subtle"
            :aria-label="`${resultCount} résultat${resultCount > 1 ? 's' : ''} trouvé${resultCount > 1 ? 's' : ''}`"
          >
            {{ resultCount }}
          </UBadge>
          <UButton
            v-if="localValue"
            icon="i-heroicons-x-mark"
            color="neutral"
            variant="ghost"
            size="xs"
            aria-label="Effacer la recherche"
            @click="clearSearch"
          />
          <UKbd v-else aria-hidden="true">/</UKbd>
        </div>
      </template>
    </UInput>
    <!-- Screen reader announcement for results -->
    <span
      v-if="modelValue && resultCount !== undefined"
      class="sr-only"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {{ resultCount }} résultat{{ resultCount > 1 ? 's' : '' }} trouvé{{ resultCount > 1 ? 's' : '' }} pour "{{ modelValue }}"
    </span>
  </div>
</template>
