// ============================================================
//  COMPONENTE: ContatoSection
//  Formulário de contato e informações.
//  Para editar: src/data/conteudo.js → PERFIL
// ============================================================
import { PERFIL } from "../data/conteudo";
import { TEMA } from "../styles/tema";
import { Fade } from "./Fade";
import "../styles/ContatoSection.css";

export function ContatoSection() {
  const G = TEMA.verde;

  const infos = [
    { icon: "📧", texto: PERFIL.email },
    { icon: "📍", texto: PERFIL.endereco },
  ];

  return (
    <section id="contato" style={{ padding: "80px 5%", background: TEMA.azulMedio }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <Fade>
          <p style={{ fontFamily: TEMA.fonteDisplay, fontSize: 13, color: G, marginBottom: 8, letterSpacing: 2 }}>Contato</p>
          <h2 style={{ fontFamily: TEMA.fonteTitulo, fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 600, color: TEMA.branco, marginBottom: 48 }}>
            Entre em <span style={{ color: G }}>contato</span>
          </h2>
        </Fade>

        <div className="contato-grid">

          {/* Formulário */}
          <Fade>
            <div style={{ background: TEMA.azulClaro, border: `1px solid ${TEMA.azulBorda}`, borderRadius: 8, padding: "28px" }}>
              <p style={{ fontFamily: TEMA.fonteTexto, fontSize: 14, color: TEMA.cinza, lineHeight: 1.7, marginBottom: 24, fontWeight: 300 }}>
                Se você tiver alguma dúvida ou oportunidade, não hesite em entrar em contato. Estou aberto a projetos que se alinhem com minhas habilidades.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {["Seu nome:", "Seu e-mail:", "Sua mensagem:"].map((label, i) => (
                  <div key={i}>
                    <label style={{ fontFamily: TEMA.fonteTexto, fontSize: 12, color: TEMA.cinza, display: "block", marginBottom: 4 }}>{label}</label>
                    {i < 2
                      ? <input style={{ width: "100%", background: TEMA.azulMedio, border: `1px solid ${TEMA.azulBorda}`, color: TEMA.branco, padding: "10px 14px", borderRadius: 4, fontFamily: TEMA.fonteTexto, fontSize: 13, boxSizing: "border-box" }} />
                      : <textarea rows={4} style={{ width: "100%", background: TEMA.azulMedio, border: `1px solid ${TEMA.azulBorda}`, color: TEMA.branco, padding: "10px 14px", borderRadius: 4, fontFamily: TEMA.fonteTexto, fontSize: 13, resize: "vertical", boxSizing: "border-box" }} />
                    }
                  </div>
                ))}
                <button style={{
                  background: G, color: TEMA.azul, border: "none", cursor: "pointer",
                  padding: "12px", fontFamily: TEMA.fonteTitulo, fontSize: 14,
                  fontWeight: 600, borderRadius: 4, marginTop: 4,
                  transition: "opacity 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >ENVIAR MENSAGEM 📧</button>
              </div>
            </div>
          </Fade>

          {/* Informações */}
          <Fade delay={200}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {infos.map((info, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px", border: `1px solid ${TEMA.azulBorda}`, borderRadius: 6, background: TEMA.azulClaro }}>
                  <div style={{ width: 36, height: 36, background: "rgba(0,229,160,0.1)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{info.icon}</div>
                  <span style={{ fontFamily: TEMA.fonteTexto, fontSize: 13, color: TEMA.cinza }}>{info.texto}</span>
                </div>
              ))}

              {/* Links sociais */}
              <div
                className="social-links"
                style={{
                  display: "flex",
                  gap: 12,
                  marginTop: 8,
                }}
              >
                {[
                  { url: PERFIL.github, label: "GitHub" },
                  { url: PERFIL.linkedin, label: "LinkedIn" },
                ].map(({ url, label }) => (
                  <a key={label} href={url} target="_blank" rel="noreferrer" style={{
                    padding: "10px 20px", border: `1px solid ${TEMA.azulBorda}`,
                    color: G, fontFamily: TEMA.fonteTexto, fontSize: 13,
                    textDecoration: "none", borderRadius: 4,
                    transition: "border-color 0.2s, background 0.2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = G; e.currentTarget.style.background = "rgba(0,229,160,0.08)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = TEMA.azulBorda; e.currentTarget.style.background = "transparent"; }}
                  >{label}</a>
                ))}
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
}
