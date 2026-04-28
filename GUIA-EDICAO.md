# 📘 GUIA DE EDIÇÃO — Portfólio Lucas Cruz

Esse arquivo explica como editar cada parte do seu portfólio
sem precisar entender todo o código. Siga os exemplos!

---

## 📁 REGRA DE OURO

> **Nunca mexa nos componentes para mudar conteúdo.**
> Todo texto, cor e dado fica em apenas 2 arquivos:
> - `src/data/conteudo.js` → textos, projetos, skills, etc.
> - `src/styles/tema.js`   → cores e fontes

---

## 🎨 1. MUDAR CORES — `src/styles/tema.js`

```js
export const TEMA = {
  azul:        "#0d1b2a",  // ← fundo principal (mais escuro)
  azulMedio:   "#112240",  // ← fundo das seções alternadas
  azulClaro:   "#1a2f4a",  // ← fundo dos cards
  azulBorda:   "#1e3a5f",  // ← cor das bordas
  verde:       "#00e5a0",  // ← cor de destaque (links, hover, títulos)
  verdeEscuro: "#00b37e",  // ← verde mais escuro (hover de botões)
  branco:      "#e6f1ff",  // ← cor do texto principal
  cinza:       "rgba(230,241,255,0.55)", // ← texto secundário/suave
};
```

### Exemplos práticos:
- Quer mudar o verde para roxo?
  → Troca `"#00e5a0"` por `"#a855f7"`
- Quer fundo mais escuro?
  → Troca `"#0d1b2a"` por `"#050d18"`
- Quer texto mais branco?
  → Troca `"rgba(230,241,255,0.55)"` por `"rgba(255,255,255,0.75)"`

---

## 👤 2. DADOS PESSOAIS — `src/data/conteudo.js` → PERFIL

```js
export const PERFIL = {
  nome:      "Lucas Cruz",           // ← seu nome completo
  titulo:    "Desenvolvedor Full Stack", // ← seu cargo/título
  descricao: "Apaixonado por...",    // ← frase curta sobre você
  email:     "lucasifrn2012@email.com",        // ← aparece na seção Contato
  whatsapp:  "5584992181512",        // ← número com DDI+DDD
  endereco:  "Ceará-Mirim, RN",      // ← sua cidade
  github:    "https://github.com/lucas-f-cruz",
  linkedin:  "hhttps://www.linkedin.com/in/lucasfcc/",
};
```

---

## 💻 3. CÓDIGO ANIMADO DO HERO — `src/data/conteudo.js` → CODIGO_HERO

Esse é o bloco de código que "digita" sozinho na tela inicial.
Cada linha tem um `tipo` que define a cor:

| tipo     | cor no código        | uso                        |
|----------|----------------------|----------------------------|
| chave    | branco               | chaves, propriedades       |
| bool     | verde                | true, false                |
| fn       | azul claro           | function, const            |
| retorno  | roxo                 | return, this               |

```js
{ tipo: "chave",   texto: "  nome: ",  valor: "'Lucas Cruz'," },
//                  ↑ texto cinza       ↑ valor em vermelho
```

### Como adicionar uma nova linha:
```js
{ tipo: "bool", texto: "  novaHabilidade: ", valor: "true," },
```

---

## 🛠️ 4. SKILLS — `src/data/conteudo.js` → SKILLS

```js
export const SKILLS = [
  {
    icon: "https://cdn.jsdelivr.net/.../react-original.svg", // ← URL do ícone
    nome: "React",   // ← nome que aparece embaixo do ícone
  },
];
```

### Como adicionar uma nova skill:
1. Busca o ícone em: **devicons.dev** ou **simpleicons.org**
2. Copia a URL do SVG
3. Adiciona no array:
```js
{ icon: "URL_DO_ICONE_AQUI", nome: "Nome da Tech" },
```

### Como remover uma skill:
Apaga a linha inteira, incluindo a vírgula no final.

---

## 💼 5. PROJETOS — `src/data/conteudo.js` → PROJETOS

