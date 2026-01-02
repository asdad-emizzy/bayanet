import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import { withApi } from '../../lib/api'
import { createUserSchema } from '../../lib/validation'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } })
    return res.status(200).json(users)
  }

  if (req.method === 'POST') {
    const parsed = createUserSchema.parse(req.body)
    try {
      const user = await prisma.user.create({ data: parsed })
      return res.status(201).json(user)
    } catch (err: any) {
      if (err.code === 'P2002') return res.status(409).json({ error: 'User with that email or phone already exists' })
      throw err
    }
  }

  res.setHeader('Allow', 'GET, POST')
  return res.status(405).end(`Method ${req.method} Not Allowed`)
}

export default withApi(handler)
