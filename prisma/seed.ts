import { PrismaClient } from '@prisma/client'

import data from './data.json'

const prisma = new PrismaClient()

// Using the json provided by the challenge to seed the database
// Since there will be support for multiple users, the `isBookmarked`
// flag is ignored
function createShows() {
  return Promise.all(
    data.map(({ isBookmarked, ...show }) => {
      return prisma.show.upsert({
        where: { title: show.title },
        update: {},
        create: {
          ...show,
          thumbnail: {
            create: {
              ...(show.thumbnail.regular
                ? { regular: { create: show.thumbnail.regular } }
                : {}),
              ...(show.thumbnail.trending
                ? { trending: { create: show.thumbnail.trending } }
                : {}),
            },
          },
        },
      })
    }),
  )
}

createShows()
  .then(async () => await prisma.$disconnect())
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
