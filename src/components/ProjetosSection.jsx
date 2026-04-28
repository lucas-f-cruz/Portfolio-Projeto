// ============================================================
//  COMPONENTE: ProjetosSection
//  Lista de projetos no estilo terminal/código.
//  Para editar: src/data/conteudo.js → PROJETOS
// ============================================================
import { useState } from "react";
import { PROJETOS } from "../data/conteudo";
import { TEMA } from "../styles/tema";
import { Fade } from "./Fade";

export function ProjetosSection() {
  const [selecionado, setSelecionado] = useState(0);
  const G = TEMA.verde;
  const projeto = PROJETOS[selecionado];

  return (
    <section id="projetos" style={{ padding: "80px 5%", background: TEMA.azul }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <Fade>
          <p style={{ fontFamily: TEMA.fonteDisplay, fontSize: 13, color: G, marginBottom: 40, letterSpacing: 2, borderLeft: `2px solid ${G}`, paddingLeft: 12 }}>
            PROJETOS
          </p>
        </Fade>

        {/* Lista de projetos */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 24 }}>
          {PROJETOS.map((p, i) => (
            <Fade key={i} delay={i * 80}>
              <button onClick={() => setSelecionado(i)} style={{
                background: selecionado === i ? "rgba(0,229,160,0.05)" : "transparent",
                border: "none", borderLeft: `2px solid ${selecionado === i ? G : TEMA.azulBorda}`,
                padding: "14px 20px", cursor: "pointer", textAlign: "left",
                display: "flex", alignItems: "center", gap: 12, width: "100%",
                transition: "all 0.2s",
              }}>
                <div style={{ display: "flex", gap: 5 }}>
                  {["#ff5f57","#febc2e","#28c840"].map((c, j) => (
                    <div key={j} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
                  ))}
                </div>
                <span style={{ fontFamily: TEMA.fonteDisplay, fontSize: 14, color: selecionado === i ? G : TEMA.cinza }}>
                  {p.nome}
                </span>
              </button>
            </Fade>
          ))}
        </div>

        {/* Detalhe do projeto selecionado */}
        <Fade>
          <div style={{ background: TEMA.azulMedio, border: `1px solid ${TEMA.azulBorda}`, borderRadius: 8, padding: "24px 28px", fontFamily: TEMA.fonteDisplay, fontSize: 13 }}>
            <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
              {["#ff5f57","#febc2e","#28c840"].map((c, i) => (
                <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
              ))}
            </div>
            <div style={{ color: TEMA.cinza, lineHeight: 2 }}>
              <div><span style={{ color: "#61afef" }}>const</span> <span style={{ color: TEMA.branco }}>project</span> <span style={{ color: TEMA.cinza }}>= {"{"}</span></div>
              <div style={{ paddingLeft: 20 }}>
                <span style={{ color: TEMA.cinza }}>Nome: </span><span style={{ color: "#e06c75" }}>'{projeto.nome}',</span>
              </div>
              <div style={{ paddingLeft: 20 }}>
                <span style={{ color: TEMA.cinza }}>ferramentas: </span>
                <span style={{ color: "#e06c75" }}>[{projeto.ferramentas.map(f => `'${f}'`).join(", ")}],</span>
              </div>
              <div style={{ paddingLeft: 20 }}>
                <span style={{ color: TEMA.cinza }}>minha função: </span><span style={{ color: G }}>'{projeto.funcao}',</span>
              </div>
              <div style={{ paddingLeft: 20 }}>
                <span style={{ color: TEMA.cinza }}>Descrição: </span><span style={{ color: G }}>{projeto.descricao}</span>
              </div>
              <div>{"}"}</div>
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              <a href={projeto.url} target="_blank" rel="noreferrer" style={{
                background: G, color: TEMA.azul, padding: "8px 20px",
                fontFamily: TEMA.fonteTitulo, fontSize: 12, fontWeight: 600,
                textDecoration: "none", borderRadius: 4,
              }}>Ver projeto →</a>
              <a href={projeto.github} target="_blank" rel="noreferrer" style={{
                background: "transparent", color: G, padding: "8px 20px",
                border: `1px solid ${G}`, fontFamily: TEMA.fonteTitulo,
                fontSize: 12, textDecoration: "none", borderRadius: 4,
              }}>GitHub →</a>
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
}
