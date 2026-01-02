import { execSync } from 'node:child_process'
import fs from 'node:fs'
import prisma from '../lib/prisma'

const DB_PATHS = ['prisma/dev.db', 'prisma/prisma/dev.db']

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
      // Ensure prisma is disconnected before we replace the DB file
      try {
        await prisma.$disconnect()
      } catch (err) {
        // Not fatal; log for visibility
        // eslint-disable-next-line no-console
        console.debug('prisma disconnect during resetTestDb:', String(err))
      }
      // remove any existing DB files (helper reduces cognitive complexity)
      removeExistingDbFiles()
      execSync('npx prisma db push', { stdio: 'ignore' })
      await prisma.$connect()

      // Delete models in requested order to avoid FK constraint errors. Be resilient
      // to missing tables by catching errors per model.
      for (const model of deleteOrder) {
        try {
          if (model === 'order') await prisma.order.deleteMany()
          else if (model === 'voucher') await prisma.voucher.deleteMany()
          else if (model === 'user') await prisma.user.deleteMany()
        } catch (err) {
          // If the table doesn't exist yet, ignore and continue
          // eslint-disable-next-line no-console
          console.debug('deleteMany failed for', model, String(err))
        }
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

function removeExistingDbFiles() {
  for (const p of DB_PATHS) {
    if (fs.existsSync(p)) {
      try {
        fs.unlinkSync(p)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('failed to unlink', p, String(err))
      }
    }
  }
}
