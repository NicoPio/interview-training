<script setup lang="ts">
import * as locales from '#ui/locale'

const { locale, setLocale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

// Filter locales to only include English and French
const availableLocales = computed(() => {
  return [locales.en, locales.fr]
})

// Handle locale change
const handleLocaleChange = (newLocale: string | undefined) => {
  if (!newLocale) return

  const validLocale = newLocale as 'en' | 'fr'
  setLocale(validLocale)
  // Navigate to the same page but in the new locale
  navigateTo(switchLocalePath(validLocale))
}
</script>

<template>
  <ULocaleSelect
    :model-value="locale"
    :locales="availableLocales"
    size="sm"
    color="neutral"
    variant="ghost"
    aria-label="Changer la langue"
    :aria-current="locale"
    @update:model-value="handleLocaleChange"
  />
</template>
