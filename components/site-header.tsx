'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { services, technologies } from '@/lib/site-data'

function Logo() {
  return (
    <Link className="logo" href="/">
      <span>dotcom</span>Gr<span className="arrow">↑</span>wth
    </Link>
  )
}

export function SiteHeader() {
  const [open, setOpen] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let lastScrolled = false
    const onScroll = () => {
      const isScrolled = window.scrollY > 30
      if (isScrolled !== lastScrolled) {
        lastScrolled = isScrolled
        setScrolled(isScrolled)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const handler = () => setOpen(null)
    window.addEventListener('click', handler)
    return () => window.removeEventListener('click', handler)
  }, [open])

  return (
    <header className={`site-header site-header-shared${scrolled ? ' scrolled' : ''}`}>
      {/* Inner container: constrains content to 80% / max 1400px */}
      <div className="site-header-inner">
        <Logo />

        <button
          className="mobile-menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : 'MENU'}
        </button>

        <nav className={`shared-nav ${menuOpen ? 'mobile-open' : ''}`}>
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>

          <div className="nav-dropdown" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={open === 'services'}
              onClick={() => setOpen(open === 'services' ? null : 'services')}
            >
              Services <span>▾</span>
            </button>
            {open === 'services' && (
              <div className="mega-menu services-menu">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    onClick={() => { setOpen(null); setMenuOpen(false) }}
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/case-studies" onClick={() => setMenuOpen(false)}>Case Studies</Link>

          <div className="nav-dropdown" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={open === 'technology'}
              onClick={() => setOpen(open === 'technology' ? null : 'technology')}
            >
              Technology <span>▾</span>
            </button>
            {open === 'technology' && (
              <div className="mega-menu technology-menu">
                {technologies.map((technology) => (
                  <Link
                    key={technology.slug}
                    href={`/technology/${technology.slug}`}
                    onClick={() => { setOpen(null); setMenuOpen(false) }}
                  >
                    {technology.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <Link className="orange-button" href="/#contact">TALK TO AN EXPERT</Link>
      </div>
    </header>
  )
}
