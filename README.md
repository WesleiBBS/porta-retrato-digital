# 🖼️ Porta-Retrato Digital PWA

Um aplicativo Progressive Web App (PWA) completo para tablets em modo retrato, funcionando como um porta-retrato digital inteligente com assistente de voz e sistema de agendamento de recados.

## ✨ Funcionalidades

### 📸 Carrossel de Fotos
- **Troca automática**: As fotos mudam automaticamente a cada 10 segundos
- **Upload de fotos**: Adicione suas próprias fotos através do botão "Adicionar Fotos"
- **Remoção de fotos**: Remova fotos indesejadas com o botão de lixeira
- **Contador visual**: Mostra qual foto está sendo exibida (ex: "3 de 5")
- **Fotos de exemplo**: Vem com belas imagens de paisagens pré-carregadas

### 🕐 Relógio e Data
- **Relógio digital**: Exibe hora atual em formato brasileiro (HH:MM:SS)
- **Data completa**: Mostra dia da semana, dia, mês e ano em português
- **Atualização em tempo real**: Atualiza automaticamente a cada segundo

### 🗣️ Assistente de Voz
- **Anúncios automáticos**: Fala a hora atual a cada 30 minutos (00 e 30 minutos)
- **Síntese de voz**: Utiliza a Web Speech API com voz em português brasileiro
- **Controle de áudio**: Botão para ativar/desativar a assistente de voz
- **Feedback de ações**: Confirma agendamentos e outras ações por voz

### 📅 Sistema de Agendamento
- **Interface intuitiva**: Modal elegante para agendar lembretes
- **Campos completos**: Data, horário e mensagem personalizável
- **Notificações por voz**: A assistente fala o lembrete no horário agendado
- **Gerenciamento**: Visualize e remova lembretes agendados
- **Persistência**: Lembretes são mantidos durante a sessão

### 📱 PWA (Progressive Web App)
- **Instalável**: Pode ser instalado como app nativo no dispositivo
- **Offline**: Funciona mesmo sem conexão à internet (após primeira carga)
- **Responsivo**: Otimizado para tablets em modo retrato
- **Service Worker**: Cache inteligente para melhor performance

## 🚀 Como Usar

### Instalação e Execução

1. **Abra o projeto no VS Code**:
   ```bash
   code porta-retrato-digital
   ```

2. **Instale as dependências**:
   ```bash
   cd porta-retrato-digital
   pnpm install
   ```

3. **Execute o servidor de desenvolvimento**:
   ```bash
   pnpm run dev --host
   ```

4. **Acesse no navegador**:
   - Abra `http://localhost:5173` (ou a porta indicada no terminal)

### Instalação como PWA

1. **No navegador**, clique no ícone de instalação na barra de endereços
2. **Ou** acesse o menu do navegador e selecione "Instalar aplicativo"
3. **O app** será instalado como aplicativo nativo no seu dispositivo

## 🎮 Controles

### Botões Principais

- **📤 Adicionar Fotos**: Upload de novas imagens para o carrossel
- **🔊/🔇 Áudio**: Liga/desliga a assistente de voz
- **💬 Agendar Recado**: Abre o modal de agendamento de lembretes
- **🗑️ Remover Foto**: Remove a foto atual do carrossel (aparece sobre a imagem)

### Agendamento de Lembretes

1. Clique em **"Agendar Recado"**
2. Selecione a **data** desejada
3. Defina o **horário** (formato 24h)
4. Digite sua **mensagem** de lembrete
5. Clique em **"Agendar Lembrete"**

## 🛠️ Tecnologias Utilizadas

- **React 18**: Framework principal
- **Vite**: Build tool e servidor de desenvolvimento
- **Tailwind CSS**: Estilização responsiva
- **shadcn/ui**: Componentes de interface elegantes
- **Lucide React**: Ícones modernos
- **Web Speech API**: Síntese de voz
- **Service Worker**: Funcionalidade PWA
- **Framer Motion**: Animações suaves

## 📁 Estrutura do Projeto

```
porta-retrato-digital/
├── public/
│   ├── manifest.json          # Configuração PWA
│   └── sw.js                  # Service Worker
├── src/
│   ├── components/ui/         # Componentes shadcn/ui
│   ├── assets/               # Imagens e recursos
│   ├── App.jsx               # Componente principal
│   ├── App.css               # Estilos personalizados
│   ├── main.jsx              # Ponto de entrada
│   └── index.css             # Estilos globais
├── package.json              # Dependências
└── README.md                 # Este arquivo
```

## 🎨 Personalização

### Alterando Fotos Padrão
Edite o array `photos` no arquivo `src/App.jsx`:
```javascript
const [photos, setPhotos] = useState([
  'sua-imagem-1.jpg',
  'sua-imagem-2.jpg',
  // ... mais imagens
])
```

### Configurando Intervalos
- **Troca de fotos**: Altere `10000` (10 segundos) na linha do `setInterval`
- **Anúncios de voz**: Modifique a condição `(minutes === 0 || minutes === 30)`

### Personalizando Cores
Edite as variáveis CSS no arquivo `src/App.css` ou use classes Tailwind diferentes.

## 🔧 Scripts Disponíveis

- `pnpm run dev`: Inicia servidor de desenvolvimento
- `pnpm run build`: Gera build de produção
- `pnpm run preview`: Visualiza build de produção
- `pnpm run lint`: Executa linter ESLint

## 📱 Compatibilidade

- **Navegadores**: Chrome, Firefox, Safari, Edge (versões modernas)
- **Dispositivos**: Tablets, smartphones, desktops
- **Orientação**: Otimizado para modo retrato
- **PWA**: Suporte completo em navegadores compatíveis

## 🎯 Recursos Avançados

### Síntese de Voz
- Utiliza a Web Speech API nativa do navegador
- Configurada para português brasileiro
- Taxa de fala e tom ajustáveis no código

### Armazenamento Local
- Lembretes são mantidos na memória durante a sessão
- Fotos carregadas permanecem até o refresh da página
- Para persistência permanente, pode ser integrado localStorage

### Responsividade
- Layout adaptável para diferentes tamanhos de tela
- Otimizado especialmente para tablets em modo retrato
- Funciona bem em smartphones e desktops

## 🚨 Notas Importantes

1. **Permissões de Áudio**: O navegador pode solicitar permissão para síntese de voz
2. **HTTPS**: Para PWA completo, recomenda-se servir via HTTPS em produção
3. **Autoplay**: Alguns navegadores podem bloquear áudio automático inicialmente
4. **Performance**: Para muitas fotos, considere otimização de imagens

## 📞 Suporte

Este é um projeto completo e funcional. Para dúvidas ou melhorias:
- Verifique o console do navegador para logs de debug
- Teste as funcionalidades em diferentes navegadores
- Considere as permissões de áudio do navegador

---

**Desenvolvido com ❤️ para criar uma experiência de porta-retrato digital única e inteligente!**

