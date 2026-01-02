import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createRequest, createResponse } from 'node-mocks-http'
import prisma from '../../lib/prisma'
import handler from '../../pages/api/orders'

import { execSync } from 'child_process'
import fs from 'fs'

beforeAll(async () => {
  try {
    if (fs.existsSync('prisma/dev.db')) fs.unlinkSync('prisma/dev.db')
  } catch (e) {}
  execSync('npx prisma db push', { stdio: 'ignore' })
  await prisma.$connect()
  await prisma.order.deleteMany()
  await prisma.user.deleteMany()
})

afterAll(async () => {
  await prisma.$disconnect()
})

describe('orders API', () => {
  it('GET returns list (initially empty)', async () => {
    const req = createRequest({ method: 'GET' })
    const res = createResponse()
    await handler(req as any, res as any)
    const raw = res._getData()
    const data = typeof raw === 'string' && raw.length ? JSON.parse(raw) : raw
    expect(Array.isArray(data)).toBe(true)
  })

  it('POST creates order and returns 201', async () => {
    const user = await prisma.user.create({ data: { email: 'orderuser@example.com' } })
    const req = createRequest({ method: 'POST', body: { userId: user.id, total: 250 } })
    const res = createResponse()
    await handler(req as any, res as any)
    expect(res.statusCode).toBe(201)
    const raw = res._getData()
    const json = typeof raw === 'string' && raw.length ? JSON.parse(raw) : raw
    expect(json.userId).toBe(user.id)
  })

})
