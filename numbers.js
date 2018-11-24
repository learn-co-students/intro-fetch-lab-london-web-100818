const fetchTrivia = num =>
  fetch(`http://numbersapi.com/${num}/trivia`)
    .then(resp => resp.text())

const showOneTrivia = () => {
  fetchTrivia(1)
    .then(trivia => {
      const oneFacts = document.getElementById('one-facts')
      oneFacts.innerText = trivia
    })
}

const showTrivia = event => {
  event.preventDefault()
  const factDiv = document.getElementById('random-math-fact')
  const numInput = document.getElementById('pick-a-number').value

  factDiv.innerHTML = ''
  
  if (isNaN(numInput)) {
    factDiv.innerText = 'please enter a valid number'
  } else {
  fetchTrivia(numInput)
    .then(trivia => {
      factDiv.innerText = trivia
    })
  }
}

const fetchYearFact = year =>
  fetch(`http://numbersapi.com/${year}/year`)
    .then(resp => resp.text())

const showYearFact = year => {
  const yearDiv = document.getElementById('year-history')

  yearDiv.innerHTML = ''

  fetchYearFact(year)
    .then(fact =>{
      yearDiv.innerText = fact
    })
}

const setYearFactInterval = () => {
  let year = new Date().getFullYear()
  showYearFact(year)
  setInterval( () => {
    --year
    showYearFact(year)
  }, 5000)
}

const fetchAllNumbers = () =>
  fetch('http://numbersapi.com/1..100')
    .then(resp => resp.json())

const showAllNumbers = () => {
  const allNumbersDiv = document.getElementById('all-the-numbers')

  allNumbersDiv.innerHTML = ''

  fetchAllNumbers()
    .then(allNumbers => {
      let htmlInsert = '<ul>'
      for(const number in allNumbers) {
        htmlInsert += `<li>${allNumbers[number]}</li>`
      }
      htmlInsert += '</ul>'
      allNumbersDiv.innerHTML = htmlInsert
    })
}

document.addEventListener('DOMContentLoaded', function() {
  const numOneBtn = document.getElementById('number-one')
  numOneBtn.addEventListener('click', showOneTrivia)
  const triviaInput = document.getElementById('pick-a-number')
  triviaInput.addEventListener('change', showTrivia)
  setYearFactInterval()
  const allNumsBtn = document.getElementById('all-numbers-button')
  allNumsBtn.addEventListener('click', showAllNumbers)
})