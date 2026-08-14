// ============================================================
//  PORTFÓLIO LUCAS CRUZ — APP PRINCIPAL
//
//  Para editar conteúdo:  src/data/conteudo.js
//  Para editar cores:     src/styles/tema.js
//  Para editar seções:    src/components/<NomeSection>.jsx
// ============================================================
import { useState, useEffect } from "react";
import { TEMA } from "./styles/tema";
import { SmoothScroll } from "./hooks/SmoothScroll";
import { useLenis } from "./hooks/lenisContext";

import { Navbar } from "./components/Navbar";
import { CustomCursor } from "./components/CustomCursor";
import { HeroSection } from "./components/HeroSection";
import { SkillsSection } from "./components/SkillsSection";
import { ExperienciaSection } from "./components/ExperienciaSection";
import { FormacaoSection } from "./components/FormacaoSection";
import { ProjetosSection } from "./components/ProjetosSection";
import { ContatoSection } from "./components/ContatoSection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <SmoothScroll>
      <AppContent />
    </SmoothScroll>
  );
}

function AppContent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const lenisRef = useLenis();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const onNavigate = (id) => {
    const el = document.getElementById(id);
    if (el && lenisRef?.current) {
      lenisRef.current.scrollTo(el, { duration: 1.2 });
    } else {
      el?.scrollIntoView({ behavior: "smooth" }); // fallback caso o Lenis ainda não tenha montado
    }
    setActive(id);
    setMenuOpen(false);
  };

  return (
    <div style={{ fontFamily: TEMA.fonteTexto, background: TEMA.azul, color: TEMA.branco, minHeight: "100vh" }}>
      <link href={TEMA.googleFonts} rel="stylesheet" />
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { overflow-x: hidden; }
        input, textarea { outline: none; }
        input:focus, textarea:focus { border-color: ${TEMA.verde} !important; }
        @media (pointer: fine) {
          a, button, [role='button'], body { cursor: none; }
        }
        @media(max-width: 768px) {
          .desk    { display: none !important; }
          .ham     { display: flex !important; }
        }
      `}</style>

      <Navbar
        scrolled={scrolled}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        active={active}
        onNavigate={onNavigate}
      />

      <CustomCursor />

      <main>
        <HeroSection onNavigate={onNavigate} />
        <SkillsSection />
        <ExperienciaSection />
        <FormacaoSection />
        <ProjetosSection />
        <ContatoSection />
      </main>

      <Footer />
    </div>
  );
}