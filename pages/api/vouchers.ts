import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import { withApi } from '../../lib/api'
import { createVoucherSchema } from '../../lib/validation'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const items = await prisma.voucher.findMany({ orderBy: { createdAt: 'desc' } })
    return res.status(200).json(items)
  }

  if (req.method === 'POST') {
    const parsed = createVoucherSchema.parse(req.body)
    try {
      const v = await prisma.voucher.create({ data: parsed })
      return res.status(201).json(v)
    } catch (err: any) {
      if (err.code === 'P2002') return res.status(409).json({ error: 'Voucher code exists' })
      throw err
    }
  }

  res.setHeader('Allow', 'GET, POST')
  return res.status(405).end(`Method ${req.method} Not Allowed`)
}

export default withApi(handler)
