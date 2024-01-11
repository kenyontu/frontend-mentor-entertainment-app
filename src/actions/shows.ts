'use server'

import { sql } from '~/lib/db'

export type ShowCategory = 'movie' | 'tv-series'
export type ShowRating = 'pg' | 'e' | '18+'

export type Show = {
  id: string
  year: number
  category_id: ShowCategory
  rating_id: ShowRating
  title: string
}

export async function getShows(searchTerm?: string): Promise<Show[]> {
  const shows: Show[] = searchTerm
    ? await sql`SELECT id, year, category_id, rating_id, title FROM shows WHERE title LIKE ${
        '%' + searchTerm + '%'
      };`
    : await sql`SELECT id, year, category_id, rating_id, title FROM shows;`

  return shows
}

export async function getTrendingShows(): Promise<Show[]> {
  const shows: Show[] =
    await sql`SELECT s.id, s.title, s.year, s.category_id, s.rating_id FROM shows s INNER JOIN trending_shows t ON s.id=t.show_id;`

  return shows
}
