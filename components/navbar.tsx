"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation'

export default function Navbar () {
  const pathName = usePathname();
  const isAdmin = pathName.startsWith('/admin');
  console.log("pathName", pathName);
  return (
    <nav className="border-gray-200 bg-teal-500">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center">
            <img src="/logo.png" className="h-8 mr-3" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">UNZA Application System</span>
        </a>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          { isAdmin ? (
            <ul className="font-medium flex items-center justify-between space-x-4 text-white">
              <li>
                <Link href='/admin/applications'>Applications</Link>
              </li>
              <li>
                <Link href='/admin/signin'>Sign In</Link>
              </li>
            </ul>
          ) : (
            <ul className="font-medium flex items-center justify-between space-x-4 text-white">
              <li>
                <Link href='/applications'>Applications</Link>
              </li>
              <li>
                <Link href='/apply'>Apply</Link>
              </li>
              <li>
                <Link href='/signin'>Sign In</Link>
              </li>
              <li>
                <Link href='/signup'>Sign Up</Link>
              </li>
            </ul>
          )}
        </div>
      </div>

    </nav>
  )
}