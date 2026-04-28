// ============================================================
//  COMPONENTE: Footer
// ============================================================
import { PERFIL } from "../data/conteudo";
import { TEMA } from "../styles/tema";

export function Footer() {
  return (
    <footer style={{
      background: TEMA.azul, padding: "24px 5%",
      borderTop: `1px solid ${TEMA.azulBorda}`,
      display: "flex", justifyContent: "center", alignItems: "center",
    }}>
      <p style={{ fontFamily: TEMA.fonteTexto, fontSize: 13, color: TEMA.cinza }}>
        © {new Date().getFullYear()} Portfólio desenvolvido por{" "}
        <span style={{ color: TEMA.verde }}>{PERFIL.nome}</span>
      </p>
    </footer>
  );
}
