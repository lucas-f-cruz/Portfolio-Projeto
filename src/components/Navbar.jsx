// ============================================================
//  COMPONENTE: Navbar
//  Barra de navegação com logo e links. Fica fixa no topo
//  e muda de estilo ao rolar a página.
// ============================================================
import { NAV_LINKS, PERFIL } from "../data/conteudo";
import { TEMA } from "../styles/tema";
import "../styles/Navbar.css";

export function Navbar({ scrolled, menuOpen, setMenuOpen, active, onNavigate }) {
  const G = TEMA.verde;
  const primeiroNome = PERFIL.nome.split(" ")[0];

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 64,
        background: scrolled ? "rgba(13,27,42,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${TEMA.azulBorda}` : "none",
        transition: "all 0.3s ease",
        padding: "0 5%", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo — estilo prompt de terminal */}
        <button onClick={() => onNavigate("hero")} style={{
          background: "none", border: "none", cursor: "pointer",
          fontFamily: TEMA.fonteDisplay, fontSize: 20, color: G, letterSpacing: 2,
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <span style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 26, height: 26, borderRadius: 6,
            background: TEMA.azulMedio, border: `1px solid ${TEMA.azulBorda}`,
            fontSize: 13, color: G,
          }}>&gt;_</span>
          {primeiroNome}<span style={{ color: TEMA.branco }}>.dev</span>
          <span className="logo-cursor" style={{
            display: "inline-block", width: 2, height: 16,
            background: G, animation: "logoBlink 1s ease infinite",
          }} />
        </button>

        <style>{`
          @keyframes logoBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        `}</style>

        {/* Links desktop */}
        <div
          className="nav-desktop"
        >
          {NAV_LINKS.map(({ label, id }) => (
            <button key={id} onClick={() => onNavigate(id)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: TEMA.fonteTitulo, fontSize: 13, letterSpacing: 1,
                color: active === id ? G : TEMA.cinza,
                transition: "color 0.2s",
                position: "relative",
              }}
              onMouseEnter={e => { if (active !== id) e.currentTarget.style.color = G; }}
              onMouseLeave={e => { if (active !== id) e.currentTarget.style.color = TEMA.cinza; }}
            >{label}</button>
          ))}
          <button onClick={() => onNavigate("contato")} style={{
            background: "transparent", color: G, border: `1px solid ${G}`,
            cursor: "pointer", padding: "8px 20px",
            fontFamily: TEMA.fonteTitulo, fontSize: 13, letterSpacing: 1,
            transition: "background 0.2s, color 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = G; e.currentTarget.style.color = TEMA.azul; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = G; }}
          >Contato</button>
        </div>

        {/* Hamburguer */}
        <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: G,
          fontSize: 28,
          padding: 0,
        }}>☰</button>
      </nav>

      {/* Menu mobile */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 64, left: 0, right: 0, zIndex: 99,
          background: TEMA.azulMedio, borderBottom: `1px solid ${TEMA.azulBorda}`,
          padding: "1.5rem 5%", display: "flex", flexDirection: "column", gap: 16,
        }}>
          {NAV_LINKS.map(({ label, id }) => (
            <button key={id} onClick={() => onNavigate(id)} style={{
              background: "none", border: "none", cursor: "pointer", textAlign: "left",
              fontFamily: TEMA.fonteTitulo, fontSize: 18,
              color: active === id ? G : TEMA.branco,
            }}>{label}</button>
          ))}
        </div>
      )}
    </>
  );
}