import prisma from '@/lib/prisma'

export async function POST() {
    const res = await prisma.graph.create({
        data: {
            name: 'graph1',
        },
    })
   
    return Response.json({id: res.id})
  }