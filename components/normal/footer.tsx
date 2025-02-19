import Link from 'next/link'
import React from 'react'
import { Separator } from '../ui/separator'
import { SiteLogo } from '../logo'

export const Footer = () => {
  return (
    <footer className="pt-20">
    <div className="container mx-auto px-6 md:px-12 grid gap-6 md:grid-cols-3 text-center md:text-left">

      {/* Logo & About */}
      <div className="flex flex-col">
        <div className="self-center md:self-start">
        <SiteLogo/>
        </div>
        <p className="text-gray-400 mt-2 text-sm">
          Your ultimate fitness companion. Track workouts, monitor nutrition, and achieve your fitness goals effortlessly.
        </p>
      </div>

      {/* Navigation Links */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
        <ul className="space-y-2 text-gray-400 text-sm">
          <li><Link href="/legal/tos" className="hover:text-primary">Terms & Conditions</Link></li>
          <li><Link href="/legal/privacy" className="hover:text-primary">Privacy Policy</Link></li>
        </ul>
      </div>
      <div>
      <h3 className="text-lg font-semibold mb-3">Contact</h3>
      <ul className="space-y-2 text-gray-400 text-sm">
        <li><Link href="mailto:reptrackerfit@gmail.com" className="hover:text-primary">reptrackerfit@gmail.com</Link></li>
      </ul>
    </div>
    </div>
    {/* Bottom Bar */}
    <div className="mt-6 text-center text-gray-500 text-xs">
    <Separator/>
      <p className="pt-4">&copy; {new Date().getFullYear()} Reptracker. All Rights Reserved.</p>
    </div>
  </footer >
  )
}
