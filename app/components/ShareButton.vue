<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import type { DropdownMenuItem } from '#ui/types'

interface Props {
  url: string
  title: string
}

const props = defineProps<Props>()

const { copy, copied } = useClipboard({ source: props.url })

const handleCopyLink = () => {
  copy(props.url)
}

const handleShareTwitter = () => {
  const text = encodeURIComponent(`${props.title} - JS Interview Prep`)
  const url = encodeURIComponent(props.url)
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'width=550,height=420')
}

const handleShareLinkedIn = () => {
  const url = encodeURIComponent(props.url)
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=550,height=420')
}

const shareOptions = computed<DropdownMenuItem[][]>(() => [[
  {
    label: 'Copier le lien',
    icon: 'i-heroicons-link',
    onSelect: handleCopyLink
  },
  {
    label: 'Twitter',
    icon: 'i-heroicons-at-symbol',
    onSelect: handleShareTwitter
  },
  {
    label: 'LinkedIn',
    icon: 'i-heroicons-briefcase',
    onSelect: handleShareLinkedIn
  }
]])
</script>

<template>
  <UDropdownMenu :items="shareOptions" :content="{ align: 'end' }">
    <UButton
      :icon="copied ? 'i-heroicons-check' : 'i-heroicons-share'"
      :color="copied ? 'success' : 'neutral'"
      variant="ghost"
      size="sm"
    >
      {{ copied ? 'Copié !' : 'Partager' }}
    </UButton>
  </UDropdownMenu>
</template>
