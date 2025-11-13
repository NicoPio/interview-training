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
    >
      <template #trailing>
        <div class="flex items-center gap-2">
          <UBadge v-if="resultCount !== undefined && modelValue" color="neutral" variant="subtle">
            {{ resultCount }}
          </UBadge>
          <UButton
            v-if="localValue"
            icon="i-heroicons-x-mark"
            color="neutral"
            variant="ghost"
            size="xs"
            @click="clearSearch"
          />
          <UKbd v-else>/</UKbd>
        </div>
      </template>
    </UInput>
  </div>
</template>
