import { TrendingShowItem } from './item/TrendingShowItem'
import { Show } from '~/lib/db'
import { TrendingShowsContainer } from './TrendingShowsContainer'
import { useTranslations } from 'next-intl'

type Props = {
  shows: Show[]
}

export function TrendingShows({ shows }: Props) {
  const t = useTranslations('Shows')

  return (
    <TrendingShowsContainer
      t={{
        title: t('trending'),
        srScrollLeft: t('srScrollLeft'),
        srScrollRight: t('srScrollRight'),
      }}
    >
      <>
        {shows.map((show, index) => (
          <TrendingShowItem
            key={show.id}
            show={show}
            preloadImage={index === 0}
          />
        ))}
      </>
    </TrendingShowsContainer>
  )
}
