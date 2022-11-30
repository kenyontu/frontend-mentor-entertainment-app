import { User } from '@prisma/client'
import bcrypt from 'bcrypt'

import { prisma } from '~/lib/prisma'

export function createUser(user: Omit<User, 'id'>) {
  return bcrypt.hash(user.password, 10).then(hashedPassword => {
    return prisma.user.create({ data: { ...user, password: hashedPassword } })
  })
}
