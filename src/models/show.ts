import { Prisma } from '@prisma/client'
import { prisma } from '../lib/prisma'

export function getTrendingShows(searchTerm?: string) {
  return prisma.show.findMany({
    where: {
      isTrending: { equals: true },
      ...(searchTerm
        ? { title: { contains: searchTerm, mode: 'insensitive' } }
        : {}),
    },
    include: { thumbnail: { include: { trending: true } } },
  })
}

export type TrendingShow = Prisma.PromiseReturnType<
  typeof getTrendingShows
>[number]

export function getShows(searchTerm?: string) {
  return prisma.show.findMany({
    where: {
      ...(searchTerm
        ? { title: { contains: searchTerm, mode: 'insensitive' } }
        : { isTrending: { equals: false } }),
    },
    include: { thumbnail: { include: { regular: true } } },
  })
}

export type ShowWithThumbnail = Prisma.PromiseReturnType<
  typeof getShows
>[number]

export function getShowsWithThumbnails(searchTerm?: string) {
  return prisma.show.findMany({
    ...(searchTerm ? { where: { title: { contains: searchTerm } } } : {}),
    include: { thumbnail: { include: { trending: true, regular: true } } },
  })
}

export function getMovieShows(searchTerm?: string) {
  return prisma.show.findMany({
    where: {
      category: 'Movie',
      ...(searchTerm
        ? { title: { contains: searchTerm, mode: 'insensitive' } }
        : {}),
    },
    include: { thumbnail: { include: { regular: true } } },
  })
}

export function getTVSeriesShows(searchTerm?: string) {
  return prisma.show.findMany({
    where: {
      category: 'TV Series',
      ...(searchTerm
        ? { title: { contains: searchTerm, mode: 'insensitive' } }
        : {}),
    },
    include: { thumbnail: { include: { regular: true } } },
  })
}

export function getBookmarkedShows(userEmail: string, searchTerm?: string) {
  return prisma.show.findMany({
    where: {
      bookmarkedBy: { some: { user: { email: userEmail } } },
      ...(searchTerm
        ? { title: { contains: searchTerm, mode: 'insensitive' } }
        : {}),
    },
    include: { thumbnail: { include: { regular: true } } },
  })
}
