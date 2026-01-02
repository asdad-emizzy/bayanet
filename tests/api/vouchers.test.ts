import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createRequest, createResponse } from 'node-mocks-http'
import prisma from '../../lib/prisma'
import handler from '../../pages/api/vouchers'

beforeAll(async () => {
  await prisma.voucher.deleteMany()
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
})
