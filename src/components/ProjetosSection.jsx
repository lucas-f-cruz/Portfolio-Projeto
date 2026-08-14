// ============================================================
//  COMPONENTE: ProjetosSection
//  Scroll horizontal "pinado": a seção trava na tela e o
//  conteúdo desliza pro lado conforme o usuário rola a página
//  na vertical (técnica clássica GSAP ScrollTrigger + pin).
//  Para editar: src/data/conteudo.js → PROJETOS
//
//  Slide 0: grid de miniaturas de todos os projetos — clicar
//  numa miniatura pula direto pro slide daquele projeto.
//  Slides 1..N: um projeto em destaque por vez, com índice
//  lateral deslizante mostrando a posição atual.
//
//  Em telas pequenas (mobile) o pin/scroll horizontal é
//  desativado — os slides viram uma lista vertical normal,
//  porque scroll horizontal pinado não funciona bem no touch.
// ============================================================
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJETOS } from "../data/conteudo";
import { TEMA } from "../styles/tema";
import { useLenis } from "../hooks/lenisContext";
import "../styles/ProjetosSection.css";

gsap.registerPlugin(ScrollTrigger);

// Moldura de "janela de navegador" compartilhada — usada tanto no
// mockup grande do slide quanto nas miniaturas do grid, pra manter
// a mesma cara nos dois lugares. `compact` deixa tudo menor (dots
// e fonte) pra caber no card pequeno.
function BrowserFrame({ nome, compact = false }) {
  return (
    <div style={{
      background: TEMA.azulMedio, border: `1px solid ${TEMA.azulBorda}`,
      borderRadius: compact ? 8 : 12, overflow: "hidden",
      boxShadow: compact ? "none" : "0 20px 60px rgba(0,0,0,0.4)",
      width: "100%",
    }}>
      <div style={{
        display: "flex", gap: compact ? 4 : 6,
        padding: compact ? "8px 10px" : "12px 16px",
        borderBottom: `1px solid ${TEMA.azulBorda}`,
      }}>
        {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
          <div key={i} style={{
            width: compact ? 7 : 10, height: compact ? 7 : 10,
            borderRadius: "50%", background: c,
          }} />
        ))}
      </div>
      <div style={{
        aspectRatio: "16/10", display: "flex", alignItems: "center", justifyContent: "center",
        background: "#f5f5f7", padding: compact ? 10 : 20,
      }}>
        <span style={{
          fontFamily: TEMA.fonteDisplay,
          fontSize: compact ? 12 : "clamp(20px,3vw,32px)",
          color: "rgba(10,10,12,0.4)", fontWeight: 700, letterSpacing: compact ? 0 : 1,
          textAlign: "center", lineHeight: 1.3,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>{nome}</span>
      </div>
    </div>
  );
}

// Um slide de projeto em destaque
function ProjetoSlide({ projeto, G, slideRef }) {
  const verProjetoRef = useRef(null);
  const githubRef = useRef(null);

  useEffect(() => {
    const cleanups = [];
    [verProjetoRef, githubRef].forEach((btnRef) => {
      const el = btnRef.current;
      if (!el) return;
      const moveX = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
      const moveY = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
      const onMove = (e) => {
        const rect = el.getBoundingClientRect();
        moveX((e.clientX - (rect.left + rect.width / 2)) * 0.3);
        moveY((e.clientY - (rect.top + rect.height / 2)) * 0.3);
      };
      const onLeave = () => { moveX(0); moveY(0); };
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      });
    });
    return () => cleanups.forEach(fn => fn());
  }, []);

  return (
    <div className="projeto-slide" ref={slideRef}>
      <div className="projeto-slide-texto">
        <p style={{ fontFamily: TEMA.fonteDisplay, fontSize: 11, color: TEMA.cinza, letterSpacing: 2, marginBottom: 10 }}>
          {projeto.categoria}
        </p>
        <h3 style={{ fontFamily: TEMA.fonteTitulo, fontSize: "clamp(22px,3vw,32px)", fontWeight: 700, color: TEMA.branco, marginBottom: 12, lineHeight: 1.15 }}>
          {projeto.nome}
        </h3>
        <div className="projeto-slide-desc-box">
          <p style={{ fontFamily: TEMA.fonteTexto, fontSize: 13, color: TEMA.cinza, lineHeight: 1.55 }}>
            {projeto.descricao}
          </p>
        </div>
        <p style={{ fontFamily: TEMA.fonteTexto, fontSize: 12, color: TEMA.cinza, lineHeight: 1.55, marginBottom: 20 }}>
          <strong style={{ color: TEMA.branco }}>Built with: </strong>
          {projeto.ferramentas.join(", ")}
        </p>
        <div className="projeto-links-row" style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          <a ref={verProjetoRef} href={projeto.url} target="_blank" rel="noreferrer" style={{
            color: TEMA.branco, fontFamily: TEMA.fonteTitulo, fontSize: 13, fontWeight: 600,
            textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6,
          }}>Ver projeto <span>→</span></a>
          <a ref={githubRef} href={projeto.github} target="_blank" rel="noreferrer" style={{
            color: G, fontFamily: TEMA.fonteTitulo, fontSize: 13, fontWeight: 600,
            textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6,
          }}>GitHub <span>→</span></a>
        </div>
      </div>

      <div className="projeto-slide-mockup">
        <BrowserFrame nome={projeto.nome} />
      </div>
    </div>
  );
}

