// ============================================================
//  COMPONENTE: ExperienciaSection
//  Accordion de experiências profissionais — um item aberto por
//  vez, mostrando local, site, descrição e tags de tecnologia.
//  Para editar: src/data/conteudo.js → EXPERIENCIAS
// ============================================================
import { useState } from "react";
import { EXPERIENCIAS } from "../data/conteudo";
import { TEMA } from "../styles/tema";
import { Fade } from "./Fade";
import "../styles/ExperienciaSection.css";

function IconeLocal() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

function IconeLink() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ExperienciaSection() {
  const G = TEMA.verde;
  const [aberto, setAberto] = useState(0);

  return (
    <section id="experiencia" style={{ padding: "80px 5%", background: TEMA.azulMedio }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <Fade>
          <h2 style={{
            fontFamily: TEMA.fonteTitulo, fontSize: "clamp(32px,5vw,48px)", fontWeight: 800,
            color: TEMA.branco, textAlign: "center", marginBottom: 48,
          }}>
            Experiência <span style={{ color: G }}>Profissional</span>
          </h2>
        </Fade>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {EXPERIENCIAS.map((exp, i) => {
            const estaAberto = aberto === i;
            return (
              <Fade key={i} delay={i * 100}>
                <div className="experiencia-item" style={{ border: `1px solid ${TEMA.azulBorda}`, borderRadius: 8, overflow: "hidden" }}>
                  <button
                    onClick={() => setAberto(estaAberto ? -1 : i)}
                    className="experiencia-header"
                    style={{
                      background: estaAberto ? TEMA.verde : TEMA.azulClaro,
                      color: estaAberto ? TEMA.azul : TEMA.branco,
                    }}
                  >
                    <span style={{ fontFamily: TEMA.fonteTitulo, fontSize: 15, fontWeight: 700, textAlign: "left" }}>
                      {exp.cargo} <span style={{ fontWeight: 400, opacity: 0.85 }}>@ {exp.empresa}</span>
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
                      <span style={{ fontFamily: TEMA.fonteDisplay, fontSize: 12, fontWeight: 600 }}>{exp.periodo}</span>
                      <span className="experiencia-toggle" style={{ borderColor: estaAberto ? TEMA.azul : TEMA.branco }}>{estaAberto ? "–" : "+"}</span>
                    </span>
                  </button>

                  <div className="experiencia-corpo" style={{
                    maxHeight: estaAberto ? 400 : 0,
                    background: TEMA.azulClaro,
                  }}>
                    <div style={{ padding: "20px 22px" }}>
                      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 14 }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 6, color: TEMA.cinza, fontSize: 13, fontFamily: TEMA.fonteTexto }}>
                          <IconeLocal /> {exp.local}
                        </span>
                        {exp.site && (
                          <span style={{ display: "flex", alignItems: "center", gap: 6, color: G, fontSize: 13, fontFamily: TEMA.fonteTexto }}>
                            <IconeLink /> {exp.site}
                          </span>
                        )}
                      </div>
                      <p style={{ fontFamily: TEMA.fonteTexto, fontSize: 14, color: TEMA.cinza, lineHeight: 1.65, marginBottom: 18, fontWeight: 300 }}>
                        {exp.desc}
                      </p>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {exp.tecnologias?.map((t, j) => (
                          <span key={j} style={{
                            fontFamily: TEMA.fonteDisplay, fontSize: 11, color: TEMA.branco,
                            border: `1px solid ${TEMA.azulBorda}`, borderRadius: 20, padding: "5px 12px",
                          }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Fade>
            );
          })}
        </div>
      </div>
    </section>
  );
}