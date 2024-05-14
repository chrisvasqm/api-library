import prisma from '../../prisma/client';

export const findUser = (email: string) => {
    return prisma.user.findUnique({ where: { email } })
}

export const findUserById = (id: number) => {
    return prisma.user.findUnique({ where: { id } })
}

export const createUser = (email: string, password: string) => {
    return prisma.user.create({ data: { email, password }});
}