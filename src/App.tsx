import { FormEvent, useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  Building2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  HardHat,
  HeartHandshake,
  House,
  KeyRound,
  Mail,
  MapPin,
  Menu,
  PanelTop,
  Phone,
  Sparkles,
  Star,
  X,
} from 'lucide-react';

const galleryImages = [
  { src: '/images/gallery/IMG_7748.jpeg', alt: 'Freshly detailed open-plan kitchen and living room' },
  { src: '/images/gallery/IMG_7867.jpeg', alt: 'Polished bathroom with illuminated mirrors' },
  { src: '/images/gallery/IMG_7907.jpeg', alt: 'Immaculate modern kitchen with dark cabinetry' },
  { src: '/images/gallery/IMG_7910.jpeg', alt: 'Bright kitchen and dining area after cleaning' },
  { src: '/images/gallery/IMG_7911.jpeg', alt: 'Elegant living room ready to enjoy' },
  { src: '/images/gallery/IMG_7912.jpeg', alt: 'Contemporary bathroom with freestanding bath' },
  { src: '/images/gallery/IMG_7868.jpeg', alt: 'Sparkling clean glass with crystal-clear reflections' },
  { src: '/images/gallery/IMG_7917.jpeg', alt: 'Detailed bathroom finish' },
];

const servicePages = {
  '/services/residential-cleaning': {
    number: '01', path: '/services/residential-cleaning', title: 'Residential cleaning', cardText: 'A thoughtful clean for the home you live in, from regular resets to detailed one-off visits.', icon: House,
    audience: 'For homeowners and renters', eyebrow: 'Home cleaning, done properly', heroTitle: 'A cleaner home, with more room for living.',
    intro: 'Reliable, detail-led residential cleaning for homeowners and renters who want their space to feel cared for without adding another task to the week.',
    image: '/images/gallery/IMG_7911.jpeg', imageAlt: 'Bright, beautifully maintained residential living room', imageCaption: 'A calm finish, room by room.',
    audienceTitle: 'A regular reset that fits your life.', audienceCopy: 'Whether you need a weekly rhythm, a fortnightly refresh or a deeper seasonal clean, we work around your home and your routine. Our team brings a consistent standard to kitchens, bathrooms, living areas and bedrooms, with care taken around the details that make a space feel finished.',
    outcomes: ['A consistent clean you can rely on', 'Careful attention to high-touch surfaces', 'A service shaped around your home and preferences'],
    includedTitle: 'What we take care of', included: ['Kitchen surfaces, splashbacks and appliance fronts', 'Bathrooms, showers, mirrors and polished fixtures', 'Dusting, vacuuming and mopping throughout', 'Bedrooms, living spaces and high-touch areas', 'A final detail check before we leave'],
    process: ['Tell us about your home and preferred frequency', 'We confirm the right service for your space', 'Your cleaner arrives with a clear plan and attention to detail'],
    ctaTitle: 'Make the weekly reset the easy part.', ctaText: 'Tell us what your home needs and we will build a cleaning service that feels simple, consistent and genuinely useful.',
    seoTitle: 'Residential Cleaning Services | Innovative Cleaning', seoDescription: 'Premium residential cleaning for homeowners and renters. Book a reliable, detail-led home cleaning service with Innovative Cleaning.'
  },
  '/services/commercial-industrial-cleaning': {
    number: '02', path: '/services/commercial-industrial-cleaning', title: 'Commercial & industrial cleaning', cardText: 'Professional cleaning programs for workplaces, facilities, retail spaces and operational sites.', icon: Building2,
    audience: 'For business owners and facilities teams', eyebrow: 'Workplace and facility cleaning', heroTitle: 'A cleaner workplace performs better.',
    intro: 'Professional commercial and industrial cleaning that supports your team, protects your presentation and keeps your site ready for business.',
    image: '/images/gallery/IMG_7907.jpeg', imageAlt: 'Clean modern kitchen and commercial-style interior', imageCaption: 'Professional standards, built into your routine.',
    audienceTitle: 'A cleaning partner for the way your business works.', audienceCopy: 'Your workplace has its own operating hours, access requirements, risk profile and customer expectations. We build practical cleaning programs around those realities, with clear communication and a dependable standard across offices, retail, shared facilities and industrial environments.',
    outcomes: ['Cleaning schedules built around your operating hours', 'A consistent presentation for staff, customers and visitors', 'Clear communication for managers and site contacts'],
    includedTitle: 'Services for working environments', included: ['Office, reception and common area cleaning', 'Retail, showroom and customer-facing spaces', 'Amenities, kitchens and staff areas', 'Hard floors, high-touch points and shared surfaces', 'Site-specific recurring programs and periodic deep cleans'],
    process: ['We walk through your site and understand the operating needs', 'You receive a practical scope and recommended schedule', 'Our team works to the agreed program with regular communication'],
    ctaTitle: 'Give your site a standard you can measure.', ctaText: 'Talk to us about your premises, hours and priorities. We will help you shape a commercial cleaning program that works in the real world.',
    seoTitle: 'Commercial & Industrial Cleaning | Innovative Cleaning', seoDescription: 'Commercial and industrial cleaning for business owners, workplaces, facilities and retail sites. Build a dependable cleaning program with Innovative Cleaning.'
  },
  '/services/post-construction-cleaning': {
    number: '03', path: '/services/post-construction-cleaning', title: 'Post construction cleaning', cardText: 'A detailed builders clean that takes a new space from construction dust to ready for handover.', icon: HardHat,
    audience: 'For builders, developers and trades', eyebrow: 'From build site to handover', heroTitle: 'The final detail that makes the build feel complete.',
    intro: 'Post construction cleaning for builders who need a new project presented properly, from first builders clean through to final handover detail.',
    image: '/images/gallery/IMG_7748.jpeg', imageAlt: 'Freshly finished modern interior ready for handover', imageCaption: 'The handover starts with the finish.',
    audienceTitle: 'A handover-ready finish, without holding up the program.', audienceCopy: 'Construction leaves behind more than visible dust. We work through the fine residue, labels, protective film, marks and detail build-up that can stop a finished project from looking finished. Our approach is careful around new surfaces and coordinated around your site milestones.',
    outcomes: ['A more presentable handover for clients and buyers', 'Careful detail work across new surfaces and fixtures', 'A cleaning scope aligned to your build schedule'],
    includedTitle: 'Our post-build detail includes', included: ['Removal of construction dust and fine residue', 'Internal glass, frames, tracks and window detailing', 'Kitchen cabinetry, appliances and benchtops', 'Bathrooms, tiles, grout, fixtures and mirrors', 'Floor vacuuming, mopping and final presentation detail'],
    process: ['We review the site stage, access and handover deadline', 'The scope is planned around trades and remaining works', 'We complete the clean and return for agreed final details'],
    ctaTitle: 'Finish strong. Hand over with confidence.', ctaText: 'Share your project stage and target handover date. We will help plan the final clean around the details your client will notice.',
    seoTitle: 'Post Construction Cleaning for Builders | Innovative Cleaning', seoDescription: 'Detailed post construction and builders cleaning for new homes, developments and commercial projects. Prepare your build for handover with Innovative Cleaning.'
  },
  '/services/pre-sale-cleaning': {
    number: '04', path: '/services/pre-sale-cleaning', title: 'Pre sale cleaning', cardText: 'Presentation-focused cleaning that helps homeowners and real estate teams prepare a property for market.', icon: KeyRound,
    audience: 'For homeowners and real estate companies', eyebrow: 'Prepare the property for its next chapter', heroTitle: 'Make the first impression feel effortless.',
    intro: 'Pre sale cleaning that helps a property photograph beautifully, present confidently at open homes and feel ready for its next owner.',
    image: '/images/gallery/IMG_7873.jpeg', imageAlt: 'Bright, polished living space prepared for a property viewing', imageCaption: 'A home presented at its best.',
    audienceTitle: 'Presentation is part of the property story.', audienceCopy: 'Before the photographer arrives or the first buyer walks through, the property needs to feel light, fresh and well cared for. We focus on the details that show up in photos and viewings, helping homeowners and agents create a stronger sense of readiness without overcomplicating the campaign.',
    outcomes: ['A more polished presentation for photography and inspections', 'Attention to the details buyers notice first', 'Flexible scheduling around campaign deadlines'],
    includedTitle: 'Ready-for-market details', included: ['Kitchen and bathroom presentation cleaning', 'Glass, mirrors, fixtures and reflective surfaces', 'Dusting of skirting boards, ledges and feature areas', 'Floors, entrances and high-traffic zones', 'Final styling-friendly detail before photography or open home'],
    process: ['We confirm the campaign date and the property priorities', 'The clean is tailored to the way the home will be presented', 'We complete a final presentation check before handover'],
    ctaTitle: 'Put the best version of the property forward.', ctaText: 'Tell us when the photographer, stylist or first inspection is booked. We will work backwards from the deadline with a focused pre-sale clean.',
    seoTitle: 'Pre Sale Cleaning for Homes & Real Estate | Innovative Cleaning', seoDescription: 'Pre sale cleaning for homeowners, property sellers and real estate companies. Prepare your property for photography, inspections and open homes.'
  },
  '/services/ndis-cleaning': {
    number: '05', path: '/services/ndis-cleaning', title: 'NDIS cleaning', cardText: 'Respectful, participant-led cleaning support for self-managed participants and organisations.', icon: HeartHandshake,
    audience: 'For self-managed participants and support organisations', eyebrow: 'Cleaning support with dignity at the centre', heroTitle: 'Support that respects the person and the home.',
    intro: 'Thoughtful NDIS cleaning support for self-managed participants, families and organisations who value consistency, choice and respectful care.',
    image: '/images/gallery/IMG_7912.jpeg', imageAlt: 'Clean, accessible modern bathroom with thoughtful details', imageCaption: 'Respectful support, thoughtfully delivered.',
    audienceTitle: 'A service built around choice and familiarity.', audienceCopy: 'A home is personal. Our cleaning support is delivered with clear communication, respect for routines and an understanding that every participant has different priorities. We work with self-managed participants and organisations to create a practical service that supports wellbeing, comfort and independence.',
    outcomes: ['A consistent team and familiar service approach', 'Participant preferences treated as central to the clean', 'Clear communication for participants, families and organisations'],
    includedTitle: 'Support can include', included: ['Routine cleaning of kitchens, bathrooms and living spaces', 'Vacuuming, mopping and dusting to agreed priorities', 'High-touch and frequently used areas', 'Flexible attention to participant-led tasks', 'A clear service plan and respectful communication'],
    process: ['We listen to the participant, family or organisation first', 'We agree priorities, access and communication preferences', 'The service is delivered consistently and reviewed as needs change'],
    ctaTitle: 'Find a cleaning routine that feels supportive.', ctaText: 'Talk to us about the participant, the home and the support required. We will take the time to understand what a good service looks like for you.',
    seoTitle: 'NDIS Cleaning Support | Innovative Cleaning', seoDescription: 'Respectful NDIS cleaning support for self-managed participants, families and support organisations. Create a consistent service with Innovative Cleaning.'
  },
  '/services/window-cleaning': {
    number: '06', path: '/services/window-cleaning', title: 'Window cleaning', cardText: 'Clear, streak-free windows and detailed frames that bring more light back into the home.', icon: PanelTop,
    audience: 'For homeowners', eyebrow: 'Let more light in', heroTitle: 'Clear windows change the whole room.',
    intro: 'Professional window cleaning for homeowners who want brighter interiors, cleaner views and the careful finish that is difficult to achieve with a quick wipe.',
    image: '/images/gallery/IMG_7867.jpeg', imageAlt: 'Clean reflective bathroom windows and polished surfaces', imageCaption: 'The difference is in the details.',
    audienceTitle: 'More than glass, a complete window detail.', audienceCopy: 'Clean glass is only the beginning. We pay attention to the frames, sills, tracks and edges that collect dust and weathering, giving the whole window a fresher finish. Whether you are preparing for a special occasion or simply ready to see the view properly again, we make the process straightforward.',
    outcomes: ['Brighter rooms and clearer views', 'A careful finish across glass, frames and sills', 'A professional service without the weekend ladder work'],
    includedTitle: 'Window cleaning details', included: ['Internal and external glass cleaning', 'Frames, sills and accessible tracks', 'Removal of marks, dust and everyday build-up', 'Bathroom glass and reflective surfaces', 'A final check for streaks and missed edges'],
    process: ['We understand the number, type and access of your windows', 'You receive a clear scope for the requested areas', 'We clean, detail and check each window before we leave'],
    ctaTitle: 'Bring the light back into your home.', ctaText: 'Tell us about your windows and access. We will help you arrange a clear, careful window cleaning service for your home.',
    seoTitle: 'Professional Window Cleaning for Homes | Innovative Cleaning', seoDescription: 'Professional window cleaning for homeowners, including glass, frames, sills and accessible tracks. Enjoy brighter rooms and clearer views.'
  },
} as const;

