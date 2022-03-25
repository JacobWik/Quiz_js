
const highScoresList = document.querySelector('#highScoresList')
const highScores = JSON.parse(localStorage.getItem("highScores")) || []


// skapa en ny array med
highScoresList.innerHTML =  highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join("")