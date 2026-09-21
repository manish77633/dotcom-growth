import Link from 'next/link'

export function Footer() {
  return (
    <footer>
      <div className="container footer-inner">
        <div className="footer-brand">
          <Link className="logo footer-logo" href="/">
            <span>dotcom</span>Gr<span className="arrow">↑</span>wth
          </Link>
          <p>
            We design, build, and scale commercial technology infrastructure for high-growth enterprise and mid-market organizations. No generalists. Only dedicated subject-matter expertise.
          </p>
        </div>

        <div>
          <b>SOLUTIONS</b>
          <Link href="/services">Martech Setup</Link>
          <Link href="/services">Growth Marketing</Link>
          <Link href="/services">Brand Positioning</Link>
          <Link href="/technology">Custom Software</Link>
        </div>

        <div>
          <b>DIFFERENTIATORS</b>
          <Link href="/technology">Infrastructure First</Link>
          <Link href="/services">Specialist Teams</Link>
          <Link href="/services">Revenue KPIs</Link>
          <Link href="/services">Enterprise Agile</Link>
        </div>

        <div>
          <b>CONTACT</b>
          <a className="orange-text" href="/#contact">Request Strategy Call</a>
          <a href="mailto:hi@dotcomgrowth.com">hi@dotcomgrowth.com</a>
          <a>Headquarters:<br />Austin, Texas</a>
        </div>

        <small className="copyright">
          <span>© 2026 Dotcom Growth. All rights reserved.</span>
          <span className="footer-legal">
            <a>Privacy Policy</a>
            <a>Terms of Service</a>
          </span>
        </small>
      </div>
    </footer>
  )
}
