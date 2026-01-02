import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const items = await prisma.order.findMany({ orderBy: { createdAt: 'desc' } })
      return res.status(200).json(items)
    }

    if (req.method === 'POST') {
      const { userId, total } = req.body
      if (!userId) return res.status(400).json({ error: 'userId is required' })
      try {
        const o = await prisma.order.create({ data: { userId, total } })
        return res.status(201).json(o)
      } catch (err: any) {
        if (err.code === 'P2002') return res.status(409).json({ error: 'Order conflict' })
        throw err
      }
    }

    res.setHeader('Allow', 'GET, POST')
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  } catch (error) {
    console.error('orders api error', error)
    return res.status(500).json({ error: 'internal error' })
  }
}
