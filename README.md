# 🎨 Portfólio Artístico

Um site de portfólio moderno e responsivo para artistas, com funcionalidade para exibir desenhos e ilustrações de forma automática através de arquivos JSON.

## ✨ Características

- **Design Moderno**: Interface limpa e elegante com gradientes e animações
- **Responsivo**: Funciona perfeitamente em dispositivos móveis e desktop
- **Filtros**: Sistema de filtros por tipo de arte (Digital, Tradicional, Sketch)
- **Modal**: Visualização em tela cheia das imagens com informações detalhadas
- **Instagram**: Link direto para o perfil @mr.frappuccino
- **Atualização Automática**: Novas imagens são adicionadas automaticamente via JSON

## 🚀 Como Usar

### 1. Estrutura de Arquivos
```
Portfólio/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Funcionalidades JavaScript
├── portfolio-data.json # Dados das imagens
└── README.md           # Este arquivo
```

### 2. Adicionando Novas Imagens

Para adicionar novas imagens ao seu portfólio, você tem duas opções:

#### Opção A: Editar o arquivo JSON
Edite o arquivo `portfolio-data.json` e adicione novas entradas seguindo este formato:

```json
{
  "id": 7,
  "title": "Nome da Sua Arte",
  "imageUrl": "URL_DA_IMAGEM",
  "date": "2024-01-20",
  "type": "digital",
  "description": "Descrição da sua arte"
}
```

#### Opção B: Usar JavaScript
Você pode adicionar imagens dinamicamente usando JavaScript:

```javascript
// Adicionar nova imagem
PortfolioManager.addNewImage({
  id: 7,
  title: "Nova Arte",
  imageUrl: "URL_DA_IMAGEM",
  date: "2024-01-20",
  type: "digital",
  description: "Descrição da arte"
});
```

### 3. Tipos de Arte Suportados

- **digital**: Arte digital (Photoshop, Procreate, etc.)
- **traditional**: Arte tradicional (lápis, tinta, aquarela, etc.)
- **sketch**: Esboços e estudos

### 4. Configuração do GitHub

Para usar com GitHub Pages:

1. Faça upload dos arquivos para um repositório
2. Ative o GitHub Pages nas configurações do repositório
3. Coloque suas imagens em uma pasta do repositório
4. Atualize o `portfolio-data.json` com os links das imagens

**Exemplo de URL para imagens no GitHub:**
```
https://raw.githubusercontent.com/SEU_USUARIO/SEU_REPOSITORIO/main/images/nome-da-imagem.jpg
```

## 🎯 Funcionalidades

### Navegação
- Header fixo com navegação suave
- Seções: Início, Portfólio, Sobre, Contato

### Portfólio
- Grid responsivo de imagens
- Filtros por tipo de arte
- Modal para visualização detalhada
- Informações de data e tipo

### Responsividade
- Design adaptável para todos os dispositivos
- Menu responsivo para mobile
- Grid que se ajusta automaticamente

## 🛠️ Personalização

### Cores
As cores principais estão definidas no CSS:
- Gradiente principal: `#667eea` para `#764ba2`
- Cores de destaque: `#667eea`
- Fundo: `#fafafa`

### Fontes
O site usa a fonte Inter do Google Fonts. Para alterar, edite o link no HTML.

### Instagram
O link do Instagram está configurado para `@mr.frappuccino`. Para alterar, edite o HTML.

## 📱 Compatibilidade

- ✅ Chrome (recomendado)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Dispositivos móveis

## 🔧 Desenvolvimento

### Estrutura do JavaScript
- `loadPortfolioData()`: Carrega dados do JSON
- `renderPortfolio()`: Renderiza o grid de imagens
- `filterPortfolio()`: Aplica filtros
- `openImageModal()`: Abre modal da imagem

### API Pública
O site expõe uma API global `PortfolioManager` com métodos:
- `addNewImage(imageData)`: Adiciona nova imagem
- `updatePortfolioData(newData)`: Atualiza todos os dados
- `filterPortfolio(filter)`: Aplica filtro específico

## 📝 Exemplo de Uso Completo

```javascript
// Adicionar múltiplas imagens
const novasImagens = [
  {
    id: 8,
    title: "Arte 1",
    imageUrl: "https://exemplo.com/imagem1.jpg",
    date: "2024-01-25",
    type: "digital",
    description: "Descrição da arte 1"
  },
  {
    id: 9,
    title: "Arte 2",
    imageUrl: "https://exemplo.com/imagem2.jpg",
    date: "2024-01-26",
    type: "traditional",
    description: "Descrição da arte 2"
  }
];

// Atualizar portfólio
PortfolioManager.updatePortfolioData(novasImagens);
```

## 🌟 Dicas

1. **Otimize suas imagens** antes de fazer upload para melhor performance
2. **Use URLs diretas** para imagens (raw.githubusercontent.com para GitHub)
3. **Mantenha o JSON atualizado** sempre que adicionar novas imagens
4. **Teste em diferentes dispositivos** para garantir responsividade

## 📞 Suporte

Para dúvidas ou sugestões, entre em contato através do Instagram: [@mr.frappuccino](https://instagram.com/mr.frappuccino)

---

**Desenvolvido com ❤️ para artistas que amam compartilhar sua criatividade!** 