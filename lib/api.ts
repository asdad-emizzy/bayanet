import { ZodError } from 'zod'

export function withApi(handler: any) {
  return async (req: any, res: any) => {
    try {
      await handler(req, res)
    } catch (err: any) {
      if (err instanceof ZodError) {
        return res.status(422).json({ error: 'validation_error', issues: err.errors })
      }
      console.error('api error', err)
      return res.status(500).json({ error: 'internal_error' })
    }
  }
}
