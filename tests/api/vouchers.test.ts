import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createRequest, createResponse } from 'node-mocks-http'
import prisma from '../../lib/prisma'
import handler from '../../pages/api/vouchers'

import resetTestDb from '../test-utils'

beforeAll(async () => {
  await resetTestDb(['order', 'voucher'])
})

afterAll(async () => {
  await prisma.$disconnect()
})

describe('vouchers API', () => {
  it('GET returns list (initially empty)', async () => {
    const req = createRequest({ method: 'GET' })
    const res = createResponse()
    await handler(req as any, res as any)
    const raw = res._getData()
    const data = typeof raw === 'string' && raw.length ? JSON.parse(raw) : raw
    expect(Array.isArray(data)).toBe(true)
  })

  it('POST creates voucher and returns 201', async () => {
    const req = createRequest({ method: 'POST', body: { code: 'VOUCHER1', amount: 100 } })
    const res = createResponse()
    await handler(req as any, res as any)
    expect(res.statusCode).toBe(201)
    const raw = res._getData()
    const json = typeof raw === 'string' && raw.length ? JSON.parse(raw) : raw
    expect(json.code).toBe('VOUCHER1')
  })

  it('POST duplicate voucher returns 409', async () => {
    const req = createRequest({ method: 'POST', body: { code: 'VOUCHER1', amount: 100 } })
    const res = createResponse()
    await handler(req as any, res as any)
    expect(res.statusCode).toBe(409)
  })

  it('POST invalid voucher returns 422', async () => {
    const req = createRequest({ method: 'POST', body: { code: '', amount: -1 } })
    const res = createResponse()
    await handler(req as any, res as any)
    expect(res.statusCode).toBe(422)
    const raw = res._getData()
    const json = typeof raw === 'string' && raw.length ? JSON.parse(raw) : raw
    expect(json.error).toBe('validation_error')
  })

  it('unsupported method returns 405', async () => {
    const req = createRequest({ method: 'DELETE' })
    const res = createResponse()
    await handler(req as any, res as any)
    expect(res.statusCode).toBe(405)
  })

  it('GET returns vouchers in createdAt desc order', async () => {
    const r1 = createRequest({ method: 'POST', body: { code: 'X1', amount: 10 } })
    const s1 = createResponse()
    await handler(r1 as any, s1 as any)

    const r2 = createRequest({ method: 'POST', body: { code: 'X2', amount: 20 } })
    const s2 = createResponse()
    await handler(r2 as any, s2 as any)

    const g = createRequest({ method: 'GET' })
    const gres = createResponse()
    await handler(g as any, gres as any)
    const raw = gres._getData()
    const data = typeof raw === 'string' && raw.length ? JSON.parse(raw) : raw
    expect(Array.isArray(data)).toBe(true)
    expect(data[0].code).toBe('X2')
  })
})