type ServicePageData = (typeof servicePages)[keyof typeof servicePages];

const homeServices = Object.values(servicePages);

function getPathname(): string {
  const path = window.location.pathname.replace(/\/+$/, '');
  return path || '/';
}

function ServicesDropdown({ onNavigate }: { onNavigate: () => void }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="nav-dropdown" ref={dropdownRef} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button className="nav-dropdown-trigger" aria-expanded={open} onClick={() => setOpen(!open)}>
        Services <ChevronDown size={15} className={open ? 'chevron-open' : ''} />
      </button>
      <div className={open ? 'nav-dropdown-menu is-open' : 'nav-dropdown-menu'}>
        {homeServices.map((item) => { const Icon = item.icon; return <a href={item.path} key={item.path} onClick={onNavigate}><Icon size={17} strokeWidth={1.5} /><span>{item.title}</span><ArrowUpRight size={14} /></a>; })}
      </div>
    </div>
  );
}

function ServiceHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Innovative Cleaning home" onClick={closeMenu}>
        <img className="brand-logo" src="/logo.svg" alt="Innovative Cleaning" />
      </a>
      <button className="menu-toggle" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'}>
        <ServicesDropdown onNavigate={closeMenu} />
        <a href="/#about" onClick={closeMenu}>Our approach</a>
        <a href="/#gallery" onClick={closeMenu}>Gallery</a>
        <a href="/#contact" className="nav-cta" onClick={closeMenu}>Request a quote <ArrowUpRight size={16} /></a>
      </nav>
    </header>
  );
}

