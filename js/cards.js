document.getElementById('btnBack').addEventListener('click', () => {
  window.location.href = '/cards.html'
})

document.getElementById('btnHome').addEventListener('click', () => {
  window.location.href = '/index.html'
})

let perguntas = []
let perguntaAtual = 0
let respondeu = false

async function carregarPerguntas() {
  try {
    const response = await fetch(jsonFile)
    perguntas = await response.json()

    embaralharPerguntas()  // Faz o shuffle aqui antes de exibir
    mostrarPergunta()
  } catch (error) {
    document.getElementById('pergunta').textContent = 'Erro ao carregar as perguntas.'
    console.error('Erro ao carregar o JSON:', error)
  }
}

// Função para embaralhar o array (algoritmo Fisher-Yates)
function embaralharPerguntas() {
  for (let i = perguntas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = perguntas[i]
    perguntas[i] = perguntas[j]
    perguntas[j] = temp
  }
}

function mostrarPergunta() {
  respondeu = false
  const perguntaObj = perguntas[perguntaAtual]
  const perguntaDiv = document.getElementById('pergunta')
  const opcoesDiv = document.getElementById('opcoes')
  const feedbackDiv = document.getElementById('feedback')
  const explicacaoDiv = document.getElementById('explicacao')
  const nextBtn = document.getElementById('nextBtn')

  perguntaDiv.textContent = perguntaObj.pergunta
  opcoesDiv.innerHTML = ''
  feedbackDiv.textContent = ''
  feedbackDiv.className = ''
  explicacaoDiv.textContent = ''
  nextBtn.style.display = 'none'

  for (const letra in perguntaObj.opcoes) {
    const opcaoTexto = perguntaObj.opcoes[letra]
    const opcaoBtn = document.createElement('div')
    opcaoBtn.className = 'option'
    opcaoBtn.textContent = `${letra.toUpperCase()}: ${opcaoTexto}`
    opcaoBtn.dataset.letra = letra
    opcaoBtn.addEventListener('click', () => selecionarResposta(letra, opcaoBtn))
    opcoesDiv.appendChild(opcaoBtn)
  }
}

function selecionarResposta(letra, divSelecionada) {
  if (respondeu) return // bloqueia múltiplos cliques
  respondeu = true

  const perguntaObj = perguntas[perguntaAtual]
  const opcoesDiv = document.getElementById('opcoes')
  const feedbackDiv = document.getElementById('feedback')
  const explicacaoDiv = document.getElementById('explicacao')
  const nextBtn = document.getElementById('nextBtn')

  // Desabilitar todas opções
  Array.from(opcoesDiv.children).forEach(div => div.style.pointerEvents = 'none')

  // Marcar a opção selecionada
  divSelecionada.classList.add('selected')

  // Marcar corretas e erradas
  for (const div of opcoesDiv.children) {
    if (div.dataset.letra === perguntaObj.resposta) {
      div.classList.add('correct')
    } else if (div === divSelecionada && letra !== perguntaObj.resposta) {
      div.classList.add('incorrect')
    }
  }

  // Feedback
  if (letra === perguntaObj.resposta) {
    feedbackDiv.textContent = '✔️ Acertou!'
    feedbackDiv.classList.add('acertou')
    feedbackDiv.classList.remove('errou')
  } else {
    feedbackDiv.textContent = '❌ Errou!'
    feedbackDiv.classList.add('errou')
    feedbackDiv.classList.remove('acertou')
  }

  // Explicação
  explicacaoDiv.textContent = perguntaObj.explicacao

  // Mostrar botão próxima
  nextBtn.style.display = 'inline-block'
}

document.getElementById('nextBtn').addEventListener('click', () => {
  perguntaAtual++
  if (perguntaAtual >= perguntas.length) {
    alert('Você terminou todas as perguntas!')
    perguntaAtual = 0 // ou pode redirecionar, reiniciar ou mostrar uma tela final
  }
  mostrarPergunta()
})

carregarPerguntas()
