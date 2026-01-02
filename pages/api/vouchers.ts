import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const items = await prisma.voucher.findMany({ orderBy: { createdAt: 'desc' } })
      return res.status(200).json(items)
    }

    if (req.method === 'POST') {
      const { code, amount } = req.body
      if (!code) return res.status(400).json({ error: 'code is required' })
      try {
        const v = await prisma.voucher.create({ data: { code, amount } })
        return res.status(201).json(v)
      } catch (err: any) {
        if (err.code === 'P2002') return res.status(409).json({ error: 'Voucher code exists' })
        throw err
      }
    }

    res.setHeader('Allow', 'GET, POST')
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  } catch (error) {
    console.error('vouchers api error', error)
    return res.status(500).json({ error: 'internal error' })
  }
}