function ServicePage({ service }: { service: ServicePageData }) {
  useEffect(() => {
    const description = document.querySelector('meta[name="description"]');
    const previousTitle = document.title;
    const previousDescription = description?.getAttribute('content');
    document.title = service.seoTitle;
    description?.setAttribute('content', service.seoDescription);
    return () => {
      document.title = previousTitle;
      if (previousDescription) description?.setAttribute('content', previousDescription);
    };
  }, [service]);

  return (
    <div className="site-shell service-page-shell">
      <ServiceHeader />
      <main>
        <section className="service-hero section-pad">
          <div className="service-hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> {service.eyebrow}</p>
            <p className="service-audience">{service.audience}</p>
            <h1>{service.heroTitle}</h1>
            <p className="service-hero-intro">{service.intro}</p>
            <a className="button button-primary" href="/#contact">Request a quote <ArrowUpRight size={18} /></a>
          </div>
          <div className="service-hero-image"><img src={service.image} alt={service.imageAlt} /><span>{service.imageCaption}</span></div>
        </section>

        <section className="service-audience-section section-pad">
          <div className="service-section-label"><span>{service.number}</span><span>{service.audience}</span></div>
          <div className="service-audience-grid"><h2>{service.audienceTitle}</h2><p>{service.audienceCopy}</p></div>
          <div className="service-outcomes">{service.outcomes.map((outcome) => <div key={outcome}><CircleCheck size={19} /><span>{outcome}</span></div>)}</div>
        </section>

        <section className="service-details section-pad">
          <div className="service-details-heading"><p className="eyebrow"><span className="eyebrow-line" /> The detail</p><h2>{service.includedTitle}</h2></div>
          <div className="service-details-content"><ul>{service.included.map((item) => <li key={item}><CircleCheck size={17} /><span>{item}</span></li>)}</ul><div className="service-process"><p className="eyebrow"><span className="eyebrow-line" /> How it works</p>{service.process.map((step, index) => <div className="service-step" key={step}><span>0{index + 1}</span><p>{step}</p></div>)}</div></div>
        </section>

        <section className="service-cta section-pad" id="service-contact"><div><p className="eyebrow light-eyebrow"><span className="eyebrow-line" /> {service.title}</p><h2>{service.ctaTitle}</h2><p>{service.ctaText}</p></div><a className="button button-light" href="/#contact">Start a conversation <ArrowUpRight size={18} /></a></section>
      </main>
      <footer className="site-footer"><a className="brand footer-brand" href="/"><img className="brand-logo" src="/logo-light.svg" alt="Innovative Cleaning" /></a><div className="footer-contact"><a href="mailto:jacob_bell15@outlook.com"><Mail size={16} /> jacob_bell15@outlook.com</a><a href="tel:+61000000000"><Phone size={16} /> Enquire by phone</a><span><MapPin size={16} /> Serving homes and businesses across Australia</span></div><div className="footer-bottom"><span>© 2025 Innovative Cleaning. All rights reserved.</span><a href="https://www.itscold.com.au" target="_blank" rel="noreferrer">Website by Go Polar</a><a href="/">Back to home</a></div></footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Service', name: service.title, serviceType: service.title, description: service.seoDescription, provider: { '@type': 'LocalBusiness', name: 'Innovative Cleaning', url: 'https://www.innovativecleaning.com.au/' }, areaServed: { '@type': 'Country', name: 'Australia' } }) }} />
    </div>
  );
}

