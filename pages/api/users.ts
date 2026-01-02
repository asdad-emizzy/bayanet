import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } })
      return res.status(200).json(users)
    }

    if (req.method === 'POST') {
      const { email, name, phone, role } = req.body
      if (!email) return res.status(400).json({ error: 'email is required' })

      // Basic create with uniqueness handled by Prisma
      try {
        const user = await prisma.user.create({
          data: { email, name, phone, role },
        })
        return res.status(201).json(user)
      } catch (err: any) {
        // Handle unique constraint violation
        if (err.code === 'P2002') {
          return res.status(409).json({ error: 'User with that email or phone already exists' })
        }
        throw err
      }
    }

    res.setHeader('Allow', 'GET, POST')
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  } catch (error) {
    console.error('users api error', error)
    return res.status(500).json({ error: 'internal error' })
  }
}
