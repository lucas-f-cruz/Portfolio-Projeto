// ============================================================
//  COMPONENTE: SkillsSection
//  Grid de ícones de tecnologias.
//  Para editar: src/data/conteudo.js → SKILLS
//
//  Efeitos aplicados:
//  - Stagger reveal via GSAP ScrollTrigger (cards entram em
//    cascata quando a seção aparece na tela)
//  - Flutuação contínua e sutil em cada ícone
//  - Hover com leve scale + glow no card
// ============================================================
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SKILLS } from "../data/conteudo";
import { TEMA } from "../styles/tema";
import "../styles/SkillsSection.css";

gsap.registerPlugin(ScrollTrigger);

export function SkillsSection() {
  const G = TEMA.verde;
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Título
      gsap.from(".skills-title", {
        y: 24,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      // Cards em cascata — só disparam quando a seção entra na tela
      gsap.from(".skill-card", {
        y: 30,
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      // Flutuação contínua e sutil nos ícones, com leve defasagem
      // entre eles pra não ficarem todos sincronizados (efeito "vivo")
      gsap.utils.toArray(".skill-icon").forEach((icon, i) => {
        gsap.to(icon, {
          y: -6,
          duration: 1.8 + (i % 3) * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.08,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} style={{ padding: "80px 5%", background: TEMA.azul }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <p className="skills-title" style={{ textAlign: "center", fontFamily: TEMA.fonteDisplay, fontSize: 13, color: G, marginBottom: 40, letterSpacing: 2 }}>
          Skills
        </p>

        <div className="skills-grid">
          {SKILLS.map((skill, i) => (
            <div
              key={i}
              className="skill-card"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                padding: "20px 16px",
                border: `1px solid ${TEMA.azulBorda}`,
                borderRadius: 8,
                cursor: "default",
                transition: "border-color 0.2s, background 0.2s, box-shadow 0.3s",
                background: TEMA.azulMedio,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = G;
                e.currentTarget.style.background = "rgba(245,245,247,0.05)";
                e.currentTarget.style.boxShadow = "0 0 24px rgba(245,245,247,0.15)";
                gsap.to(e.currentTarget, { scale: 1.08, duration: 0.3, ease: "power2.out" });
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = TEMA.azulBorda;
                e.currentTarget.style.background = TEMA.azulMedio;
                e.currentTarget.style.boxShadow = "none";
                gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: "power2.out" });
              }}
            >
              <img
                className="skill-icon"
                src={skill.icon}
                alt={skill.nome}
                style={{
                  width: "clamp(32px,5vw,40px)",
                  height: "clamp(32px,5vw,40px)",
                  objectFit: "contain", filter: skill.filtro || "none"
                }}
              />
              <span style={{ fontFamily: TEMA.fonteTexto, fontSize: 12, color: TEMA.cinza }}>{skill.nome}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}