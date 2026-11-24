import { Fragment, useState } from 'react'
import type { CSSProperties, MouseEvent, ReactNode } from 'react'
import portrait from './assets/portrait.png'
import crest from './assets/sovereign-crest.png'
import odieboardLogo from '../Public/odblogo.png'

/* ------------------------------------------------------------------ *
 * Icons — line-art SVGs used everywhere an emoji used to be
 * ------------------------------------------------------------------ */

type IconName =
  | 'flag'
  | 'pin'
  | 'crane'
  | 'globe'
  | 'cap'
  | 'building'
  | 'karate'
  | 'tennis'
  | 'pickleball'
  | 'mail'
  | 'chat'
  | 'phone'
  | 'book'
  | 'monitor'
  | 'calendar'
  | 'pencil'
  | 'check'
  | 'close'

const ICONS: Record<IconName, ReactNode> = {
  flag: (
    <>
      <path d="M5.5 21V4" />
      <path d="M5.5 5h13l-3.4 4.2 3.4 4.2h-13" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21.5s7-6.4 7-12a7 7 0 1 0-14 0c0 5.6 7 12 7 12z" />
      <circle cx="12" cy="9.5" r="2.6" />
    </>
  ),
  crane: (
    <>
      <path d="M4 21h13" />
      <path d="M8 21V5" />
      <path d="M3 5h13.5" />
      <path d="M14 5v3.5" />
      <rect x="12.2" y="8.5" width="3.6" height="3" rx="0.6" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <ellipse cx="12" cy="12" rx="4" ry="8.5" />
    </>
  ),
  cap: (
    <>
      <path d="M12 4 2.5 8.5 12 13l9.5-4.5z" />
      <path d="M6.5 10.8V15c0 1.6 2.5 2.8 5.5 2.8s5.5-1.2 5.5-2.8v-4.2" />
    </>
  ),
  building: (
    <>
      <rect x="4.5" y="3" width="15" height="18" rx="1.5" />
      <path d="M9 7.5h1.5M13.5 7.5H15M9 11.5h1.5M13.5 11.5H15M9 15.5h1.5M13.5 15.5H15" />
      <path d="M10.5 21v-3h3v3" />
    </>
  ),
  karate: (
    <>
      <circle cx="12" cy="8.5" r="5.5" />
      <path d="M8.6 13.3 6.8 21l5.2-2.7L17.2 21l-1.8-7.7" />
    </>
  ),
  tennis: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M5.9 5.9c3.5 3.5 3.5 8.7 0 12.2" />
      <path d="M18.1 5.9c-3.5 3.5-3.5 8.7 0 12.2" />
    </>
  ),
  pickleball: (
    <>
      <ellipse cx="9.5" cy="9.5" rx="5.8" ry="7" transform="rotate(45 9.5 9.5)" />
      <path d="M13.6 14 17.5 17.9" />
      <circle cx="18.5" cy="6" r="2.2" />
    </>
  ),
  mail: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </>
  ),
  chat: <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H9l-5 4z" />,
  phone: (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" />
    </>
  ),
  book: (
    <>
      <path d="M12 6.5C10 4.7 7.2 4 4 4.6v13.6c3.2-.6 6 .1 8 1.9 2-1.8 4.8-2.5 8-1.9V4.6c-3.2-.6-6 .1-8 1.9z" />
      <path d="M12 6.5V20" />
    </>
  ),
  monitor: (
    <>
      <rect x="2.5" y="4" width="19" height="13" rx="2" />
      <path d="M9 21h6M12 17v4" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  pencil: (
    <>
      <path d="M4 20h4.2L20.3 7.9a2.9 2.9 0 0 0-4.1-4.1L4 15.8z" />
      <path d="M14.8 5.4 18.6 9.2" />
    </>
  ),
  check: <path d="m4.5 12.5 5 5 10-11" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
}

interface IconProps {
  name: IconName
  size?: number
}

