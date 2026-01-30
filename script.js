const questions = [
    { q: "¿Qué empresa creó el iPhone?", options: ["Microsoft", "Apple", "Google", "Sony"], correct: 1 },
    { q: "¿En qué país se originaron los Juegos Olímpicos?", options: ["Italia", "Francia", "Grecia", "España"], correct: 2 },
    { q: "¿Cuál es el planeta más grande del sistema solar?", options: ["Marte", "Saturno", "Júpiter", "Neptuno"], correct: 2 },
    { q: "¿Quién pintó la 'Mona Lisa'?", options: ["Van Gogh", "Picasso", "Da Vinci", "Dali"], correct: 2 },
    { q: "¿Qué lenguaje se usa para dar estilo a la web?", options: ["Python", "CSS", "Java", "PHP"], correct: 1 },
    { q: "¿En qué año se hundió el Titanic?", options: ["1912", "1905", "1920", "1898"], correct: 0 },
    { q: "¿Cuántos jugadores tiene un equipo de fútbol?", options: ["10", "12", "11", "9"], correct: 2 },
    { q: "¿Cuál es la empresa que subvenciona este curso?", options: ["SOIB", "Fundae", "Asociación", "Instituto"], correct: 0 },
    { q: "¿Cuál es la moneda oficial de Japón?", options: ["Yuan", "Won", "Dólar", "Yen"], correct: 3 },
    { q: "¿Cuál es el módulo al que pertenece este examen?", options: ["Primero", "Segundo", "Tercero", "Cuarto"], correct: 2 }
];

let currentQuestionIndex = 0;
let score = 0;

// Elementos del DOM
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const progressBar = document.getElementById('progress-bar');
const counterText = document.getElementById('question-counter');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.innerText = currentQuestion.q;
    counterText.innerText = `Pregunta ${currentQuestionIndex + 1} de ${questions.length}`;
    
    // Actualizar barra de progreso
    const progress = (currentQuestionIndex / questions.length) * 100;
    progressBar.style.width = `${progress}%`;

    optionsContainer.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        button.onclick = () => checkAnswer(index, button);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedIndex, btn) {
    const correctIndex = questions[currentQuestionIndex].correct;
    const buttons = optionsContainer.querySelectorAll('.option-btn');

    // Deshabilitar otros botones
    buttons.forEach(b => b.classList.add('disabled'));

    if (selectedIndex === correctIndex) {
        btn.classList.add('correct');
        score++;
    } else {
        btn.classList.add('incorrect');
        buttons[correctIndex].classList.add('correct'); // Mostrar la correcta
    }

    // Esperar un segundo y pasar a la siguiente
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 1200);
}

function showResults() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    progressBar.style.width = `100%`;

    const percentage = (score / questions.length) * 100;
    document.getElementById('final-score').innerText = score;
    document.getElementById('percentage').innerText = `${percentage}% de aciertos`;

    let message = "";
    if (score <= 4) message = "Necesitas repasar más";
    else if (score <= 7) message = "¡Bien hecho! Vas por buen camino";
    else message = "¡Excelente! Dominas el tema";

    document.getElementById('result-message').innerText = message;
}

document.getElementById('restart-btn').onclick = () => {
    currentQuestionIndex = 0;
    score = 0;
    resultScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    loadQuestion();
};

// Iniciar
loadQuestion();