export function ProjetosSection() {
  const G = TEMA.verde;
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const indexRefs = useRef([]);
  const indicatorRef = useRef(null);
  const slideRefs = useRef([]);       // um ref por projeto (slides 1..N)
  const scrollTriggerRef = useRef(null); // guarda a instância pra calcular posições no clique
  const lenisRef = useLenis();

  // Slide 0 = grid de miniaturas; os demais = um projeto cada
  const totalSlides = PROJETOS.length + 1;

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const section = sectionRef.current;
      const track = trackRef.current;

      const tween = gsap.to(track, {
        x: () => -(track.scrollWidth - section.offsetWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + (track.scrollWidth - section.offsetWidth),
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.round(self.progress * (totalSlides - 1));
            const target = indexRefs.current[idx];
            const indicator = indicatorRef.current;
            if (target && indicator) {
              indicator.style.transform = `translateY(${target.offsetTop}px)`;
            }
            indexRefs.current.forEach((el, i) => {
              if (el) el.style.color = i === idx ? G : TEMA.cinza;
            });
          },
        },
      });

      scrollTriggerRef.current = tween.scrollTrigger;

      return () => {
        tween.scrollTrigger?.kill();
        scrollTriggerRef.current = null;
      };
    });

    return () => mm.revert();
  }, [G, totalSlides]);

  // Clique numa miniatura do grid → pula pro slide daquele projeto.
  // Com o pin ativo (desktop), calcula a posição de scroll certa a
  // partir do próprio ScrollTrigger; sem pin (mobile), rola até o
  // elemento normalmente.
  const irParaProjeto = (indexProjeto) => {
    const st = scrollTriggerRef.current;
    if (st) {
      const progresso = (indexProjeto + 1) / (totalSlides - 1);
      const destino = st.start + progresso * (st.end - st.start);
      if (lenisRef?.current) {
        lenisRef.current.scrollTo(destino, { duration: 1.2 });
      } else {
        window.scrollTo({ top: destino, behavior: "smooth" });
      }
    } else {
      const el = slideRefs.current[indexProjeto];
      if (el && lenisRef?.current) {
        lenisRef.current.scrollTo(el, { duration: 1.2 });
      } else {
        el?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section id="projetos" ref={sectionRef} className="projetos-section" style={{ background: TEMA.azul, overflow: "hidden" }}>
      {/* Índice lateral — só aparece em telas grandes (pin ativo) */}
      <div className="projetos-index">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <div key={i} ref={el => indexRefs.current[i] = el} style={{
            fontFamily: TEMA.fonteDisplay, fontSize: 12, color: TEMA.cinza,
            padding: "10px 0", transition: "color 0.2s",
          }}>
            {String(i).padStart(2, "0")}
          </div>
        ))}
        <div ref={indicatorRef} style={{
          position: "absolute", left: -12, top: 0, width: 2, height: 20,
          background: G, transition: "transform 0.1s linear",
        }} />
      </div>

      <div ref={trackRef} className="projetos-track">
        {/* Slide 0 — grid de miniaturas */}
        <div className="projeto-slide projeto-slide-grid">
          <p style={{ fontFamily: TEMA.fonteDisplay, fontSize: 13, color: G, letterSpacing: 2, marginBottom: 32, borderLeft: `2px solid ${G}`, paddingLeft: 12 }}>
            PROJETOS
          </p>
          <div className="projetos-grid-mini">
            {PROJETOS.map((p, i) => (
              <button key={i} className="projeto-mini-card"
                onClick={() => irParaProjeto(i)}
                style={{ borderColor: TEMA.azulBorda, background: TEMA.azulMedio }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = G;
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = TEMA.azulBorda;
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <BrowserFrame nome={p.nome} compact />
                <span className="projeto-mini-card-nome" style={{ fontFamily: TEMA.fonteTexto, fontSize: 14, color: TEMA.branco, marginTop: 10 }}>{p.nome}</span>
                <span className="projeto-mini-card-nome" style={{ fontFamily: TEMA.fonteDisplay, fontSize: 10, color: TEMA.cinza }}>{p.categoria}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Slides 1..N — um projeto por vez */}
        {PROJETOS.map((p, i) => (
          <ProjetoSlide key={i} projeto={p} G={G} slideRef={el => slideRefs.current[i] = el} />
        ))}
      </div>
    </section>
  );
}