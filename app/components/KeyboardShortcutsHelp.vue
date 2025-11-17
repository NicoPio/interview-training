<script setup lang="ts">
const { showHelp } = useKeyboardShortcuts()

const shortcuts = [
  {
    category: 'Navigation',
    items: [
      { keys: ['H'], description: 'Aller à l\'accueil' },
      { keys: ['←'], description: 'Question précédente' },
      { keys: ['→'], description: 'Question suivante' },
      { keys: ['/'], description: 'Focus sur la recherche' },
    ]
  },
  {
    category: 'Actions',
    items: [
      { keys: ['Space'], description: 'Révéler/Cacher la réponse' },
      { keys: ['?'], description: 'Afficher cette aide' },
      { keys: ['Esc'], description: 'Fermer les modales' },
    ]
  }
]
</script>

<template>
  <UModal v-model:open="showHelp">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">
            Raccourcis clavier
          </h2>
          <UButton
            icon="i-heroicons-x-mark"
            color="neutral"
            variant="ghost"
            size="sm"
            @click="showHelp = false"
          />
        </div>
      </template>

      <div class="space-y-6">
        <div v-for="section in shortcuts" :key="section.category">
          <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            {{ section.category }}
          </h3>
          <div class="space-y-2">
            <div
              v-for="shortcut in section.items"
              :key="shortcut.description"
              class="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <span class="text-sm text-gray-600 dark:text-gray-400">
                {{ shortcut.description }}
              </span>
              <div class="flex items-center gap-1">
                <UKbd v-for="key in shortcut.keys" :key="key">
                  {{ key }}
                </UKbd>
              </div>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Les raccourcis sont désactivés dans les champs de saisie</span>
          <UButton
            color="primary"
            size="sm"
            @click="showHelp = false"
          >
            Fermer
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>
