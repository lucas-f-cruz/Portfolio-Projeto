// ============================================================
//  COMPONENTE: ProjetosSection
//  Scroll horizontal "pinado": a seção trava na tela e o
//  conteúdo desliza pro lado conforme o usuário rola a página
//  na vertical (técnica clássica GSAP ScrollTrigger + pin).
//  Para editar: src/data/conteudo.js → PROJETOS / TODOS_PROJETOS
//
//  Slide 0: grid com TODOS os projetos — clicar em qualquer
//  miniatura abre um modal rápido com as infos do projeto
//  (mesmo estilo do painel dos slides detalhados).
//  Slides 1..N: só os projetos em destaque (poucos, de propósito,
//  pra não deixar o scroll da seção muito longo), com índice
//  lateral deslizante e uma animação de entrada (texto primeiro,
//  imagem depois) toda vez que o slide se torna o ativo.
//
//  Em telas pequenas (mobile) o pin/scroll horizontal é
//  desativado — os slides viram uma lista vertical normal,
//  porque scroll horizontal pinado não funciona bem no touch.
// ============================================================
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJETOS, TODOS_PROJETOS } from "../data/conteudo";
import { TEMA } from "../styles/tema";
import "../styles/ProjetosSection.css";

gsap.registerPlugin(ScrollTrigger);

function BrowserFrame({ nome, compact = false }) {
  return (
    <div style={{
      background: TEMA.azulMedio, border: `1px solid ${TEMA.azulBorda}`,
      borderRadius: compact ? 6 : 12, overflow: "hidden",
      boxShadow: compact ? "none" : "0 20px 60px rgba(0,0,0,0.4)",
      width: "100%",
    }}>
      <div style={{
        display: "flex", gap: compact ? 3 : 6,
        padding: compact ? "6px 8px" : "12px 16px",
        borderBottom: `1px solid ${TEMA.azulBorda}`,
      }}>
        {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
          <div key={i} style={{
            width: compact ? 6 : 10, height: compact ? 6 : 10,
            borderRadius: "50%", background: c,
          }} />
        ))}
      </div>
      <div className="mini-frame-tela" style={{
        aspectRatio: "16/10", display: "flex", alignItems: "center", justifyContent: "center",
        background: "#f5f5f7", padding: compact ? 6 : 20,
      }}>
        <span style={{
          fontFamily: TEMA.fonteDisplay,
          fontSize: compact ? 11 : "clamp(20px,3vw,32px)",
          color: "rgba(10,10,12,0.4)", fontWeight: 700, letterSpacing: compact ? 0 : 1,
          textAlign: "center", lineHeight: 1.25,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>{nome}</span>
      </div>
    </div>
  );
}

function InfoProjeto({ projeto, G }) {
  return (
    <>
      <p style={{ fontFamily: TEMA.fonteDisplay, fontSize: 11, color: TEMA.cinza, letterSpacing: 2, marginBottom: 10 }}>
        {projeto.categoria}
      </p>
      <h3 style={{ fontFamily: TEMA.fonteTitulo, fontSize: "clamp(22px,3vw,32px)", fontWeight: 700, color: TEMA.branco, marginBottom: 12, lineHeight: 1.15 }}>
        {projeto.nome}
      </h3>
      <p style={{ fontFamily: TEMA.fonteTexto, fontSize: 13, color: TEMA.cinza, lineHeight: 1.55, marginBottom: 14 }}>
        {projeto.descricao}
      </p>
      <p style={{ fontFamily: TEMA.fonteTexto, fontSize: 12, color: TEMA.cinza, lineHeight: 1.55, marginBottom: 20 }}>
        <strong style={{ color: TEMA.branco }}>Built with: </strong>
        {projeto.ferramentas.join(", ")}
      </p>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        <a href={projeto.url} target="_blank" rel="noreferrer" style={{
          color: TEMA.branco, fontFamily: TEMA.fonteTitulo, fontSize: 13, fontWeight: 600,
          textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6,
        }}>Ver projeto <span>→</span></a>
        <a href={projeto.github} target="_blank" rel="noreferrer" style={{
          color: G, fontFamily: TEMA.fonteTitulo, fontSize: 13, fontWeight: 600,
          textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6,
        }}>GitHub <span>→</span></a>
      </div>
    </>
  );
}

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
      <div className="projeto-slide-texto projeto-anim-texto">
        <InfoProjeto projeto={projeto} G={G} />
      </div>
      <div className="projeto-slide-mockup projeto-anim-mockup">
        <BrowserFrame nome={projeto.nome} />
      </div>
    </div>
  );
}