function App() {
  const [pathname, setPathname] = useState(getPathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const handlePopState = () => setPathname(getPathname());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeImage !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [activeImage]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (activeImage === null) return;
      if (event.key === 'Escape') setActiveImage(null);
      if (event.key === 'ArrowRight') setActiveImage((activeImage + 1) % galleryImages.length);
      if (event.key === 'ArrowLeft') setActiveImage((activeImage - 1 + galleryImages.length) % galleryImages.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImage]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError('');
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setFormStatus('error');
      setFormError('The enquiry form is not connected yet. Please email us directly while the form is being configured.');
      return;
    }
    setFormStatus('sending');
    const form = event.currentTarget;
    const data = new FormData(form);
    data.append('access_key', accessKey);
    data.append('subject', 'New enquiry from Innovative Cleaning');
    data.append('from_name', 'Innovative Cleaning website');
    try {
      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data });
      const result: { success?: boolean; message?: string } = await response.json();
      if (!response.ok || result.success !== true) throw new Error(result.message || 'Submission failed');
      setFormStatus('success');
      form.reset();
    } catch {
      setFormStatus('error');
      setFormError('We could not send your enquiry. Please try again or email us directly.');
    }
  };

  const closeMenu = () => setMenuOpen(false);
  const service = servicePages[pathname as keyof typeof servicePages];
  if (service) return <ServicePage service={service} />;

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Innovative Cleaning home" onClick={closeMenu}><img className="brand-logo" src="/logo.svg" alt="Innovative Cleaning" /></a>
        <button className="menu-toggle" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={24} /> : <Menu size={24} />}</button>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'}><ServicesDropdown onNavigate={closeMenu} /><a href="#about" onClick={closeMenu}>Our approach</a><a href="#gallery" onClick={closeMenu}>Gallery</a><a href="#contact" className="nav-cta" onClick={closeMenu}>Request a quote <ArrowUpRight size={16} /></a></nav>
      </header>

      <main id="top">
        <section className="hero section-pad"><div className="hero-copy"><p className="eyebrow"><span className="eyebrow-line" /> A better kind of clean</p><h1>All things cleaning,<br /><em>under one roof.</em></h1><p className="hero-intro">From homes to high-end commercial spaces, we bring a meticulous eye, a calm approach, and a finish you can feel.</p><div className="hero-actions"><a className="button button-primary" href="#contact">Book a clean <ArrowUpRight size={18} /></a><a className="text-link" href="#gallery">See our work <ChevronDown size={17} /></a></div><div className="trust-row"><div className="stars" aria-label="Five star service"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div><span>Thoughtful service. Beautiful results.</span></div></div><ContactForm formStatus={formStatus} formError={formError} setFormStatus={setFormStatus} setFormError={setFormError} onSubmit={handleSubmit} /></section>
        <section className="marquee" aria-label="Our promise"><div>Detail is everything <span>✦</span> Detail is everything <span>✦</span> Detail is everything <span>✦</span></div></section>
        <section className="services section-pad" id="services"><div className="section-heading"><div><p className="eyebrow"><span className="eyebrow-line" /> What we do</p><h2>A considered clean,<br /><em>every time.</em></h2></div><p className="section-note">Specialist cleaning for homes, businesses, new builds, support services and property campaigns.</p></div><div className="service-grid">{homeServices.map((item) => { const Icon = item.icon; return <a className="service-card" href={item.path} key={item.path}><div className="service-top"><span>{item.number}</span><Icon size={25} strokeWidth={1.5} /></div><h3>{item.title}</h3><p>{item.cardText}</p><span className="circle-link" aria-hidden="true"><ArrowUpRight size={18} /></span></a>; })}</div></section>
        <section className="about section-pad" id="about"><div className="about-image"><img src="/images/gallery/IMG_7907.jpeg" alt="Immaculate modern kitchen with dark cabinetry and polished surfaces" /><span>01 / 02</span></div><div className="about-copy"><p className="eyebrow"><span className="eyebrow-line" /> Our approach</p><h2>Clean lines.<br /><em>Clear mind.</em></h2><p>We believe the best cleaning is the kind you notice without seeing. It&apos;s the quiet confidence of a fresh space, the light on a polished surface, the feeling that everything is exactly where it should be.</p><p>Our team is detail-led, respectful of your home, and committed to doing things properly. No rushed checklists. No shortcuts. Just a better standard, from the first room to the last.</p><a className="text-link dark-link" href="#contact">Meet your new favourite cleaners <ArrowUpRight size={17} /></a></div></section>
        <section className="gallery section-pad" id="gallery"><div className="section-heading gallery-heading"><div><p className="eyebrow"><span className="eyebrow-line" /> The finish</p><h2>Good spaces<br /><em>feel different.</em></h2></div><p className="section-note">A glimpse at the kind of spaces we love to leave behind. Tap any image to take a closer look.</p></div><div className="gallery-grid">{galleryImages.map((image, index) => <button className="gallery-item" key={image.src} onClick={() => setActiveImage(index)} aria-label={`Open image: ${image.alt}`}><img src={image.src} alt={image.alt} loading="lazy" /><span className="gallery-hover"><ArrowUpRight size={20} /></span></button>)}</div></section>
        <section className="contact-section section-pad" id="contact"><div className="contact-intro"><p className="eyebrow"><span className="eyebrow-line" /> Let&apos;s talk</p><h2>Your home,<br /><em>beautifully cared for.</em></h2><p>Whether you need a regular reset, a one-off deep clean, or help getting ready for a move, we&apos;d love to hear from you.</p><div className="contact-details"><a href="mailto:jacob_bell15@outlook.com"><Mail size={18} /> jacob_bell15@outlook.com</a><a href="tel:+61000000000"><Phone size={18} /> Enquire by phone</a><span><MapPin size={18} /> Serving homes across Australia</span></div></div><ContactForm formStatus={formStatus} formError={formError} setFormStatus={setFormStatus} setFormError={setFormError} onSubmit={handleSubmit} /></section>
        <section className="final-cta section-pad"><div><p className="eyebrow light-eyebrow"><span className="eyebrow-line" /> Ready when you are</p><h2>A fresh start is<br /><em>one message away.</em></h2></div><a className="button button-light" href="#contact">Request a quote <ArrowUpRight size={18} /></a></section>
      </main>
      <footer className="site-footer"><a className="brand footer-brand" href="#top"><img className="brand-logo" src="/logo-light.svg" alt="Innovative Cleaning" /></a><div className="footer-contact"><a href="mailto:jacob_bell15@outlook.com"><Mail size={16} /> jacob_bell15@outlook.com</a><a href="tel:+61000000000"><Phone size={16} /> Enquire by phone</a></div><div className="footer-bottom"><span>© 2025 Innovative Cleaning. All rights reserved.</span><a href="https://www.itscold.com.au" target="_blank" rel="noreferrer">Website by Go Polar</a><a href="#top" aria-label="Back to top">Back to top ↑</a></div></footer>
      {activeImage !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer" onClick={() => setActiveImage(null)}><button className="lightbox-close" onClick={() => setActiveImage(null)} aria-label="Close image viewer"><X size={24} /></button><button className="lightbox-arrow lightbox-prev" onClick={(event) => { event.stopPropagation(); setActiveImage((activeImage - 1 + galleryImages.length) % galleryImages.length); }} aria-label="Previous image"><ChevronLeft size={28} /></button><img src={galleryImages[activeImage].src} alt={galleryImages[activeImage].alt} onClick={(event) => event.stopPropagation()} /><button className="lightbox-arrow lightbox-next" onClick={(event) => { event.stopPropagation(); setActiveImage((activeImage + 1) % galleryImages.length); }} aria-label="Next image"><ChevronRight size={28} /></button></div>}
    </div>
  );
}

