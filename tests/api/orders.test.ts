import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createRequest, createResponse } from 'node-mocks-http'
import prisma from '../../lib/prisma'
import handler from '../../pages/api/orders'

import resetTestDb from '../test-utils'

beforeAll(async () => {
  await resetTestDb(['order', 'user'])
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

  it('POST invalid order returns 422', async () => {
    const req = createRequest({ method: 'POST', body: { userId: '', total: -5 } })
    const res = createResponse()
    await handler(req as any, res as any)
    expect(res.statusCode).toBe(422)
    const raw = res._getData()
    const json = typeof raw === 'string' && raw.length ? JSON.parse(raw) : raw
    expect(json.error).toBe('validation_error')
  })

  it('unsupported method returns 405', async () => {
    const req = createRequest({ method: 'PATCH' })
    const res = createResponse()
    await handler(req as any, res as any)
    expect(res.statusCode).toBe(405)
  })

  it('creating order with missing user returns 404 user_not_found', async () => {
    // use a random userId that does not exist
    const req = createRequest({ method: 'POST', body: { userId: 'nonexistent', total: 10 } })
    const res = createResponse()
    await handler(req as any, res as any)
    expect(res.statusCode).toBe(404)
    const raw = res._getData()
    const json = typeof raw === 'string' && raw.length ? JSON.parse(raw) : raw
    expect(json.error).toBe('user_not_found')
  })

})
