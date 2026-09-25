'use client'

import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
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

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    setOpen(null)
    document.body.style.overflow = ''
  }, [])

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = ''
      return
    }
    // Close on outside click
    const handleClick = (e: MouseEvent) => {
      const header = document.querySelector('.site-header')
      if (header && !header.contains(e.target as Node)) {
        closeMenu()
      }
    }
    // Close on ESC key
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu()
    }
    document.addEventListener('click', handleClick)
    document.addEventListener('keydown', handleKey)
    // Lock body scroll while menu is open
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [menuOpen, closeMenu])

  return (
    <header className={`site-header site-header-shared${scrolled ? ' scrolled' : ''}`}>
      {/* Inner container: constrains content to 80% / max 1400px */}
      <div className="site-header-inner">
        <Logo />

        <button
          className="mobile-menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>

        <nav className={`shared-nav ${menuOpen ? 'mobile-open' : ''}`}>
          <Link href="/" onClick={closeMenu}>Home</Link>

          <div
            className="nav-dropdown"
            onMouseEnter={() => setOpen('services')}
            onMouseLeave={() => setOpen(null)}
            onClick={(e) => e.stopPropagation()}
          >
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
                    onClick={closeMenu}
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/case-studies" onClick={closeMenu}>Case Studies</Link>

          <div
            className="nav-dropdown"
            onMouseEnter={() => setOpen('technology')}
            onMouseLeave={() => setOpen(null)}
            onClick={(e) => e.stopPropagation()}
          >
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
                    onClick={closeMenu}
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