function ContactForm({ formStatus, formError, setFormStatus, setFormError, onSubmit }: { formStatus: 'idle' | 'sending' | 'success' | 'error'; formError: string; setFormStatus: (status: 'idle' | 'sending' | 'success' | 'error') => void; setFormError: (message: string) => void; onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {
  return <div className="hero-form-wrap"><div className="form-kicker"><Sparkles size={16} /> Let&apos;s get started</div><h2>Tell us about your space.</h2><p>Share a few details and we&apos;ll be in touch to arrange your tailored quote.</p>{formStatus === 'success' ? <div className="success-panel"><CircleCheck size={28} /><strong>Thanks, we&apos;ve got it.</strong><span>We&apos;ll be in touch shortly.</span><button className="text-link" onClick={() => { setFormError(''); setFormStatus('idle'); }}>Send another enquiry</button></div> : <form onSubmit={onSubmit}><div className="form-grid"><label><span>Name</span><input name="name" type="text" placeholder="Your name" required /></label><label><span>Phone</span><input name="phone" type="tel" placeholder="0400 000 000" required /></label></div><label><span>Email</span><input name="email" type="email" placeholder="you@email.com" required /></label><label><span>How can we help?</span><textarea name="message" placeholder="Tell us about your home or project" rows={3} required /></label><button className="button button-accent form-submit" disabled={formStatus === 'sending'}>{formStatus === 'sending' ? 'Sending...' : 'Request a quote'} <ArrowUpRight size={18} /></button>{formStatus === 'error' && <p className="form-error" role="alert">{formError}</p>}</form>}</div>;
}

export default App;
