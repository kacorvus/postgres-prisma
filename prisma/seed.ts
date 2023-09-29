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
    /*
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
    */
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
