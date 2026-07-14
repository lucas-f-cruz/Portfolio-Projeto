// ============================================================
//  COMPONENTE: HeroSection
//  Seção inicial com texto à esquerda e código animado
//  à direita — estilo terminal/IDE.
//  Para editar o código animado: src/data/conteudo.js → CODIGO_HERO
// ============================================================
import { useState, useEffect } from "react";
import { PERFIL, CODIGO_HERO } from "../data/conteudo";
import { TEMA } from "../styles/tema";
import "../styles/HeroSection.css"

function CodigoAnimado() {
  const [linhasVisiveis, setLinhasVisiveis] = useState(0);

  useEffect(() => {
    if (linhasVisiveis >= CODIGO_HERO.length) return;
    const t = setTimeout(() => setLinhasVisiveis(v => v + 1), 120);
    return () => clearTimeout(t);
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
      fontSize: 13, lineHeight: 1.8, minHeight: 300,
    }}>
      {/* Dots de janela */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
        {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
          <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
        ))}
      </div>

      {CODIGO_HERO.slice(0, linhasVisiveis).map((linha, i) => (
        <div key={i} style={{ display: "flex", flexWrap: "wrap" }}>
          <span style={{ color: "rgba(255,255,255,0.2)", marginRight: 16, userSelect: "none", minWidth: 20 }}>{i + 1}</span>
          <span style={{ color: cores[linha.tipo] || TEMA.branco }}>{linha.texto}</span>
          {linha.valor && <span style={{ color: "#e06c75" }}>{linha.valor}</span>}
          {i === linhasVisiveis - 1 && (
            <span style={{ display: "inline-block", width: 2, height: 14, background: TEMA.verde, marginLeft: 2, animation: "blink 1s ease infinite" }} />
          )}
        </div>
      ))}
    </div>
  );
}

export function HeroSection({ onNavigate }) {
  const G = TEMA.verde;

  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      background: TEMA.azul, padding: "80px 5% 40px",
    }}>
      <div
        className="hero-grid"
        style={{
          // maxWidth: 1100,
          // margin: "0 auto",
          // width: "100%",
          maxWidth: 500,
          margin: "0 auto 32px",
        }}
      >

        {/* Texto esquerda */}
        <div>
          <p style={{ fontFamily: TEMA.fonteDisplay, fontSize: 14, color: G, marginBottom: 16, letterSpacing: 1 }}>
            Olá, eu sou
          </p>
          <h1 style={{ fontFamily: TEMA.fonteTitulo, fontSize: "clamp(36px, 5vw, 58px)", fontWeight: 600, color: TEMA.branco, lineHeight: 1.1, marginBottom: 16 }}>
            {PERFIL.nome},<br />
            <span style={{ color: G }}>Desenvolvedor</span><br />
            Full Stack.
          </h1>
          <p style={{ fontFamily: TEMA.fonteTexto, fontSize: 15, color: TEMA.cinza, lineHeight: 1.8, maxWidth: 400, marginBottom: 32, fontWeight: 300 }}>
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
            <button onClick={() => onNavigate("contato")} style={{
              background: G, color: TEMA.azul, border: "none", cursor: "pointer",
              padding: "12px 28px", fontFamily: TEMA.fonteTitulo,
              fontSize: 14, fontWeight: 600, borderRadius: 4,
              transition: "opacity 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >Contatar 📧</button>
            <button style={{
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
        <div className="hero-code">
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
