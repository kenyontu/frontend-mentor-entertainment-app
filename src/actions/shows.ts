'use server'

import { db, Category } from '~/lib/db'

type GetShowsOptions = {
  searchTerm?: string
  category?: Category['id']
}

export async function getShows({ searchTerm, category }: GetShowsOptions) {
  let query = db.selectFrom('shows')

  if (searchTerm) {
    query = query.where(db.fn('lower', ['title']), 'like', `%${searchTerm}%`)
  }

  if (category) {
    query = query.where('category_id', '=', category)
  }

  return query
    .select(['id', 'category_id', 'rating_id', 'title', 'year'])
    .execute()
}

export async function getTrendingShows() {
  return db
    .selectFrom('shows')
    .innerJoin('trending_shows', 'trending_shows.show_id', 'shows.id')
    .select([
      'shows.id',
      'shows.category_id',
      'shows.rating_id',
      'shows.title',
      'shows.year',
    ])
    .execute()
}
