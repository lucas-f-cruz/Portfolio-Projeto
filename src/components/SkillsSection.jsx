// ============================================================
//  COMPONENTE: SkillsSection
//  Grid de ícones de tecnologias.
//  Para editar: src/data/conteudo.js → SKILLS
// ============================================================
import { SKILLS } from "../data/conteudo";
import { TEMA } from "../styles/tema";
import { Fade } from "./Fade";

export function SkillsSection() {
  const G = TEMA.verde;

  return (
    <section id="skills" style={{ padding: "80px 5%", background: TEMA.azul }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <Fade>
          <p style={{ textAlign: "center", fontFamily: TEMA.fonteDisplay, fontSize: 13, color: G, marginBottom: 40, letterSpacing: 2 }}>
            Skills
          </p>
        </Fade>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "center" }}>
          {SKILLS.map((skill, i) => (
            <Fade key={i} delay={i * 60}>
              <div style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
                padding: "20px 16px", border: `1px solid ${TEMA.azulBorda}`,
                borderRadius: 8, width: 90, cursor: "default",
                transition: "border-color 0.2s, background 0.2s",
                background: TEMA.azulMedio,
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = G; e.currentTarget.style.background = "rgba(0,229,160,0.05)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = TEMA.azulBorda; e.currentTarget.style.background = TEMA.azulMedio; }}
              >
                <img src={skill.icon} alt={skill.nome} style={{ width: 40, height: 40, objectFit: "contain", filter: skill.filtro || "none" }} />
                <span style={{ fontFamily: TEMA.fonteTexto, fontSize: 12, color: TEMA.cinza }}>{skill.nome}</span>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}
