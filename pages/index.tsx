import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Head>
        <title>Bayanet</title>
        <meta name="description" content="Bayanet Next.js app" />
      </Head>

      <main className="p-8 bg-white rounded shadow">
        <h1 className="text-2xl font-semibold">Welcome to Bayanet</h1>
        <p className="mt-2 text-sm text-gray-600">Your Next.js + Tailwind starter</p>
        <Link href="/api/hello" className="mt-4 inline-block text-blue-600">Call API</Link>
      </main>
    </div>
  )
}
