// Declaração de variaveis
const question          = document.querySelector("#question");
const answersBox        = document.querySelector("#answers-box");
const quizzContainer    = document.querySelector("#quiz-container");
const scoreContainer    = document.querySelector("#score-container");
const letters           = ["a","b","c","d"];
let points              = 0;
let actualQuestion      = 0;

// Perguntas
const questions = [
    {
      "question": "PHP foi desenvolvido para qual fim?",
      "answers": [
        {
          "answer": "back-end",
          "correct": true
        },
        {
          "answer": "front-end",
          "correct": false
        },
        {
          "answer": "Sistema operacional",
          "correct": false
        },
        {
          "answer": "Banco de dados",
          "correct": false
        },
      ]
    },
    {
      "question": "Uma forma de declarar variável em JavaScript:",
      "answers": [
        {
          "answer": "$var",
          "correct": false
        },
        {
          "answer": "var",
          "correct": true
        },
        {
          "answer": "@var",
          "correct": false
        },
        {
          "answer": "#let",
          "correct": false
        },
      ]
    },
    {
      "question": "Qual o seletor de id no CSS?",
      "answers": [
        {
          "answer": "#",
          "correct": true
        },
        {
          "answer": ".",
          "correct": false
        },
        {
          "answer": "@",
          "correct": false
        },
        {
          "answer": "/",
          "correct": false
        },
      ]
    },
  ]
  
// Substituição do quizz para a primeira pergunta
function init() {
    // crir a primeira pergunta
    createQuestion(0);
}

// Cria uma pergunta
function createQuestion(i) {
    // Limpar a questão anterior
    const oldButtons = answersBox.querySelectorAll("button");

    oldButtons.forEach(function(btn) {
        btn.remove();
    })

    // Alterar o texto da pergunta
    const questionText = question.querySelector("#question-text");
    const questionNumber = question.querySelector("#question-number");

    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1;

    // Insere as alternativas
    questions[i].answers.forEach(function(answer, i) {      // Chama as respostas do array, conforme i, Enquanto tiver dados no array, função

        // Cria o template do botão quizz
        const answerTemplate = document.querySelector(".answer-template").cloneNode(true);

        const letterBtn = answerTemplate.querySelector(".btn-letter");
        const answerText = answerTemplate.querySelector(".question-answer");            

        letterBtn.textContent = letters[i];
        answerText.textContent = answer['answer'];

        answerTemplate.setAttribute("correct-answer", answer["correct"]);

        // Remover hide e template class
        answerTemplate.classList.remove("hide");
        answerTemplate.classList.remove("answer-template");

        // Inserir a alternaiva na tela
        answersBox.appendChild(answerTemplate);

        // Inserir um evento de clic no botão
        answerTemplate.addEventListener("click", function() {
            checkAnswer(this);
        })
    })
    actualQuestion++;
}

// Verificando resposta do usuário
function checkAnswer(btn) {
    // Seleciona todos os botões
    const buttons = answersBox.querySelectorAll("button");

    // Verifica se a resposta está correta e adiciona classes nos botões
    buttons.forEach(function(button) {
        if(button.getAttribute("correct-answer") === "true") {
            button.classList.add("correct-answer");

            // Checa se o usuário acertou a pergunta
            if (btn === button) {
                // incremento dos pontos
                points++;
            }
        } else {
            button.classList.add("wrong-answer");
        }
    })
    // Exibir a próxima pergunta
    nextQuestion();
}

// Exibe a próxima pergunta no quizz
function nextQuestion() {
    setTimeout(function() {                         // Timer para usuário ver as respostas
        if(actualQuestion >= questions.length) {    // Verifica se ainda há perguntas
            showSucessMessage();                    // Chama a tela de sucesso, fim do quiz
            return;
        }

        createQuestion(actualQuestion);             // Chama a função create question, passando como parâmetro a questão atual
    }, 1500);
}

function showSucessMessage() {                      // Exibe a tela final
    
    hideOrShowQuizz();                              // Função para chamar ou esconder o Quizz
    
    

    // trocar dados da tela de sucesso

    // calcular o score
    const score = ((points /questions.length) *100).toFixed(2);          // Com toFixed, limitamos 2 casas após a virgula
    const displayScore = document.querySelector("#display-score span"); // chamo display score
    displayScore.textContent = score.toString();                        // Converto o valor para String

    // Alterar o número de perguntas corretas
    const correctAnswers = document.querySelector("#correct-answers");  // Declara id correct-answers
    correctAnswers.textContent = points;                                // Informa os valores acertados

    // Alterar o total de perguntas
    const totalQuestions = document.querySelector("#questions-qty");
    totalQuestions.textContent = questions.length;
}

function hideOrShowQuizz() {                        // Função para chamar ou esconder o Quizz
    quizzContainer.classList.toggle("hide");        // Com toggle, vou inserir a class hide se não tiver, e tirar se tiver
    scoreContainer.classList.toggle("hide");
}

// Reiniciar Quizz
const restarBtn = document.querySelector("#restart");
restarBtn.addEventListener("click", function() {
    // Zerar jogo
    actualQuestion = 0;
    points = 0;
    hideOrShowQuizz();
    init();
})

// Inicizalização do Quizz
init();