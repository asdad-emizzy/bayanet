import { execSync } from 'node:child_process'
import fs from 'node:fs'
import prisma from '../lib/prisma'

const DB_PATH = 'prisma/dev.db'

/**
 * Ensure a clean sqlite dev DB for tests. This function is resilient to
 * transient connection/locking errors and will retry a few times before
 * failing. It also deletes models in an order that avoids FK constraint
 * issues (e.g. delete orders before users).
 *
 * @param deleteOrder list of model names to delete in order. Supported: 'order','voucher','user'
 */
export async function resetTestDb(deleteOrder: string[] = ['order', 'voucher', 'user']) {
  const maxAttempts = 3
  let lastError: unknown = null
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      if (fs.existsSync(DB_PATH)) fs.unlinkSync(DB_PATH)
      execSync('npx prisma db push', { stdio: 'ignore' })
      await prisma.$connect()

      // Delete models in requested order to avoid FK constraint errors
      for (const model of deleteOrder) {
        if (model === 'order') await prisma.order.deleteMany()
        else if (model === 'voucher') await prisma.voucher.deleteMany()
        else if (model === 'user') await prisma.user.deleteMany()
      }

      return
    } catch (err) {
      lastError = err
      // best-effort disconnect (allow errors to surface to outer scope if fatal)
      // eslint-disable-next-line no-await-in-loop
      await prisma.$disconnect()
      // small backoff
      // eslint-disable-next-line no-await-in-loop
      await new Promise((res) => setTimeout(res, 150 * attempt))
    }
  }
  // If we reach here, all attempts failed
  throw lastError
}

export default resetTestDb
