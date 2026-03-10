"use client";

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState("all");
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", service: "", message: "", files: [] as File[]
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: "Sarah M.",
      location: "Austin, TX",
      rating: 5,
      text: "Zachary transformed our living room with a flawless drywall repair after water damage. You can't even tell where the damage was — truly seamless work. Will hire again for every project!",
      project: "Drywall Repair & Texture Match",
    },
    {
      name: "James R.",
      location: "Round Rock, TX",
      rating: 5,
      text: "We had Tays Fix & Finish repaint our entire interior and the results were stunning. Clean lines, no drips, perfect color matching. Zachary is professional, punctual, and takes real pride in his craft.",
      project: "Full Interior Paint",
    },
    {
      name: "Lisa K.",
      location: "Cedar Park, TX",
      rating: 5,
      text: "From the estimate to the final walkthrough, everything was smooth and professional. The finish carpentry on our built-ins looks like it came from a custom cabinet shop. Incredible attention to detail.",
      project: "Finish Carpentry & Built-ins",
    },
    {
      name: "Mike & Dana T.",
      location: "Georgetown, TX",
      rating: 5,
      text: "Hired Zachary for handyman work and he ended up solving three other issues we hadn't even noticed. Honest, skilled, and fairly priced. He's our go-to for everything now.",
      project: "General Handyman",
    },
  ];

  const services = [
    {
      icon: "🪣",
      title: "Drywall & Texture",
      desc: "Seamless repairs, hang, tape, mud, and texture matching for any surface — ceilings, accent walls, water damage restoration.",
      items: ["Drywall Hang & Finish", "Texture Matching", "Hole & Crack Repair", "Water Damage Restoration"],
    },
    {
      icon: "🖌️",
      title: "Painting",
      desc: "Interior and exterior painting with meticulous prep, clean lines, and a flawless finish that lasts.",
      items: ["Interior Painting", "Exterior Painting", "Trim & Doors", "Cabinet Painting"],
    },
    {
      icon: "🔨",
      title: "Finish Carpentry",
      desc: "Custom trim, crown molding, baseboards, and built-ins crafted with precision and installed to perfection.",
      items: ["Crown Molding", "Baseboards & Trim", "Door & Window Casing", "Built-in Shelving"],
    },
    {
      icon: "🔧",
      title: "Handyman Services",
      desc: "From honey-do lists to small repairs — Zachary handles the jobs that need a skilled, reliable hand.",
      items: ["Fixture Installation", "Door & Hardware", "General Repairs", "Punch-out Work"],
    },
  ];

  const galleryItems = [
    { category: "drywall", label: "Drywall", title: "Seamless Texture Match", before: true },
    { category: "painting", label: "Painting", title: "Full Interior Repaint" },
    { category: "carpentry", label: "Carpentry", title: "Crown Molding Install" },
    { category: "drywall", label: "Drywall", title: "Water Damage Repair" },
    { category: "painting", label: "Painting", title: "Cabinet Refinish" },
    { category: "carpentry", label: "Carpentry", title: "Built-in Shelving" },
  ];

  const filteredGallery = galleryFilter === "all"
    ? galleryItems
    : galleryItems.filter((item) => item.category === galleryFilter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Inter', sans-serif", background: "#fefefe" }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        :root {
          --teal-dark: #2a4e51;
          --teal-med: #5f9798;
          --teal-bright: #55c7cb;
          --teal: #b7d7d8;
          --black: #1a1a1a;
          --white: #fefefe;
          --gray: #f4f4f4;
          --gray-dark: #546162;
          --gray-med: #acacac;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        .nav-link {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--gray-dark);
          text-decoration: none;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          transition: color 0.2s;
          cursor: pointer;
        }
        .nav-link:hover { color: var(--teal-med); }

        .btn-primary {
          background: var(--teal-dark);
          color: white;
          padding: 0.75rem 1.75rem;
          border-radius: 4px;
          font-weight: 600;
          font-size: 0.875rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          text-decoration: none;
          display: inline-block;
        }
        .btn-primary:hover { background: var(--teal-med); transform: translateY(-1px); }

        .btn-outline {
          background: transparent;
          color: var(--teal-dark);
          padding: 0.75rem 1.75rem;
          border-radius: 4px;
          font-weight: 600;
          font-size: 0.875rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          border: 2px solid var(--teal-dark);
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          display: inline-block;
        }
        .btn-outline:hover { background: var(--teal-dark); color: white; }

        .section-tag {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--teal-med);
          margin-bottom: 0.75rem;
        }

        .section-title {
          font-size: clamp(1.75rem, 4vw, 2.75rem);
          font-weight: 700;
          color: var(--black);
          line-height: 1.15;
        }

        .card-hover {
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.1);
        }

        .gallery-img {
          width: 100%;
          aspect-ratio: 4/3;
          object-fit: cover;
          background: var(--teal);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
        }

        .filter-btn {
          padding: 0.4rem 1rem;
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          border: 1.5px solid var(--teal-med);
          cursor: pointer;
          transition: all 0.2s;
          background: transparent;
          color: var(--teal-dark);
        }
        .filter-btn.active {
          background: var(--teal-dark);
          color: white;
          border-color: var(--teal-dark);
        }

        .star { color: #f59e0b; font-size: 1rem; }

        .testimonial-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--teal);
          border: none;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }
        .testimonial-dot.active {
          background: var(--teal-dark);
          transform: scale(1.3);
        }

        .form-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1.5px solid #e0e0e0;
          border-radius: 6px;
          font-size: 0.9375rem;
          color: var(--black);
          background: white;
          transition: border-color 0.2s;
          outline: none;
        }
        .form-input:focus { border-color: var(--teal-med); }

        .form-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--gray-dark);
          margin-bottom: 0.35rem;
          display: block;
        }

        .mobile-menu {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: white;
          z-index: 200;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .divider {
          width: 48px;
          height: 3px;
          background: var(--teal-med);
          border-radius: 2px;
          margin: 1rem 0 1.5rem;
        }

        @media (min-width: 768px) {
          .mobile-only { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-only { display: none !important; }
        }
      `}</style>

      {/* NAV */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(254,254,254,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "none",
        transition: "all 0.3s",
        padding: "0 2rem",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <img src="/TaysFixandFinish_Logo.png" alt="Tays Fix and Finish" style={{ height: 44, width: "auto" }} />
          </div>

          {/* Desktop Nav */}
          <nav className="desktop-only" style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            {["services", "work", "testimonials", "contact"].map((id) => (
              <span key={id} className="nav-link" onClick={() => scrollTo(id)}>
                {id === "work" ? "Our Work" : id.charAt(0).toUpperCase() + id.slice(1)}
              </span>
            ))}
            <button className="btn-primary" onClick={() => scrollTo("contact")} style={{ padding: "0.6rem 1.25rem" }}>
              Get a Quote
            </button>
          </nav>

          {/* Mobile Hamburger */}
          <button className="mobile-only" onClick={() => setMobileMenuOpen(true)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {[0,1,2].map(i => <div key={i} style={{ width: 24, height: 2, background: "var(--black)" }} />)}
            </div>
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <img src="/TaysFixandFinish_Logo.png" alt="Tays Fix and Finish" style={{ height: 40 }} />
            <button onClick={() => setMobileMenuOpen(false)}
              style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer" }}>✕</button>
          </div>
          <nav style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {["services", "work", "testimonials", "contact"].map((id) => (
              <span key={id} onClick={() => scrollTo(id)}
                style={{ fontSize: "1.25rem", fontWeight: 600, cursor: "pointer", color: "var(--black)" }}>
                {id === "work" ? "Our Work" : id.charAt(0).toUpperCase() + id.slice(1)}
              </span>
            ))}
          </nav>
          <button className="btn-primary" onClick={() => scrollTo("contact")} style={{ width: "100%", textAlign: "center", padding: "1rem" }}>
            Get a Free Quote
          </button>
        </div>
      )}

      {/* HERO */}
      <section style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, var(--teal-dark) 0%, #1d3a3d 40%, var(--teal-med) 100%)",
        display: "flex", alignItems: "center",
        position: "relative", overflow: "hidden",
        paddingTop: 72,
      }}>
        {/* Background texture */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.04) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(85,199,203,0.15) 0%, transparent 50%)",
        }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "4rem 2rem", position: "relative", zIndex: 1, width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
            {/* Left */}
            <div>
              <div style={{ display: "inline-block", background: "rgba(255,255,255,0.12)", borderRadius: 100, padding: "0.35rem 1rem", marginBottom: "1.5rem" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--teal-bright)" }}>
                  Austin, TX — Serving the Greater Area
                </span>
              </div>
              <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800, lineHeight: 1.1, color: "white", marginBottom: "1.5rem" }}>
                Quality Work.<br />
                <span style={{ color: "var(--teal-bright)" }}>Clean Finish.</span><br />
                Every Time.
              </h1>
              <p style={{ fontSize: "1.125rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: 480 }}>
                Zachary Tays brings craftsmanship and reliability to every job — from drywall and painting to finish carpentry and handyman work. No shortcuts. No excuses.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <button className="btn-primary" onClick={() => scrollTo("contact")}
                  style={{ background: "var(--teal-bright)", color: "var(--teal-dark)", fontSize: "1rem", padding: "0.875rem 2rem" }}>
                  Get a Free Quote
                </button>
                <button className="btn-outline" onClick={() => scrollTo("work")}
                  style={{ borderColor: "rgba(255,255,255,0.4)", color: "white", fontSize: "1rem", padding: "0.875rem 2rem" }}>
                  See Our Work
                </button>
              </div>
              {/* Stats */}
              <div style={{ display: "flex", gap: "2.5rem", marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.12)" }}>
                {[["100+", "Projects Done"], ["5★", "Avg. Rating"], ["10+", "Years Exp."]].map(([num, label]) => (
                  <div key={label}>
                    <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--teal-bright)" }}>{num}</div>
                    <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.55)", marginTop: 2 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Right — Logo Card */}
            <div className="desktop-only" style={{ display: "flex", justifyContent: "center" }}>
              <div style={{
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 24,
                padding: "3rem",
                textAlign: "center",
              }}>
                <img src="/TaysFixandFinish_Logo.png" alt="Tays Fix and Finish" style={{ width: 260, height: "auto" }} />
                <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {["📞 (512) 956-6541", "✉️ zach.tays@gmail.com", "📍 Austin, TX"].map(item => (
                    <div key={item} style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9375rem" }}>{item}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "6rem 2rem", background: "var(--gray)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p className="section-tag">What We Do</p>
            <h2 className="section-title">Our Services</h2>
            <div className="divider" style={{ margin: "1rem auto 0" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {services.map((svc) => (
              <div key={svc.title} className="card-hover" style={{
                background: "white", borderRadius: 12, padding: "2rem",
                border: "1px solid rgba(0,0,0,0.06)",
              }}>
                <div style={{ fontSize: "2.25rem", marginBottom: "1rem" }}>{svc.icon}</div>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--black)", marginBottom: "0.5rem" }}>{svc.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--gray-dark)", lineHeight: 1.65, marginBottom: "1.25rem" }}>{svc.desc}</p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  {svc.items.map(item => (
                    <li key={item} style={{ fontSize: "0.8125rem", color: "var(--teal-dark)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ color: "var(--teal-med)", fontWeight: 700 }}>—</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="work" style={{ padding: "6rem 2rem", background: "white" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem", marginBottom: "3rem" }}>
            <div>
              <p className="section-tag">Portfolio</p>
              <h2 className="section-title">Recent Work</h2>
              <div className="divider" />
            </div>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {["all", "drywall", "painting", "carpentry"].map(f => (
                <button key={f} className={`filter-btn ${galleryFilter === f ? "active" : ""}`}
                  onClick={() => setGalleryFilter(f)}>
                  {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
            {filteredGallery.map((item, i) => (
              <div key={i} className="card-hover" style={{
                borderRadius: 10, overflow: "hidden",
                border: "1px solid rgba(0,0,0,0.06)",
                background: "var(--gray)",
              }}>
                <div className="gallery-img" style={{
                  background: `hsl(${180 + i * 15}, 30%, ${75 + i * 3}%)`,
                  fontSize: "3rem", display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {item.category === "drywall" ? "🪣" : item.category === "painting" ? "🖌️" : "🔨"}
                </div>
                <div style={{ padding: "1rem 1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--black)" }}>{item.title}</span>
                    <span style={{
                      fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase",
                      letterSpacing: "0.08em", color: "var(--teal-med)",
                      background: "rgba(95,151,152,0.1)", padding: "0.2rem 0.6rem", borderRadius: 100,
                    }}>{item.label}</span>
                  </div>
                  <p style={{ fontSize: "0.8125rem", color: "var(--gray-dark)", marginTop: "0.3rem" }}>Austin, TX</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <p style={{ color: "var(--gray-dark)", fontSize: "0.9375rem" }}>
              Have a project in mind? <button onClick={() => scrollTo("contact")}
                style={{ background: "none", border: "none", color: "var(--teal-med)", fontWeight: 600, cursor: "pointer", textDecoration: "underline" }}>
                Let's talk.
              </button>
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" style={{ padding: "6rem 2rem", background: "var(--teal-dark)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--teal-bright)", marginBottom: "0.75rem" }}>
            What Clients Say
          </p>
          <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 700, color: "white", lineHeight: 1.15, marginBottom: "3.5rem" }}>
            Real Reviews From Real Homeowners
          </h2>

          {/* Testimonial Card */}
          <div style={{
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 16, padding: "3rem",
            transition: "opacity 0.3s",
          }}>
            <div style={{ display: "flex", justifyContent: "center", gap: "0.25rem", marginBottom: "1.5rem" }}>
              {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                <span key={i} className="star">★</span>
              ))}
            </div>
            <p style={{ fontSize: "1.125rem", color: "rgba(255,255,255,0.9)", lineHeight: 1.75, marginBottom: "2rem", fontStyle: "italic" }}>
              "{testimonials[activeTestimonial].text}"
            </p>
            <div>
              <p style={{ fontWeight: 700, color: "white" }}>{testimonials[activeTestimonial].name}</p>
              <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", marginTop: "0.2rem" }}>
                {testimonials[activeTestimonial].location} — {testimonials[activeTestimonial].project}
              </p>
            </div>
          </div>

          {/* Dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "2rem" }}>
            {testimonials.map((_, i) => (
              <button key={i} className={`testimonial-dot ${i === activeTestimonial ? "active" : ""}`}
                onClick={() => setActiveTestimonial(i)} />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "6rem 2rem", background: "var(--gray)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "4rem", alignItems: "start" }}>
            {/* Left */}
            <div>
              <p className="section-tag">Get In Touch</p>
              <h2 className="section-title">Request a Free Quote</h2>
              <div className="divider" />
              <p style={{ color: "var(--gray-dark)", lineHeight: 1.7, marginBottom: "2.5rem" }}>
                Tell us about your project and we'll get back to you within 24 hours with a detailed, no-obligation estimate.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {[
                  { icon: "📞", label: "Phone / Text", value: "(512) 956-6541", href: "tel:5129566541" },
                  { icon: "✉️", label: "Email", value: "zach.tays@gmail.com", href: "mailto:zach.tays@gmail.com" },
                  { icon: "📍", label: "Service Area", value: "Austin & Greater Area, TX" },
                ].map(({ icon, label, value, href }) => (
                  <div key={label} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 10,
                      background: "var(--teal)", display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "1.2rem", flexShrink: 0,
                    }}>{icon}</div>
                    <div>
                      <p style={{ fontSize: "0.8125rem", color: "var(--gray-med)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</p>
                      {href
                        ? <a href={href} style={{ color: "var(--teal-dark)", fontWeight: 600, textDecoration: "none" }}>{value}</a>
                        : <p style={{ color: "var(--teal-dark)", fontWeight: 600 }}>{value}</p>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div style={{ background: "white", borderRadius: 16, padding: "2.5rem", border: "1px solid rgba(0,0,0,0.06)" }}>
              {formSubmitted ? (
                <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                  <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>✅</div>
                  <h3 style={{ fontSize: "1.375rem", fontWeight: 700, color: "var(--black)", marginBottom: "0.75rem" }}>Message Sent!</h3>
                  <p style={{ color: "var(--gray-dark)", lineHeight: 1.65 }}>
                    Thanks for reaching out. Zachary will be in touch within 24 hours to discuss your project.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label className="form-label">Name *</label>
                      <input className="form-input" type="text" required placeholder="John Smith"
                        value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div>
                      <label className="form-label">Phone</label>
                      <input className="form-input" type="tel" placeholder="(512) 000-0000"
                        value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Email *</label>
                    <input className="form-input" type="email" required placeholder="you@email.com"
                      value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                  <div>
                    <label className="form-label">Service Needed</label>
                    <select className="form-input"
                      value={formData.service} onChange={e => setFormData({ ...formData, service: e.target.value })}>
                      <option value="">Select a service...</option>
                      <option>Drywall Repair / Installation</option>
                      <option>Texture Matching</option>
                      <option>Interior Painting</option>
                      <option>Exterior Painting</option>
                      <option>Finish Carpentry</option>
                      <option>Handyman Services</option>
                      <option>Multiple / Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Project Details *</label>
                    <textarea className="form-input" required rows={4}
                      placeholder="Describe your project — size, scope, any issues to know about..."
                      value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
                      style={{ resize: "vertical" }} />
                  </div>
                  <div>
                    <label className="form-label">Upload Photos (optional)</label>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      style={{
                        border: "2px dashed var(--teal)",
                        borderRadius: 8, padding: "1.5rem",
                        textAlign: "center", cursor: "pointer",
                        transition: "border-color 0.2s",
                      }}>
                      <p style={{ fontSize: "0.875rem", color: "var(--gray-dark)" }}>
                        📎 Click to attach photos of your project
                      </p>
                      {formData.files.length > 0 && (
                        <p style={{ fontSize: "0.8rem", color: "var(--teal-med)", marginTop: "0.5rem" }}>
                          {formData.files.length} file(s) selected
                        </p>
                      )}
                    </div>
                    <input ref={fileInputRef} type="file" multiple accept="image/*" style={{ display: "none" }}
                      onChange={e => setFormData({ ...formData, files: Array.from(e.target.files || []) })} />
                  </div>
                  <button type="submit" className="btn-primary"
                    style={{ width: "100%", textAlign: "center", padding: "1rem", fontSize: "1rem" }}>
                    Send My Request →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "var(--black)", padding: "3rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <img src="/TaysFixandFinish_Logo.png" alt="Tays Fix and Finish" style={{ height: 40, filter: "brightness(0) invert(1)" }} />
            </div>
            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
              {["services", "work", "testimonials", "contact"].map(id => (
                <span key={id} onClick={() => scrollTo(id)}
                  style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.5)", cursor: "pointer", textTransform: "capitalize" }}
                  onMouseOver={e => (e.currentTarget.style.color = "white")}
                  onMouseOut={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}>
                  {id === "work" ? "Our Work" : id.charAt(0).toUpperCase() + id.slice(1)}
                </span>
              ))}
            </div>
            <div style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.35)" }}>
              © {new Date().getFullYear()} Tays Fix & Finish. Austin, TX.
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: "2rem", paddingTop: "1.5rem", textAlign: "center" }}>
            <a href="tel:5129566541" style={{ color: "var(--teal-bright)", fontSize: "1.125rem", fontWeight: 700, textDecoration: "none" }}>
              (512) 956-6541
            </a>
            <span style={{ color: "rgba(255,255,255,0.3)", margin: "0 1rem" }}>·</span>
            <a href="mailto:zach.tays@gmail.com" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9375rem", textDecoration: "none" }}>
              zach.tays@gmail.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
