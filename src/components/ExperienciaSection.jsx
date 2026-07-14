// ============================================================
//  COMPONENTE: ExperienciaSection
//  Timeline de experiências profissionais.
//  Para editar: src/data/conteudo.js → EXPERIENCIAS
// ============================================================
import { EXPERIENCIAS } from "../data/conteudo";
import { TEMA } from "../styles/tema";
import { Fade } from "./Fade";
import "../styles/ExperienciaSection.css";

export function ExperienciaSection() {
  const G = TEMA.verde;

  return (
    <section id="experiencia" style={{ padding: "80px 5%", background: TEMA.azulMedio }}>
      <div
        className="experiencia-grid"
        style={{
          maxWidth: 900,
          margin: "0 auto",
        }}
      >

        {/* Ilustração lado esquerdo */}
        <Fade>
          <div
            className="experiencia-ilustracao"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              gap: 16,
            }}
          >
            <div style={{ fontSize: 80 }}>💻</div>
            <p style={{ fontFamily: TEMA.fonteDisplay, fontSize: 12, color: G, letterSpacing: 2, textAlign: "center" }}>
              Experiências
            </p>
          </div>
        </Fade>

        {/* Timeline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {EXPERIENCIAS.map((exp, i) => (
            <Fade key={i} delay={i * 100}>
              <div style={{
                border: `1px solid ${TEMA.azulBorda}`, borderRadius: 6, padding: "16px 20px",
                background: TEMA.azulClaro,
                transition: "border-color 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = G}
                onMouseLeave={e => e.currentTarget.style.borderColor = TEMA.azulBorda}
              >
                <p style={{ fontFamily: TEMA.fonteDisplay, fontSize: 11, color: G, marginBottom: 6 }}>{exp.periodo}</p>
                <h3 style={{ fontFamily: TEMA.fonteTitulo, fontSize: 15, fontWeight: 500, color: TEMA.branco, marginBottom: 4 }}>{exp.cargo}</h3>
                <p style={{ fontFamily: TEMA.fonteTexto, fontSize: 13, color: TEMA.cinza }}>{exp.empresa}</p>
                {exp.desc && <p style={{ fontFamily: TEMA.fonteTexto, fontSize: 12, color: TEMA.cinza, marginTop: 8, lineHeight: 1.6, fontWeight: 300 }}>{exp.desc}</p>}
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}
