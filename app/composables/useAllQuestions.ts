import type { Question } from '~/types'

/**
 * Composable to fetch all questions with i18n support
 * Shared across components to avoid useAsyncData key conflicts
 */
export const useAllQuestions = () => {
  const { locale } = useI18n()

  const { data: questions, refresh, status, error } = useAsyncData(
    `all-questions-${locale.value}`,
    async () => {
      // Use the correct collection based on locale
      const collectionName = locale.value === 'fr' ? 'content_fr' : 'content_en'
      const allContent = await queryCollection(collectionName).all()
      return allContent.sort(
        (a, b) => (Number(a.id) || 0) - (Number(b.id) || 0)
      ) as unknown as Question[]
    },
    {
      watch: [locale], // Refetch when locale changes
    }
  )

  return {
    questions,
    refresh,
    status,
    error,
  }
}
