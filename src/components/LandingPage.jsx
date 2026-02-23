import React, { useEffect } from 'react';
import './LandingPage.css';

function LandingPage({ setCurrentPage }) {
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ cursor: 'pointer' }}>
          <div className="logo-icon">🦺</div>
          <span>WearAware</span>
        </div>
        <ul className="nav-links">
          <li><button onClick={() => setCurrentPage('about')}>ABOUT US</button></li>
          <li><button onClick={() => setCurrentPage('projects')}>OUR PROJECTS</button></li>
          <li><button onClick={() => setCurrentPage('expertise')}>EXPERTISE</button></li>
          <li><button onClick={() => setCurrentPage('contact')}>GET IN TOUCH</button></li>
        </ul>
      </nav>

      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-subtitle">BUILT AT THE SPEED OF SAFETY</div>
          <h1 className="hero-title">WORKPLACE'S<br />TOP NOTCH<br />SAFETY MONITOR</h1>
          <p className="hero-description">
            Revolutionizing workplace safety with AI-powered PPE detection and real-time compliance monitoring for construction sites and industrial facilities.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => setCurrentPage('login')}>GET STARTED</button>
            <button className="btn btn-secondary" onClick={(e) => handleSmoothScroll(e, '#features')}>LEARN MORE</button>
          </div>
        </div>
      </section>

      <section className="features fade-in" id="features">
        <div className="section-header">
          <div className="section-subtitle">WHAT WE OFFER</div>
          <h2 className="section-title">Automated Safety Compliance</h2>
          <p className="section-description">
            Cutting-edge AI technology that ensures your workplace maintains the highest safety standards
          </p>
        </div>
        <div className="features-grid">
          <FeatureCard icon="📸" title="Real-Time Detection"
            description="Instant PPE detection using advanced computer vision to identify helmets, vests, and safety gear in real-time." />
          <FeatureCard icon="📊" title="Compliance Reporting"
            description="Automated violation logging with comprehensive reports and analytics for better safety management." />
          <FeatureCard icon="🚨" title="Instant Alerts"
            description="Get immediate notifications when safety violations are detected, ensuring quick response times." />
          <FeatureCard icon="📱" title="Mobile Integration"
            description="Access from anywhere with our mobile-responsive platform. Monitor multiple sites simultaneously." />
          <FeatureCard icon="🔐" title="Secure Database"
            description="All violations and data are securely stored with Firebase, ensuring data integrity and privacy." />
          <FeatureCard icon="📈" title="Data Analytics"
            description="Gain insights with detailed analytics and trend reports to improve workplace safety protocols." />
        </div>
      </section>

      <section className="stats fade-in">
        <div className="stats-grid">
          <StatCard number="99.7%" label="Detection Accuracy" />
          <StatCard number="24/7" label="Monitoring Available" />
          <StatCard number="<2s" label="Processing Time" />
          <StatCard number="100+" label="Sites Protected" />
        </div>
      </section>

      <section className="cta fade-in" id="contact">
        <h2 className="cta-title">Ready to Enhance Workplace Safety?</h2>
        <p className="cta-description">
          Join leading companies using WearAware to maintain the highest safety standards and protect their workforce.
        </p>
        <button className="btn btn-primary" onClick={() => setCurrentPage('login')}>Get Started Today</button>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div>
            <div className="footer-brand">🦺 WearAware</div>
            <p className="footer-description">
              Advanced AI-powered PPE detection system for modern workplace safety management. Built by safety professionals, for safety professionals.
            </p>
          </div>
          <div>
            <h4 className="footer-title">Company</h4>
            <ul className="footer-links">
              <li><button onClick={() => setCurrentPage('about')}>About Us</button></li>
              <li><button onClick={() => {}}>Careers</button></li>
              <li><button onClick={() => {}}>Contact</button></li>
              <li><button onClick={() => {}}>Blog</button></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-title">Solutions</h4>
            <ul className="footer-links">
              <li><button onClick={() => {}}>Construction</button></li>
              <li><button onClick={() => {}}>Manufacturing</button></li>
              <li><button onClick={() => {}}>Warehousing</button></li>
              <li><button onClick={() => {}}>Enterprise</button></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-title">Support</h4>
            <ul className="footer-links">
              <li><button onClick={() => {}}>Documentation</button></li>
              <li><button onClick={() => {}}>Help Center</button></li>
              <li><button onClick={() => {}}>Privacy Policy</button></li>
              <li><button onClick={() => {}}>Terms of Service</button></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          © 2026 WearAware. All rights reserved. | Built by Group 4 - BSIT2-07
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  );
}

function StatCard({ number, label }) {
  return (
    <div className="stat">
      <div className="stat-number">{number}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default LandingPage;
