import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createRequest, createResponse } from 'node-mocks-http'
import prisma from '../../lib/prisma'
import handler from '../../pages/api/users'

beforeAll(async () => {
  await prisma.$connect()
  // Ensure DB is clean: delete orders before users to avoid FK constraints
  await prisma.order.deleteMany()
  await prisma.user.deleteMany()
})

afterAll(async () => {
  await prisma.$disconnect()
})

describe('users API', () => {
  it('GET returns list (initially empty)', async () => {
    const req = createRequest({ method: 'GET' })
    const res = createResponse()
    await handler(req as any, res as any)
  const raw = res._getData()
  const data = typeof raw === 'string' && raw.length ? JSON.parse(raw) : raw
  expect(Array.isArray(data)).toBe(true)
  })

  it('POST creates user and returns 201', async () => {
    const req = createRequest({
      method: 'POST',
      body: { email: 'test@example.com', name: 'Test User', phone: '09171234567' },
    })
    const res = createResponse()
    await handler(req as any, res as any)
    expect(res.statusCode).toBe(201)
  const raw = res._getData()
  const json = typeof raw === 'string' && raw.length ? JSON.parse(raw) : raw
  expect(json.email).toBe('test@example.com')
  })

  it('POST duplicate email returns 409', async () => {
    const req = createRequest({
      method: 'POST',
      body: { email: 'test@example.com', name: 'Duplicate' },
    })
    const res = createResponse()
    await handler(req as any, res as any)
    expect(res.statusCode).toBe(409)
  })
})
