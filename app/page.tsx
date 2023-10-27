import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import Table from '@/components/table'
import TablePlaceholder from '@/components/table-placeholder'
import ExpandingArrow from '@/components/expanding-arrow'

export const runtime = 'edge'
export const preferredRegion = 'home'
export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <p className="pt-4 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-5xl font-medium tracking-tight text-transparent">
        Welcome to the UNZA Application System
      </p>
      <ul className="list-disc">
        <li>
          You can sign up by clicking the Sign Up link.
        </li>
        <li>
          You can sign in by clicking the Sign In link.
        </li>
        <li>
          You can view your applications by clicking the Applications link.
        </li>
        <li>
          You can  apply by clicking the Apply link.
        </li>
      </ul>
    </main>
  )
}
