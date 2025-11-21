import type { HomeContent } from '~/types'

export const useHomeContent = () => {
  const { locale } = useI18n()

  const collectionName = computed(() => {
    return locale.value === 'fr' ? 'home_fr' : 'home_en'
  })

  const { data: homeContent } = useAsyncData(
    `home-${locale.value}`,
    async () => {
      try {
        const allContent = await queryCollection(collectionName.value).all()
        const content = allContent.find((item) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const itemAny = item as any
          return itemAny._id === '/index' || itemAny._path === '/home/index'
        })
        return content as unknown as HomeContent
      } catch (error) {
        console.error(`Failed to fetch home content for ${locale.value}:`, error)
        return null
      }
    },
    {
      watch: [locale],
      server: true,
      lazy: false,
    }
  )

  return {
    homeContent: readonly(homeContent),
  }
}
