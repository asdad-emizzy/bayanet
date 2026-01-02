import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createRequest, createResponse } from 'node-mocks-http'
import prisma from '../../lib/prisma'
import handler from '../../pages/api/users'

import resetTestDb from '../test-utils'

beforeAll(async () => {
  await resetTestDb(['order', 'user'])
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

  it('POST invalid email returns 422 with validation_error', async () => {
    const req = createRequest({ method: 'POST', body: { email: 'not-an-email' } })
    const res = createResponse()
    await handler(req as any, res as any)
    expect(res.statusCode).toBe(422)
    const raw = res._getData()
    const json = typeof raw === 'string' && raw.length ? JSON.parse(raw) : raw
    expect(json.error).toBe('validation_error')
  })

  it('unsupported method returns 405', async () => {
    const req = createRequest({ method: 'PUT' })
    const res = createResponse()
    await handler(req as any, res as any)
    expect(res.statusCode).toBe(405)
  })

  it('GET returns users in createdAt desc order', async () => {
    // create two users and ensure the newest appears first
    const r1 = createRequest({ method: 'POST', body: { email: 'a1@example.com' } })
    const s1 = createResponse()
    await handler(r1 as any, s1 as any)

    const r2 = createRequest({ method: 'POST', body: { email: 'a2@example.com' } })
    const s2 = createResponse()
    await handler(r2 as any, s2 as any)

    const g = createRequest({ method: 'GET' })
    const gres = createResponse()
    await handler(g as any, gres as any)
    const raw = gres._getData()
    const data = typeof raw === 'string' && raw.length ? JSON.parse(raw) : raw
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBeGreaterThanOrEqual(2)
    expect(data[0].email).toBe('a2@example.com')
  })
})