```js
export const PROJETOS = [
  {
    nome:        "Nome do Projeto",       // ← aparece na lista
    ferramentas: ["React", "Node", "MySQL"], // ← tecnologias usadas
    funcao:      "Desenvolvedor Full Stack", // ← seu papel no projeto
    descricao:   "Descrição do projeto...",  // ← texto explicativo
    url:         "https://seu-site.vercel.app", // ← link do site ao vivo
    github:      "https://github.com/...",      // ← link do código
  },
];
```

### Como adicionar um novo projeto:
Copia o bloco acima, cola depois do último projeto
e preenche com as informações novas.
Lembre de colocar vírgula no final do bloco anterior!

---

## 🏢 6. EXPERIÊNCIAS — `src/data/conteudo.js` → EXPERIENCIAS

```js
export const EXPERIENCIAS = [
  {
    periodo: "2025 - Atual",               // ← período em texto livre
    cargo:   "Desenvolvedor Full Stack",    // ← nome do cargo
    empresa: "Nome da Empresa",            // ← empresa ou "Autônomo"
    desc:    "O que você fez lá...",       // ← descrição curta
  },
];
```

### Como adicionar nova experiência:
```js
{
  periodo: "2026 - Atual",
  cargo:   "Dev Frontend Sênior",
  empresa: "Empresa X",
  desc:    "Desenvolvimento de interfaces com React e TypeScript.",
},
```

---

## 🎓 7. FORMAÇÃO — `src/data/conteudo.js` → FORMACAO

```js
export const FORMACAO = [
  {
    periodo:     "2024 - Atual",       // ← período
    curso:       "Ciência da Computação", // ← nome do curso
    instituicao: "Universidade X",     // ← instituição
  },
];
```

---

## 🔗 8. MENU DE NAVEGAÇÃO — `src/data/conteudo.js` → NAV_LINKS

```js
export const NAV_LINKS = [
  { label: "Sobre",      id: "sobre"       },
  // label = texto que aparece no menu
  // id    = id da seção na página (tem que bater com o id do section)
];
```

### Como adicionar um item no menu:
```js
{ label: "Blog", id: "blog" },
```
Mas lembre: precisa criar a seção com `id="blog"` no `App.jsx` também!

---

## 🧩 9. ESTRUTURA DOS COMPONENTES

Cada seção da página é um arquivo separado em `src/components/`.
Você só deve mexer neles para mudar **layout ou estilo visual**,
não para mudar conteúdo (isso fica no `conteudo.js`).

| Arquivo                   | O que controla                        |
|---------------------------|---------------------------------------|
| `Navbar.jsx`              | Menu de navegação                     |
| `HeroSection.jsx`         | Seção inicial com código animado      |
| `SkillsSection.jsx`       | Grid de ícones de tecnologias         |
| `ExperienciaSection.jsx`  | Timeline de experiências              |
| `FormacaoSection.jsx`     | Timeline de formação                  |
| `ProjetosSection.jsx`     | Lista interativa de projetos          |
| `ContatoSection.jsx`      | Formulário e informações de contato   |
| `Footer.jsx`              | Rodapé                                |
| `Fade.jsx`                | Animação de entrada (não mexe aqui)   |

---

## ⚡ 10. FLUXO PARA ATUALIZAR O SITE

Toda vez que fizer uma mudança:

```bash
# 1. Salva o arquivo (Ctrl+S)
# 2. O navegador já atualiza sozinho (hot reload)

# 3. Quando estiver pronto, sobe para o GitHub:
git add .
git commit -m "descreva o que mudou"
git push

# 4. A Vercel atualiza o site sozinha em ~1 minuto
```

---

## 🚨 ERROS COMUNS

| Erro                        | Causa                              | Solução                          |
|-----------------------------|------------------------------------|----------------------------------|
| Tela branca no navegador    | Erro de sintaxe no código          | Veja o terminal — tem a linha    |
| Vírgula faltando            | Esqueceu a vírgula entre itens     | Coloca `,` no final do item      |
| Imagem não aparece          | URL errada ou sem conexão          | Testa a URL no navegador         |
| Mudança não apareceu        | Arquivo errado ou não salvou       | Ctrl+S e confere o arquivo       |
| npm run dev com erro        | Está na pasta errada               | `cd nome-da-pasta` e tenta de novo|

---

> 💡 **Dica final:** Sempre que travar em algo,
> cola o erro do terminal aqui no chat que resolvemos juntos!
