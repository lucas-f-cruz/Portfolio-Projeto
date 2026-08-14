// ============================================================
//  COMPONENTE: HeroSection
//  Seção inicial com texto à esquerda e código animado
//  à direita — estilo terminal/IDE.
//  Para editar o código animado: src/data/conteudo.js → CODIGO_HERO
// ============================================================
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { PERFIL, CODIGO_HERO } from "../data/conteudo";
import { TEMA } from "../styles/tema";
import "../styles/HeroSection.css"

function CodigoAnimado() {
  const [linhasVisiveis, setLinhasVisiveis] = useState(0);
  const boxRef = useRef(null);

  useEffect(() => {
    if (linhasVisiveis >= CODIGO_HERO.length) return;
    const t = setTimeout(() => setLinhasVisiveis(v => v + 1), 120);
    return () => clearTimeout(t);
  }, [linhasVisiveis]);

  // Conforme novas linhas "digitam", rola o bloco pro final —
  // igual um terminal de verdade, em vez de deixar o card crescer.
  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  }, [linhasVisiveis]);

  const cores = {
    chave: TEMA.branco,
    valor: "#e06c75",
    bool: TEMA.verde,
    fn: "#61afef",
    retorno: "#c678dd",
  };

  return (
    <div style={{
      background: TEMA.azulMedio, border: `1px solid ${TEMA.azulBorda}`,
      borderRadius: 8, padding: "20px 24px", fontFamily: TEMA.fonteDisplay,
      fontSize: 12, lineHeight: 1.6,
    }}>
      {/* Dots de janela */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
        {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
          <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
        ))}
      </div>

      <div ref={boxRef} className="hero-code-scroll" style={{ maxHeight: 340, overflowY: "auto" }}>
        {CODIGO_HERO.slice(0, linhasVisiveis).map((linha, i) => (
          <div key={i} style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            <span style={{ color: "rgba(255,255,255,0.2)", marginRight: 16, userSelect: "none", display: "inline-block", minWidth: 20 }}>{i + 1}</span>
            <span style={{ color: cores[linha.tipo] || TEMA.branco }}>{linha.texto}</span>
            {linha.valor && <span style={{ color: "#e06c75" }}>{linha.valor}</span>}
            {i === linhasVisiveis - 1 && (
              <span style={{ display: "inline-block", width: 2, height: 12, background: TEMA.verde, marginLeft: 2, animation: "blink 1s ease infinite" }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroSection({ onNavigate }) {
  const G = TEMA.verde;
  const containerRef = useRef(null);
  const btnContatarRef = useRef(null);
  const btnCurriculoRef = useRef(null);
  const codeRef = useRef(null);

  useEffect(() => {
    // Captura os nós logo no início — no cleanup, os .current dos refs
    // já podem ter mudado (ou desmontado), então usamos essas cópias.
    const btnContatarEl = btnContatarRef.current;
    const btnCurriculoEl = btnCurriculoRef.current;
    const codeElAtStart = codeRef.current;

    // Hero já aparece na tela ao carregar a página, então a animação
    // dispara direto no mount (não precisa de ScrollTrigger aqui —
    // isso é reservado pras seções que o usuário só vê ao rolar).
    const ctx = gsap.context(() => {
      gsap.from(".hero-eyebrow, .hero-title, .hero-desc, .hero-social, .hero-buttons", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });
      gsap.from(".hero-code", {
        x: 24,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });

      // --- Magnetic buttons ---
      // O botão se desloca um pouco na direção do cursor quando ele
      // se aproxima, e volta suavemente ao soltar (mouseleave).
      [btnContatarRef, btnCurriculoRef].forEach((btnRef) => {
        const el = btnRef.current;
        if (!el) return;

        const moveX = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
        const moveY = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

        const onMove = (e) => {
          const rect = el.getBoundingClientRect();
          const relX = e.clientX - (rect.left + rect.width / 2);
          const relY = e.clientY - (rect.top + rect.height / 2);
          moveX(relX * 0.35);
          moveY(relY * 0.35);
        };
        const onLeave = () => { moveX(0); moveY(0); };

        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
        el._magneticCleanup = () => {
          el.removeEventListener("mousemove", onMove);
          el.removeEventListener("mouseleave", onLeave);
        };
      });

      // --- Tilt 3D no bloco de código ---
      // Inclina o card conforme a posição do mouse dentro dele,
      // simulando profundidade; volta ao plano normal ao sair.
      const codeEl = codeRef.current;
      if (codeEl) {
        gsap.set(codeEl, { transformPerspective: 800 });
        const tiltX = gsap.quickTo(codeEl, "rotationX", { duration: 0.5, ease: "power3.out" });
        const tiltY = gsap.quickTo(codeEl, "rotationY", { duration: 0.5, ease: "power3.out" });

        const onCodeMove = (e) => {
          const rect = codeEl.getBoundingClientRect();
          const relX = (e.clientX - rect.left) / rect.width - 0.5;  // -0.5 a 0.5
          const relY = (e.clientY - rect.top) / rect.height - 0.5;
          tiltY(relX * 12);   // move mouse horizontal → gira no eixo Y
          tiltX(relY * -12);  // move mouse vertical   → gira no eixo X
        };
        const onCodeLeave = () => { tiltX(0); tiltY(0); };

        codeEl.addEventListener("mousemove", onCodeMove);
        codeEl.addEventListener("mouseleave", onCodeLeave);
        codeEl._tiltCleanup = () => {
          codeEl.removeEventListener("mousemove", onCodeMove);
          codeEl.removeEventListener("mouseleave", onCodeLeave);
        };
      }
    }, containerRef);

    return () => {
      // Limpa os listeners manuais (o gsap.context não sabe deles) +
      // reverte as animações/transforms aplicados.
      btnContatarEl?._magneticCleanup?.();
      btnCurriculoEl?._magneticCleanup?.();
      codeElAtStart?._tiltCleanup?.();
      ctx.revert();
    };
  }, []);

  return (
    <section id="hero" ref={containerRef} style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      background: TEMA.azul, padding: "80px 5% 40px",
    }}>
      <div
        className="hero-grid"
        style={{
          maxWidth: 500,
          margin: "0 auto 32px",
        }}
      >

        {/* Texto esquerda */}
        <div>
          <p className="hero-eyebrow" style={{ fontFamily: TEMA.fonteDisplay, fontSize: 14, color: G, marginBottom: 16, letterSpacing: 1 }}>
            Olá, eu sou
          </p>
          <h1 className="hero-title" style={{ fontFamily: TEMA.fonteTitulo, fontSize: "clamp(36px, 5vw, 58px)", fontWeight: 600, color: TEMA.branco, lineHeight: 1.1, marginBottom: 16 }}>
            {PERFIL.nome},<br />
            <span style={{ color: G }}>Desenvolvedor</span><br />
            Full Stack.
          </h1>
          <p className="hero-desc" style={{ fontFamily: TEMA.fonteTexto, fontSize: 15, color: TEMA.cinza, lineHeight: 1.8, maxWidth: 400, marginBottom: 32, fontWeight: 300 }}>
            {PERFIL.descricao}
          </p>

          {/* Ícones sociais */}
          <div
            className="hero-social"
          >
            {[
              { url: PERFIL.github, label: "GH" },
              { url: PERFIL.linkedin, label: "in" },
            ].map(({ url, label }) => (
              <a key={label} href={url} target="_blank" rel="noreferrer" style={{
                width: 40, height: 40, border: `1px solid ${TEMA.azulBorda}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: G, fontFamily: TEMA.fonteDisplay, fontSize: 12,
                textDecoration: "none", borderRadius: 4,
                transition: "border-color 0.2s, background 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = G; e.currentTarget.style.background = "rgba(0,229,160,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = TEMA.azulBorda; e.currentTarget.style.background = "transparent"; }}
              >{label}</a>
            ))}
          </div>

          <div
            className="hero-buttons"
          >
            <button ref={btnContatarRef} onClick={() => onNavigate("contato")} style={{
              background: G, color: TEMA.azul, border: "none", cursor: "pointer",
              padding: "12px 28px", fontFamily: TEMA.fonteTitulo,
              fontSize: 14, fontWeight: 600, borderRadius: 4,
              transition: "opacity 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >Contatar 📧</button>
            <button ref={btnCurriculoRef} style={{
              background: "transparent", color: TEMA.branco,
              border: `1px solid ${TEMA.azulBorda}`,
              cursor: "pointer", padding: "12px 28px",
              fontFamily: TEMA.fonteTitulo, fontSize: 14, borderRadius: 4,
              transition: "border-color 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = G}
              onMouseLeave={e => e.currentTarget.style.borderColor = TEMA.azulBorda}
            >Currículo ⬇</button>
          </div>
        </div>

        {/* Código direita */}
        <div className="hero-code" ref={codeRef}>
          <CodigoAnimado />
        </div>
      </div>

      <style>{`
    @keyframes blink {
    0%,100%{opacity:1}
    50%{opacity:0}
}
`}</style>
    </section>
  );
}