function Icon({ name, size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 * Editable contact links — ported from the original inline <script>
 * ------------------------------------------------------------------ */

type LinkId =
  | 'contact-email'
  | 'contact-whatsapp'
  | 'contact-rwanda'
  | 'contact-website'
  | 'contact-bio'
  | 'contact-jitsi'
  | 'contact-cal'
  | 'contact-linkedin'
  | 'contact-facebook'

interface LinkEntry {
  href: string
  text: string
}

type Links = Record<LinkId, LinkEntry>

const LINKS_KEY = 'mw_bio_links_v1'

const DEFAULT_LINKS: Links = {
  'contact-email': { href: 'mailto:mylonwason@odiecloud.org', text: 'mylonwason@odiecloud.org' },
  'contact-whatsapp': { href: 'https://wa.me/16787017785', text: 'Chat on WhatsApp' },
  'contact-rwanda': { href: 'tel:+250794004336', text: '+250 794 004 336' },
  'contact-website': { href: 'https://odiecloud.com', text: 'odiecloud.com' },
  'contact-bio': { href: 'https://mylonwason.com/about/', text: 'mylonwason.com/about/' },
  'contact-jitsi': {
    href: 'https://meet.jit.si/ODIECLOUD-Executive-Conference-20261110',
    text: 'meet.jit.si/ODIECLOUD-Executive-Conference-20261110',
  },
  'contact-cal': {
    href: 'https://cal.com/mylonwason',
    text: 'Book 60-min session →',
  },
  'contact-linkedin': {
    href: 'https://www.linkedin.com/in/imylonwason/',
    text: 'LinkedIn',
  },
  'contact-facebook': { href: 'https://web.facebook.com/mylonwason', text: 'Facebook' },
}

function readSavedLinks(): Partial<Links> {
  try {
    const saved = JSON.parse(localStorage.getItem(LINKS_KEY) || '{}') as Partial<Links>
    const previousDefaults: Partial<Record<LinkId, LinkEntry>> = {
      'contact-whatsapp': {
        href: 'https://wa.me/16787017785',
        text: '+1 (678) 701-7785',
      },
      'contact-bio': { href: 'https://iam.mylonwason.com', text: 'iam.mylonwason.com' },
      'contact-jitsi': {
        href: 'https://jitsi.odiecloud.org/imylonwason',
        text: 'jitsi.odiecloud.org/imylonwason',
      },
      'contact-cal': {
        href: 'https://calcom.odiecloud.org/imylonwason/business-startup?duration=60',
        text: 'Book 60-min session →',
      },
    }

    for (const id of Object.keys(previousDefaults) as LinkId[]) {
      const previous = previousDefaults[id]
      const savedLink = saved[id]
      if (previous && savedLink?.href === previous.href) {
        saved[id] = {
          ...savedLink,
          href: DEFAULT_LINKS[id].href,
          text: savedLink.text === previous.text ? DEFAULT_LINKS[id].text : savedLink.text,
        }
      }
    }

    return saved
  } catch {
    return {}
  }
}

/* ------------------------------------------------------------------ *
 * Page content
 * ------------------------------------------------------------------ */

const HERO_TITLES = [
  'Sovereign Architect & Custodian — WFSG',
  'Chairman & CEO  Oderson Holdings Ltd.',
  'Administrator  ODIECLOUD²π Ecosystem',
  'Karate Instructor · 6th Degree Black Belt (6th Dan)',
]

const DIGITAL_PLATFORMS = [
  {
    name: 'iam.mylonwason.com',
    href: 'https://iam.mylonwason.com',
    purpose: 'Digital Business Card',
    description: 'Primary networking and digital business card.',
  },
  {
    name: 'mylonwason.com',
    href: 'https://mylonwason.com',
    purpose: 'Sovereign Architect & Custodian',
    description: 'Executive identity, institutional leadership, and WFSG.',
  },
  {
    name: 'imylonwason.com',
    href: 'https://imylonwason.com',
    purpose: 'The UnWilling Affiliate',
    description: 'Discover Channel Partner opportunities through An Affiliate Life (AAL).',
  },
]

const STATS = [
  { num: '40+', label: 'Years of enterprise experience' },
  { num: '1988', label: 'Oderson Incorporated established, Barbados' },
  { num: '7', label: 'ODIECLOUD²π GeOS – Economic Centers' },
]

const PROFILE_ITEMS: { icon: IconName; label: string; value: string }[] = [
  { icon: 'flag', label: 'Nationality:', value: 'Barbadian' },
  { icon: 'pin', label: 'Operating Base:', value: 'Norrsken House, Kigali, Rwanda' },
  { icon: 'crane', label: 'Corporate Philosophy:', value: 'Engineering Enterprises™' },
  { icon: 'globe', label: 'Institutional Mission:', value: 'Digitizing Global Africa' },
  {
    icon: 'cap',
    label: 'Foundation Training:',
    value: 'Insurance Sales  Barbados Life Insurance',
  },
  { icon: 'building', label: 'Established:', value: 'Oderson Incorporated, Barbados, 1988' },
  {
    icon: 'karate',
    label: 'Karate:',
    value: '40+ years training & teaching · 6th Degree Black Belt',
  },
  { icon: 'tennis', label: 'Squash:', value: 'Playing since age 15' },
  { icon: 'pickleball', label: 'Pickleball:', value: 'Active for the past 3 years' },
]

const ECOSYSTEM_PILLS = [
  'ODIXA',
  'ODIEBOARD OrgOS',
  'ODIEXA',
  'AUREX',
  'AAL',
  'AUREON9',
  'Oπ INTELLIGENCE',
]

const TIMELINE = [
  {
    dot: '',
    year: 'Early 1980s',
    title: 'Insurance Sales Foundation',
    text: 'Barbados Life Insurance provided his first professional training  salesmanship, customer relationships, financial responsibility, and the foundations of professional discipline. Everything else was built on this.',
  },
  {
    dot: 'gold',
    year: '1988',
    title: 'Oderson Incorporated  Established',
    text: 'His first corporate milestone  establishing Oderson Incorporated in Barbados. The foundation for four decades of enterprise development across real estate, financial services, telecommunications, and international commerce.',
  },
  {
    dot: '',
    year: 'Ongoing',
    title: 'Multi-Sector Enterprise Development',
    text: 'Real estate · Insurance · Investment banking · Telecommunications retail · Merchant services · Network marketing · International commerce. Each sector added new competencies, new insights into capital, markets, and institutional development.',
  },
  {
    dot: 'gold',
    year: 'Present',
    title: 'ODIECLOUD²π  Digitizing Global Africa',
    text: 'The culmination: a Governed Economic Operating System (GeOS) designed to connect people, businesses, institutions, investors, and capital across Africa, the Caribbean, and the global African diaspora.',
  },
]

const GOVERNANCE_CHAIN: { label: string; style: CSSProperties }[] = [
  {
    label: 'Wason Family Sovereign Governance – WFSG',
    style: {
      background: 'rgba(255,255,255,.08)',
      borderRadius: 6,
      padding: '10px 14px',
      fontFamily: 'var(--font-d)',
      fontSize: '13.5px',
      fontWeight: 700,
      color: '#fff',
    },
  },
  {
    label: 'AGATHA TRUST',
    style: {
      background: 'rgba(201,149,46,.15)',
      border: '1px solid rgba(201,149,46,.3)',
      borderRadius: 6,
      padding: '10px 14px',
      fontFamily: 'var(--font-d)',
      fontSize: '13.5px',
      fontWeight: 700,
      color: 'var(--gold)',
    },
  },
  {
    label: 'Oderson Incorporated — Barbados',
    style: {
      background: 'rgba(0,130,201,.18)',
      border: '1px solid rgba(0,130,201,.45)',
      borderRadius: 6,
      padding: '10px 14px',
      fontFamily: 'var(--font-d)',
      fontSize: '13.5px',
      fontWeight: 700,
      color: '#4FC3F7',
    },
  },
  {
    label: 'ODIECLOUD²π GeOS – 7 Economic Centers',
    style: {
      background: 'rgba(255,255,255,.05)',
      borderRadius: 6,
      padding: '10px 14px',
      fontFamily: 'var(--font-d)',
      fontSize: '13.5px',
      fontWeight: 700,
      color: 'rgba(255,255,255,.7)',
    },
  },
]

const DISCIPLINES: { top: string; iconClass: string; icon: IconName; title: string; body: ReactNode }[] = [
  {
    top: 'gold-top',
    iconClass: 'ci-gold',
    icon: 'karate',
    title: 'Karate  40+ Years',
    body: (
      <>
        More than four decades of training and teaching karate. Holds the rank of{' '}
        <strong>Sixth-Degree Black Belt (6th Dan)</strong>. His extensive experience as both
        practitioner and instructor reflects a lifelong commitment to technical mastery,
        self-control, and the passing of knowledge to others.
      </>
    ),
  },
  {
    top: 'blue-top',
    iconClass: 'ci-blue',
    icon: 'tennis',
    title: 'Squash  Since Age 15',
    body: 'Playing squash since the age of 15  a sport that demands physical endurance, speed, precision, strategic thinking, and rapid decision-making. A lifelong sporting commitment that has remained an active part of his personal discipline for decades.',
  },
  {
    top: 'navy-top',
    iconClass: 'ci-navy',
    icon: 'pickleball',
    title: 'Pickleball  3 Years',
    body: 'Over the past three years, Wason has added pickleball to his sporting activities. His adoption of the sport reflects a characteristic willingness to embrace new challenges, develop new skills, and continue learning throughout life  at every stage of experience.',
  },
]

const DIVISIONS: { name: string; desc: string; gold?: boolean }[] = [
  { name: 'ODIEBOARD OrgOS', desc: 'Enterprise Architecture & Governance' },
  { name: 'ODIEXA', desc: 'Trade & Marketplace Infrastructure' },
  { name: 'AUREX', desc: 'Treasury & Capital Infrastructure' },
  { name: 'AUREON9', desc: 'Membership & Participation' },
  { name: 'AAL', desc: 'Enterprise Distribution Network' },
  { name: 'ODIXA', desc: 'Digital Identity & Access' },
  { name: 'Oπ Intelligence', desc: 'AI & Automation' },
  { name: 'BITTWOK', desc: 'Sovereign Digital Infrastructure', gold: true },
]

interface ContactRowDef {
  id: LinkId
  icon: IconName
  label: string
  blank?: boolean
}

const CONTACT_ROWS: ContactRowDef[] = [
  { id: 'contact-email', icon: 'mail', label: 'Email' },
  { id: 'contact-whatsapp', icon: 'chat', label: 'WhatsApp' },
  { id: 'contact-rwanda', icon: 'phone', label: 'Rwanda Mobile' },
  { id: 'contact-website', icon: 'globe', label: 'Website', blank: true },
  { id: 'contact-bio', icon: 'book', label: 'Biography', blank: true },
]

const MEETING_ROWS: ContactRowDef[] = [
  { id: 'contact-jitsi', icon: 'monitor', label: 'Virtual Office', blank: true },
  { id: 'contact-cal', icon: 'calendar', label: 'Book a Meeting', blank: true },
]

const FOOTER_SECTIONS = [
  { href: '#about', label: 'Biography' },
  { href: '#platforms', label: 'Digital Platforms' },
  { href: '#journey', label: 'Career Journey' },
  { href: '#disciplines', label: 'Disciplines' },
  { href: '#ecosystem', label: 'ODIECLOUD²π' },
  { href: '#contact', label: 'Connect' },
]

const FOOTER_EXTERNAL = [
  { href: 'https://odiecloud.com', label: 'odiecloud.com' },
  { href: 'https://iam.mylonwason.com', label: 'iam.mylonwason.com' },
  { href: 'https://mylonwason.com', label: 'mylonwason.com' },
  { href: 'https://imylonwason.com', label: 'imylonwason.com' },
  { href: 'https://www.linkedin.com/in/imylonwason/', label: 'LinkedIn' },
  { href: 'https://web.facebook.com/mylonwason', label: 'Facebook' },
]

const LINKEDIN_PATH =
  'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'

const FACEBOOK_PATH =
  'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'

const divisionStyle: CSSProperties = {
  background: 'rgba(255,255,255,.06)',
  border: '1px solid rgba(255,255,255,.1)',
  borderRadius: 'var(--r)',
  padding: 18,
  textAlign: 'center',
}

const divisionGoldStyle: CSSProperties = {
  background: 'rgba(201,149,46,.12)',
  border: '1px solid rgba(201,149,46,.25)',
  borderRadius: 'var(--r)',
  padding: 18,
  textAlign: 'center',
}

const centerLead: CSSProperties = { textAlign: 'center', margin: '0 auto 40px' }

/* ------------------------------------------------------------------ *
 * Components
 * ------------------------------------------------------------------ */

interface EditableLinkProps {
  id: LinkId
  links: Links
  blank?: boolean
  className?: string
  children?: ReactNode
  onEditClick: (e: MouseEvent<HTMLAnchorElement>, id: LinkId) => void
}

function EditableLink({
  id,
  links,
  blank,
  className,
  children,
  onEditClick,
}: EditableLinkProps) {
  const link = links[id]
  return (
    <a
      href={link.href}
      id={id}
      className={className}
      target={blank ? '_blank' : undefined}
      onClick={(e) => onEditClick(e, id)}
    >
      {children ?? link.text}
    </a>
  )
}

interface ContactRowProps extends ContactRowDef {
  links: Links
  onEditClick: (e: MouseEvent<HTMLAnchorElement>, id: LinkId) => void
}

function ContactRow({ id, icon, label, blank, links, onEditClick }: ContactRowProps) {
  return (
    <div className="contact-row">          <div className="contact-icon"><Icon name={icon} size={16} /></div>
      <div>
        <div className="contact-label">{label}</div>
        <div className="contact-val">
          <EditableLink
            id={id}
            links={links}
            blank={blank}
            className="editable-link"
            onEditClick={onEditClick}
          />
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [links] = useState<Links>(() => ({ ...DEFAULT_LINKS, ...readSavedLinks() }))

  const handleLinkClick = () => undefined

  return (
    <>
      {/* STRIP */}
      <div className="strip">
        <span>ODIECLOUD²π GeOS – Digitizing Global Africa into a Unified and Investable Marketplace</span>
      </div>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-inner">
          <a href="https://mylonwason.com/" className="nav-logo">
            <img className="logo-crest" src={crest} alt="Mylon Oderson WASON" />
            <div className="logo-text">
              <div className="logo-name">Mylon Oderson WASON</div>
            </div>
          </a>
          <div className="nav-right">
            <a className="nav-badge" href="https://odiecloud.com/" target="_blank">
              ODIECLOUD²π GeOS
            </a>
            <a href="#contact" className="btn btn-primary btn-sm">
              Connect
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="wrap">
          <div className="hero-inner">
            <div className="hero-left">
              <div className="hero-eyebrow">Official Biography</div>
              <h1>
                Mylon Oderson
                <br />
                <em>WASON</em>
              </h1>
              <p className="hero-sub">
                Barbadian entrepreneur, enterprise architect, and institutional leader. More than
                four decades of business development across three continents.
              </p>
              <p
                style={{
                  marginTop: 12,
                  marginBottom: 4,
                  color: '#fff',
                  fontFamily: 'var(--font-d)',
                  fontSize: '14.5px',
                  fontWeight: 700,
                  lineHeight: 1.55,
                }}
              >
                Connecting Global Africa, the Caribbean, and the Global Diaspora to Opportunities.
              </p>
              <div className="hero-titles">
                {HERO_TITLES.map((title) => (
                  <div className="hero-title-item" key={title}>
                    {title}
                  </div>
                ))}
              </div>
              <div className="hero-btns">
                <a href="#about" className="btn btn-gold btn-lg">
                  Read Biography
                </a>
                <a href="#contact" className="btn btn-outline-white btn-lg">
                  Connect with Mylon
                </a>
              </div>
            </div>
            <div>
              <div className="photo-card">
                <img
                  src={portrait}
                  alt="Mylon Oderson WASON — Chairman & CEO, Oderson Holdings Ltd."
                />
                <div className="photo-name-bar">
                  <div className="photo-name">Mylon Oderson WASON</div>
                  <div className="photo-tag">Chairman & CEO · Oderson Holdings Ltd.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS DARK */}
      <section className="sec sec-dark stats-section">
        <div className="wrap">
          <div className="stat-row">
            {STATS.map((stat) => (
              <div className="stat-box" key={stat.num}>
                <div className="stat-num">{stat.num}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="sec" id="about">
        <div className="wrap">
          <div className="feat-row">
            <div>
              <div className="eyebrow">About Mylon</div>
              <h2>From Barbados to Kigali  a self-built career spanning four decades</h2>
              <p className="lead">
                Mylon Oderson WASON is a Barbadian-born entrepreneur, international business
                development strategist, enterprise architect, and institutional leader with more
                than four decades of experience across insurance, financial services, real estate,
                technology, and international commerce.
              </p>
              <p
                style={{
                  marginTop: 18,
                  fontSize: '14px',
                  color: 'var(--fg-m)',
                  lineHeight: 1.72,
                }}
              >
                Through the ODIECLOUD²π Ecosystem, he is building bridges between people,
                businesses, institutions, and markets through Trade, Manufacturing, Technology,
                Tourism, Investment, Education, Entrepreneurship, and Career Opportunities.
              </p>
              <p
                style={{
                  marginTop: 10,
                  fontSize: '14px',
                  color: 'var(--fg-m)',
                  lineHeight: 1.72,
                }}
              >
                His mission is to digitize Global Africa into a unified, governed, and investable
                marketplace through the ODIECLOUD²π Ecosystem.
              </p>
              <blockquote className="pull">
                <strong>
                  "I became everything I needed to become because someone else needed my help
                  in that area."
                </strong>
              </blockquote>
              <p style={{ fontSize: '14px', color: 'var(--fg-m)', lineHeight: 1.7 }}>
                His professional journey is distinguished by an unconventional path. Beyond his
                foundational insurance sales training at Barbados Life Insurance, Wason had no
                formal entrepreneurial training, no prior business knowledge, and no mentor to guide
                him. Everything that followed was self-taught  driven by necessity, practical
                experience, and an enduring commitment to serving others.
              </p>
            </div>
            <div>
              <div
                style={{
                  background: 'var(--bg-alt)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--r-lg)',
                  padding: 28,
                }}
              >
                <div className="eyebrow" style={{ marginBottom: 16 }}>
                  Professional Profile
                </div>
                <div className="feat-list">
                  {PROFILE_ITEMS.map((item) => (
                    <div className="feat-item" key={item.label}>
                      <div className="feat-dot"><Icon name={item.icon} size={12} /></div>
                      <div className="feat-text">
                        <strong>{item.label}</strong> {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="trust-bar">
        <div className="wrap">
          <div className="trust-inner">
            <div className="trust-label">PART OF THE ODIECLOUD²π GeOS (Ecosystem)</div>
            <div className="pills">
              {ECOSYSTEM_PILLS.map((pill) => (
                <div className="pill" key={pill}>
                  {pill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* DIGITAL PLATFORMS */}
      <section className="sec platforms-section" id="platforms">
        <div className="wrap">
          <div className="eyebrow" style={{ textAlign: 'center' }}>
            My Digital Platforms
          </div>
          <h2 style={{ textAlign: 'center', marginBottom: 10 }}>
            Connect, lead, and discover opportunities
          </h2>
          <p className="lead" style={centerLead}>
            Three connected digital identities, each designed for a distinct purpose.
          </p>
          <div className="platform-grid">
            {DIGITAL_PLATFORMS.map((platform, index) => (
              <article className="platform-card" key={platform.href}>
                <div className="platform-card-top">
                  <span className="platform-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="platform-purpose">{platform.purpose}</span>
                </div>
                <h3 className="platform-domain">{platform.name}</h3>
                <p className="platform-description">{platform.description}</p>
                <a
                  className="platform-link"
                  href={platform.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit ${platform.name}`}
                >
                  Visit website <span aria-hidden="true">→</span>
                </a>
              </article>
            ))}
          </div>
          <p className="platform-motto">Connect • Collaborate • Trade • Invest • Grow</p>
        </div>
      </section>

      {/* JOURNEY TIMELINE */}
      <section className="sec sec-alt" id="journey">
        <div className="wrap">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 56,
              alignItems: 'start',
            }}
          >
            <div>
              <div className="eyebrow">Career Journey</div>
              <h2>Four decades of self-directed enterprise</h2>
              <p className="lead" style={{ marginBottom: 36 }}>
                No formal training. No prior blueprint. A career built entirely through necessity,
                observation, and an unwavering commitment to solving the problems of others.
              </p>
              <div className="timeline">
                {TIMELINE.map((item) => (
                  <div className="tl-item" key={item.title}>
                    <div className={item.dot ? `tl-dot ${item.dot}` : 'tl-dot'} />
                    <div className="tl-body">
                      <div className="tl-year">{item.year}</div>
                      <div className="tl-title">{item.title}</div>
                      <div className="tl-text">{item.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="eyebrow">Philosophy & Governance</div>
              <h2>Engineering Enterprises™</h2>
              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--fg-m)',
                  lineHeight: 1.72,
                  marginBottom: 24,
                }}
              >
                For Wason, an enterprise is more than a registered company. It requires coordinated
                governance, qualified people, technology, capital, operational procedures, market
                access, and accountable leadership  systematically designed and integrated.
              </p>

              <div
                style={{
                  background: 'linear-gradient(135deg,var(--navy) 0%,var(--navy-2) 100%)',
                  borderRadius: 'var(--r-lg)',
                  padding: 24,
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-d)',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '.12em',
                    color: 'rgba(255,255,255,.35)',
                    marginBottom: 14,
                  }}
                >
                  GOVERNANCE CHAIN
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {GOVERNANCE_CHAIN.map((step, i) => (
                    <Fragment key={step.label}>
                      {i > 0 && (
                        <div
                          style={{
                            textAlign: 'center',
                            fontSize: '16px',
                            color: 'rgba(255,255,255,.3)',
                          }}
                        >
                          ↓
                        </div>
                      )}
                      <div style={step.style}>{step.label}</div>
                    </Fragment>
                  ))}
                </div>
              </div>

              <div className="card blue-top">
                <h3>ODIEBOARD OrgOS</h3>
                <p>
                  The organizational operating system at the heart of the ecosystem  providing
                  structured governance, administration, and operational frameworks for
                  enterprises and institutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPORTS & DISCIPLINES */}
      <section className="sec" id="disciplines">
        <div className="wrap">
          <div className="eyebrow" style={{ textAlign: 'center' }}>
            Personal Disciplines
          </div>
          <h2 style={{ textAlign: 'center', marginBottom: 10 }}>
            Lifelong commitment to physical discipline and continuous learning
          </h2>
          <p className="lead" style={centerLead}>
            The same principles that built an entrepreneurial career  discipline, perseverance,
            adaptability, and a willingness to teach  run through four decades of martial arts
            practice and instruction.
          </p>
          <div className="card-grid-3">
            {DISCIPLINES.map((card) => (
              <div className={`card ${card.top}`} key={card.title}>
                <div className={`card-icon ${card.iconClass}`}>
                  <Icon name={card.icon} size={22} />
                </div>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ECOSYSTEM OVERVIEW */}
      <section className="sec sec-dark" id="ecosystem">
        <div className="wrap">
          <div className="eyebrow eyebrow-white" style={{ textAlign: 'center' }}>
            ODIECLOUD²π Ecosystem
          </div>
          <h2 className="white" style={{ textAlign: 'center', marginBottom: 10 }}>
            Seven economic centers. One governed economic operating system.
          </h2>
          <p className="lead white" style={centerLead}>
            Designed to connect people, businesses, institutions, and capital across Global Africa
            through a unified, governed commercial infrastructure.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
            {DIVISIONS.map((division) => (
              <div style={division.gold ? divisionGoldStyle : divisionStyle} key={division.name}>
                <div
                  style={{
                    fontFamily: 'var(--font-d)',
                    fontSize: '14px',
                    fontWeight: 800,
                    color: division.gold ? 'var(--gold)' : '#fff',
                    marginBottom: 5,
                  }}
                >
                  {division.name}
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,.45)' }}>
                  {division.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="sec sec-alt" id="contact">
        <div className="wrap">
          <div className="eyebrow" style={{ textAlign: 'center' }}>
            Connect
          </div>
          <h2 style={{ textAlign: 'center', marginBottom: 10 }}>Get in touch</h2>
          <p className="lead" style={centerLead}>
            For business enquiries, introductions, partnerships, and commercial engagements within
            the ODIECLOUD²π ecosystem.
          </p>
          <div className="contact-grid">
            <div className="contact-card">
              <h3>Contact Details</h3>
              {CONTACT_ROWS.map((row) => (
                <ContactRow
                  key={row.id}
                  {...row}
                  links={links}
                  onEditClick={handleLinkClick}
                />
              ))}
            </div>
            <div className="contact-card">
              <h3>Meetings & Virtual Office</h3>
              {MEETING_ROWS.map((row) => (
                <ContactRow
                  key={row.id}
                  {...row}
                  links={links}
                  onEditClick={handleLinkClick}
                />
              ))}
              <div style={{ marginTop: 20 }}>
                <div className="contact-label" style={{ marginBottom: 12 }}>
                  Social Media
                </div>
                <div className="social-row" style={{ marginTop: 8 }}>
                  <EditableLink
                    id="contact-linkedin"
                    links={links}
                    blank
                    className="social-btn"
                    onEditClick={handleLinkClick}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d={LINKEDIN_PATH} />
                    </svg>
                    {links['contact-linkedin'].text}
                  </EditableLink>
                  <EditableLink
                    id="contact-facebook"
                    links={links}
                    blank
                    className="social-btn"
                    onEditClick={handleLinkClick}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d={FACEBOOK_PATH} />
                    </svg>
                    {links['contact-facebook'].text}
                  </EditableLink>
                </div>
              </div>
              <div style={{ marginTop: 24, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <a
                  href="https://cal.com/mylonwason"
                  target="_blank"
                  className="btn btn-primary"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  <Icon name="calendar" size={16} />
                  Book a Meeting
                </a>
                <a
                  href="https://meet.jit.si/ODIECLOUD-Executive-Conference-20261110"
                  target="_blank"
                  className="btn btn-outline"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  <Icon name="monitor" size={16} />
                  Virtual Office
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="wrap">
          <div className="footer-inner">
            <div className="footer-brand">
              <div className="footer-logo">
                <img className="footer-crest" src={crest} alt="Wason Family Sovereign Governance crest" />
              </div>
            </div>
            <div className="footer-cols">
              <div className="footer-links">
                <h4>Sections</h4>
                {FOOTER_SECTIONS.map((link) => (
                  <a href={link.href} key={link.href}>
                    {link.label}
                  </a>
                ))}
              </div>
              <div className="footer-links">
                <h4>External</h4>
                {FOOTER_EXTERNAL.map((link) => (
                  <a href={link.href} target="_blank" key={link.href}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <a
              className="footer-badge-link"
              href="https://odieboard.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Powered by ODIEBOARD"
            >
              <img
                className="footer-badge"
                src={odieboardLogo}
                alt="Powered by ODIEBOARD"
                width="100"
                height="100"
              />
            </a>
          </div>
          <div className="footer-bottom">
            <div className="footer-legal">
              <div>© Copyright 2026 Mylon Oderson Wason. All rights reserved.</div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}