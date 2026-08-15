// ============================================================
//  COMPONENTE: ExpertiseSection
//  3 áreas de destaque lado a lado, dentro de um único bloco com
//  divisórias — ícone, título com parte destacada/sublinhada numa
//  cor própria por card, e descrição em estilo "bloco de código"
//  (fonte monoespaçada, com a marcação <h3>...</h3> decorativa).
//  Para editar: src/data/conteudo.js → EXPERTISE
// ============================================================
import { EXPERTISE } from "../data/conteudo";
import { TEMA } from "../styles/tema";
import { Fade } from "./Fade";
import "../styles/ExpertiseSection.css";

const ICONES = {
    monitor: (cor) => (
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={cor} strokeWidth="1.6">
            <rect x="2" y="4" width="20" height="13" rx="1.5" />
            <path d="M8 21h8M12 17v4" strokeLinecap="round" />
        </svg>
    ),
    atom: (cor) => (
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={cor} strokeWidth="1.6">
            <circle cx="12" cy="12" r="1.6" fill={cor} stroke="none" />
            <ellipse cx="12" cy="12" rx="9" ry="3.5" />
            <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
        </svg>
    ),
    server: (cor) => (
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={cor} strokeWidth="1.6">
            <rect x="2" y="3" width="20" height="7" rx="1.5" />
            <rect x="2" y="14" width="20" height="7" rx="1.5" />
            <circle cx="6" cy="6.5" r="0.8" fill={cor} stroke="none" />
            <circle cx="6" cy="17.5" r="0.8" fill={cor} stroke="none" />
        </svg>
    ),
};

export function ExpertiseSection() {
    return (
        <section id="expertise" style={{ padding: "80px 5%", background: TEMA.azul }}>
            <div style={{ maxWidth: 1000, margin: "0 auto" }}>
                <Fade>
                    <h2 style={{
                        fontFamily: TEMA.fonteTitulo, fontSize: "clamp(32px,5vw,52px)", fontWeight: 800,
                        color: TEMA.branco, textAlign: "center", marginBottom: 48,
                    }}>
                        My Expertise
                    </h2>
                </Fade>

                <Fade delay={100}>
                    <div className="expertise-grid" style={{ borderColor: TEMA.azulBorda }}>
                        {EXPERTISE.map((item, i) => (
                            <div key={i} className="expertise-card" style={{ borderColor: TEMA.azulBorda }}>
                                <div className="expertise-icone">{ICONES[item.icone](TEMA.branco)}</div>
                                <h3 style={{ fontFamily: TEMA.fonteTitulo, fontSize: 21, fontWeight: 800, color: TEMA.branco, lineHeight: 1.3, margin: "16px 0 20px" }}>
                                    <span style={{ textDecoration: "underline", textDecorationColor: item.cor, textDecorationThickness: 3, textUnderlineOffset: 4 }}>
                                        {item.tituloDestaque}
                                    </span>{" "}
                                    {item.tituloResto}
                                </h3>
                                <div className="expertise-codigo">
                                    <div style={{ color: item.cor }}>&lt;h3&gt;</div>
                                    <div className="expertise-codigo-linha">
                                        <span className="expertise-codigo-barra" style={{ borderColor: TEMA.azulBorda }} />
                                        <span style={{ color: TEMA.cinza }}>{item.descricao}</span>
                                    </div>
                                    <div style={{ color: item.cor }}>&lt;/h3&gt;</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Fade>
            </div>
        </section>
    );
}