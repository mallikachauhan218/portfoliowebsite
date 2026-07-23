import { useEffect, useRef, useState } from 'react';
import { FaLinkedin, FaLinkedinIn } from 'react-icons/fa';

const NAV_ITEMS = ['Home', 'About', 'Skills', 'Process', 'Projects', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      // Active section detection
      for (const id of ['home','about','skills','services','process','projects','contact']) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom > 120) { setActive(id); break; }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-logo">MC<span>.</span></div>

        <ul className="nav-links">
          {NAV_ITEMS.map(item => (
            <li key={item}>
              <a href={`#${item.toLowerCase()}`} className={active === item.toLowerCase() ? 'active' : ''}>
                {item}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          {/* <a href="#contact" className="nav-cta">
            Hire Me <span>↗</span>
          </a> */}
           <a href="https://www.linkedin.com/in/mallika-chauhan" className="nav-cta" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn size={20} /> 
           </a>
          <button
            className={`nav-toggle${menuOpen ? ' active' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`mobile-overlay${menuOpen ? ' open' : ''}`}>
        <div className="mobile-menu">
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              <span className="mobile-link-num">0{i + 1}</span>
              {item}
            </a>
          ))}
          <div className="mobile-social">
            <a href="https://www.linkedin.com/in/mallika-chauhan" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <a href="mailto:mallikachauhan2118@gmail.com">Email ↗</a>
          </div>
        </div>
      </div>
    </>
  );
}
