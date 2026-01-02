import { z } from 'zod'

export const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  phone: z.string().optional(),
  role: z.string().optional(),
})

export const createVoucherSchema = z.object({
  code: z.string().min(1),
  amount: z.number().int().nonnegative(),
})

export const createOrderSchema = z.object({
  userId: z.string().min(1),
  total: z.number().int().nonnegative(),
})
