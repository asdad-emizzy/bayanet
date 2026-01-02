import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import { withApi } from '../../lib/api'
import { createOrderSchema } from '../../lib/validation'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const items = await prisma.order.findMany({ orderBy: { createdAt: 'desc' } })
    return res.status(200).json(items)
  }

  if (req.method === 'POST') {
    const parsed = createOrderSchema.parse(req.body)
    try {
      const o = await prisma.order.create({ data: parsed })
      return res.status(201).json(o)
    } catch (err: any) {
      if (err.code === 'P2002') return res.status(409).json({ error: 'Order conflict' })
      throw err
    }
  }

  res.setHeader('Allow', 'GET, POST')
  return res.status(405).end(`Method ${req.method} Not Allowed`)
}

export default withApi(handler)
