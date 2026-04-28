// ============================================================
//  PORTFÓLIO LUCAS CRUZ — APP PRINCIPAL
//
//  Para editar conteúdo:  src/data/conteudo.js
//  Para editar cores:     src/styles/tema.js
//  Para editar seções:    src/components/<NomeSection>.jsx
// ============================================================
import { useState, useEffect } from "react";
import { TEMA } from "./styles/tema";

import { Navbar }            from "./components/Navbar";
import { HeroSection }       from "./components/HeroSection";
import { SkillsSection }     from "./components/SkillsSection";
import { ExperienciaSection } from "./components/ExperienciaSection";
import { FormacaoSection }   from "./components/FormacaoSection";
import { ProjetosSection }   from "./components/ProjetosSection";
import { ContatoSection }    from "./components/ContatoSection";
import { Footer }            from "./components/Footer";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active,   setActive]   = useState("hero");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const onNavigate = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
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

      <main>
        <HeroSection        onNavigate={onNavigate} />
        <SkillsSection      />
        <ExperienciaSection />
        <FormacaoSection    />
        <ProjetosSection    />
        <ContatoSection     />
      </main>

      <Footer />
    </div>
  );
}