function ModalProjeto({ projeto, G, onFechar }) {
  return (
    <div
      onClick={onFechar}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(5,5,7,0.75)", backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "5%",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="projeto-modal-card"
        style={{
          background: TEMA.azulMedio, border: `1px solid ${TEMA.azulBorda}`,
          borderRadius: 12, padding: 32, maxWidth: 480, width: "100%",
          maxHeight: "85vh", overflowY: "auto", position: "relative",
        }}
      >
        <button onClick={onFechar} aria-label="Fechar" style={{
          position: "absolute", top: 16, right: 16, width: 28, height: 28,
          border: `1px solid ${TEMA.azulBorda}`, borderRadius: "50%",
          background: "transparent", color: TEMA.cinza, cursor: "pointer",
          fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center",
        }}>✕</button>
        <div style={{ marginBottom: 20 }}>
          <BrowserFrame nome={projeto.nome} />
        </div>
        <InfoProjeto projeto={projeto} G={G} />
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
  const slideRefs = useRef([]);
  const cardRefs = useRef([]);
  const ultimoIdxRef = useRef(-1);

  const [projetoModal, setProjetoModal] = useState(null);

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

            if (idx !== ultimoIdxRef.current) {
              const idxAnterior = ultimoIdxRef.current;
              ultimoIdxRef.current = idx;

              if (idxAnterior >= 1) {
                const slideAnteriorEl = slideRefs.current[idxAnterior - 1];
                const t = slideAnteriorEl?.querySelector(".projeto-anim-texto");
                const m = slideAnteriorEl?.querySelector(".projeto-anim-mockup");
                if (t) gsap.set(t, { opacity: 0, y: 24 });
                if (m) gsap.set(m, { opacity: 0, y: 16 });
              }

              if (idx >= 1) {
                const slideEl = slideRefs.current[idx - 1];
                const textoEl = slideEl?.querySelector(".projeto-anim-texto");
                const mockupEl = slideEl?.querySelector(".projeto-anim-mockup");
                if (textoEl) {
                  gsap.fromTo(textoEl, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" });
                }
                if (mockupEl) {
                  gsap.fromTo(mockupEl, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.55, delay: 0.25, ease: "power3.out" });
                }
              }
            }
          },
        },
      });

      return () => tween.scrollTrigger?.kill();
    });

    return () => mm.revert();
  }, [G, totalSlides]);

  // Efeito de "luz passando" pelos cards do grid, continuamente,
  // um de cada vez, em loop infinito — puramente decorativo. Ilumina
  // a borda E a "tela" interna do card (mais devagar, mais visível).
  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean);
    if (cards.length === 0) return;

    const tl = gsap.timeline({ repeat: -1 });
    cards.forEach((card) => {
      const tela = card.querySelector(".mini-frame-tela");
      tl.to(card, {
        borderColor: G,
        boxShadow: `0 0 28px rgba(74,222,128,0.35)`,
        duration: 0.6,
        ease: "power1.out",
      }, "+=0.25");
      if (tela) {
        tl.to(tela, {
          filter: "brightness(1.12)",
          boxShadow: "inset 0 0 24px rgba(74,222,128,0.45)",
          duration: 0.6,
          ease: "power1.out",
        }, "<");
      }
      tl.to(card, {
        borderColor: TEMA.azulBorda,
        boxShadow: "none",
        duration: 0.6,
        ease: "power1.in",
      }, "+=0.35");
      if (tela) {
        tl.to(tela, {
          filter: "brightness(1)",
          boxShadow: "none",
          duration: 0.6,
          ease: "power1.in",
        }, "<");
      }
    });

    return () => tl.kill();
  }, [G]);

  return (
    <section id="projetos" ref={sectionRef} className="projetos-section" style={{ background: TEMA.azul, overflow: "hidden" }}>
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
        <div className="projeto-slide projeto-slide-grid">
          <p style={{ fontFamily: TEMA.fonteDisplay, fontSize: 13, color: G, letterSpacing: 2, marginBottom: 24, borderLeft: `2px solid ${G}`, paddingLeft: 12 }}>
            PROJETOS
          </p>
          <div className="projetos-grid-scroll">
            <div className="projetos-grid-mini">
              {TODOS_PROJETOS.map((p, i) => (
                <button key={i} ref={el => cardRefs.current[i] = el} className="projeto-mini-card"
                  onClick={() => setProjetoModal(p)}
                  style={{ borderColor: TEMA.azulBorda, background: TEMA.azulMedio }}
                >
                  <BrowserFrame nome={p.nome} compact />
                  <span className="projeto-mini-card-nome" style={{ fontFamily: TEMA.fonteTexto, fontSize: 12, color: TEMA.branco, marginTop: 6 }}>{p.nome}</span>
                  <span className="projeto-mini-card-nome" style={{ fontFamily: TEMA.fonteDisplay, fontSize: 9, color: TEMA.cinza }}>{p.categoria}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {PROJETOS.map((p, i) => (
          <ProjetoSlide key={i} projeto={p} G={G} slideRef={el => slideRefs.current[i] = el} />
        ))}
      </div>

      {projetoModal && (
        <ModalProjeto projeto={projetoModal} G={G} onFechar={() => setProjetoModal(null)} />
      )}
    </section>
  );
}