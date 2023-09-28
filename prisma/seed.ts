import prisma from '../lib/prisma'

async function main() {
  const response = await Promise.all([
    prisma.graph.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: 'graph 1',
      },
    }),
    await prisma.node.upsert({
      where: { id: 1 },
      update: {},
      create: {
        label: 'node 1',
        graph: {
          connect: { id: 1},
        },
      },
    }),
    await prisma.node.upsert({
      where: { id: 2 },
      update: {},
      create: {
        label: 'node 2',
        graph: {
          connect: { id: 1},
        },
      },
    }),
    prisma.edge.upsert({
      where: { id: 1 },
      update: {},
      create: {
        fromNode: {
          connect: { id: 1},
        },
        toNode: {
          connect: { id: 2},
        },
      },
    }),
    prisma.users.upsert({
      where: { email: 'rauchg@vercel.com' },
      update: {},
      create: {
        name: 'Guillermo Rauch',
        email: 'rauchg@vercel.com',
        image:
          'https://pbs.twimg.com/profile_images/1576257734810312704/ucxb4lHy_400x400.jpg',
      },
    }),
    await prisma.users.upsert({
      where: { email: 'stey@vercel.com' },
      update: {},
      create: {
        name: 'Steven Tey',
        email: 'stey@vercel.com',
        image:
          'https://pbs.twimg.com/profile_images/1506792347840888834/dS-r50Je_400x400.jpg',
      },
    }),
  ])
  console.log(response)
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
