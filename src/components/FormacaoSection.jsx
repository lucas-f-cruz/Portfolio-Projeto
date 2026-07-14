// ============================================================
//  COMPONENTE: FormacaoSection
//  Timeline de formação acadêmica.
//  Para editar: src/data/conteudo.js → FORMACAO
// ============================================================
import { FORMACAO } from "../data/conteudo";
import { TEMA } from "../styles/tema";
import { Fade } from "./Fade";
import perfilimg from "../img/perfil.jpeg";
import "../styles/FormacaoSection.css";

export function FormacaoSection() {
  const G = TEMA.verde;

  return (
    <section id="formacao" style={{ padding: "80px 5%", background: TEMA.azul }}>
      <div
        className="formacao-grid"
        style={{
          maxWidth: 900,
          margin: "0 auto",
        }}
      >

        {/* Timeline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {FORMACAO.map((f, i) => (
            <Fade key={i} delay={i * 100}>
              <div style={{
                border: `1px solid ${TEMA.azulBorda}`, borderRadius: 6, padding: "16px 20px",
                background: TEMA.azulMedio, display: "flex", gap: 16, alignItems: "flex-start",
                transition: "border-color 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = G}
                onMouseLeave={e => e.currentTarget.style.borderColor = TEMA.azulBorda}
              >
                <div style={{ width: 36, height: 36, background: TEMA.azulClaro, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 16 }}>🎓</div>
                <div>
                  <p style={{ fontFamily: TEMA.fonteDisplay, fontSize: 11, color: G, marginBottom: 4 }}>{f.periodo}</p>
                  <h3 style={{ fontFamily: TEMA.fonteTitulo, fontSize: 14, fontWeight: 500, color: TEMA.branco, marginBottom: 2, textTransform: "uppercase" }}>{f.curso}</h3>
                  <p style={{ fontFamily: TEMA.fonteTexto, fontSize: 12, color: TEMA.cinza }}>{f.instituicao}</p>
                </div>
              </div>
            </Fade>
          ))}
        </div>

        {/* Ilustração */}
        <Fade delay={200}>
          <div
            style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 16 }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <img src={perfilimg} alt="perfil" height="400px" /> */}
              <img
                src={perfilimg}
                alt="perfil"
                style={{
                  width: "100%",
                  maxWidth: 350,
                  height: "auto",
                  borderRadius: 12,
                  objectFit: "cover",
                }}
              />
            </div>
            <p style={{ fontFamily: TEMA.fonteDisplay, fontSize: 12, color: G, letterSpacing: 2, textAlign: "center" }}>
              Lucas Cruz
            </p>
          </div>
        </Fade>
      </div>
    </section>
  );
}
