import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db
    .insertInto('categories')
    .values([
      {
        id: 'movie',
      },
      {
        id: 'tv-series',
      },
    ])
    .execute()

  await db
    .insertInto('ratings')
    .values([{ id: 'pg' }, { id: '18+' }, { id: 'e' }])
    .execute()

  await db
    .insertInto('shows')
    .values([
      {
        id: 'beyond-earth',
        category_id: 'movie',
        rating_id: 'pg',
        title: 'Beyond Earth',
        year: 2019,
      },
      {
        id: 'bottom-gear',
        category_id: 'movie',
        rating_id: 'pg',
        title: 'Bottom Gear',
        year: 2021,
      },
      {
        id: 'undiscovered-cities',
        category_id: 'tv-series',
        rating_id: 'e',
        title: 'Undiscovered Cities',
        year: 2019,
      },
      {
        id: '1998',
        category_id: 'movie',
        rating_id: '18+',
        title: '1998',
        year: 2021,
      },
      {
        id: 'dark-side-of-the-moon',
        category_id: 'tv-series',
        rating_id: 'pg',
        title: 'Dark Side of the Moon',
        year: 2018,
      },
      {
        id: 'the-great-lands',
        category_id: 'movie',
        rating_id: 'e',
        title: 'The Great Lands',
        year: 2019,
      },
      {
        id: 'the-diary',
        category_id: 'tv-series',
        rating_id: 'pg',
        title: 'The Diary',
        year: 2019,
      },
      {
        id: 'earths-untouched',
        category_id: 'movie',
        rating_id: '18+',
        title: 'Earth’s Untouched',
        year: 2017,
      },
      {
        id: 'no-land-beyond',
        category_id: 'movie',
        rating_id: 'e',
        title: 'No Land Beyond',
        year: 2019,
      },
      {
        id: 'during-the-hunt',
        category_id: 'tv-series',
        rating_id: 'pg',
        title: 'During the Hunt',
        year: 2016,
      },
      {
        id: 'autosport-the-series',
        category_id: 'tv-series',
        rating_id: '18+',
        title: 'Autosport the Series',
        year: 2016,
      },
      {
        id: 'same-answer-ii',
        category_id: 'movie',
        rating_id: 'e',
        title: 'Same Answer II',
        year: 2017,
      },
      {
        id: 'below-echo',
        category_id: 'tv-series',
        rating_id: 'pg',
        title: 'Below Echo',
        year: 2016,
      },
      {
        id: 'the-rockies',
        category_id: 'tv-series',
        rating_id: 'e',
        title: 'The Rockies',
        year: 2015,
      },
      {
        id: 'relentless',
        category_id: 'movie',
        rating_id: 'pg',
        title: 'Relentless',
        year: 2017,
      },
      {
        id: 'community-of-ours',
        category_id: 'tv-series',
        rating_id: '18+',
        title: 'Community of Ours',
        year: 2018,
      },
      {
        id: 'van-life',
        category_id: 'movie',
        rating_id: 'pg',
        title: 'Van Life',
        year: 2015,
      },
      {
        id: 'the-heiress',
        category_id: 'movie',
        rating_id: 'pg',
        title: 'The Heiress',
        year: 2021,
      },
      {
        id: 'off-the-track',
        category_id: 'movie',
        rating_id: '18+',
        title: 'Off the Track',
        year: 2017,
      },
      {
        id: 'whispering-hill',
        category_id: 'movie',
        rating_id: 'e',
        title: 'Whispering Hill',
        year: 2017,
      },
      {
        id: '112',
        category_id: 'tv-series',
        rating_id: 'pg',
        title: '112',
        year: 2013,
      },
      {
        id: 'lone-heart',
        category_id: 'movie',
        rating_id: 'e',
        title: 'Lone Heart',
        year: 2017,
      },
      {
        id: 'production-line',
        category_id: 'tv-series',
        rating_id: 'pg',
        title: 'Production Line',
        year: 2018,
      },
      {
        id: 'dogs',
        category_id: 'tv-series',
        rating_id: 'e',
        title: 'Dogs',
        year: 2016,
      },
      {
        id: 'asia-in-24-days',
        category_id: 'tv-series',
        rating_id: 'pg',
        title: 'Asia in 24 Days',
        year: 2020,
      },
      {
        id: 'the-tasty-tour',
        category_id: 'tv-series',
        rating_id: 'pg',
        title: 'The Tasty Tour',
        year: 2016,
      },
      {
        id: 'darker',
        category_id: 'movie',
        rating_id: '18+',
        title: 'Darker',
        year: 2017,
      },
      {
        id: 'unresolved-cases',
        category_id: 'tv-series',
        rating_id: '18+',
        title: 'Unresolved Cases',
        year: 2018,
      },
      {
        id: 'mission-saturn',
        category_id: 'movie',
        rating_id: 'pg',
        title: 'Mission: Saturn',
        year: 2017,
      },
    ])
    .execute()

  await db
    .insertInto('trending_shows')
    .values([
      { show_id: 'beyond-earth' },
      { show_id: 'bottom-gear' },
      { show_id: 'undiscovered-cities' },
      { show_id: '1998' },
      { show_id: 'dark-side-of-the-moon' },
    ])
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {}
