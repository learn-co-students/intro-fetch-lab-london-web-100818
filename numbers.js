// Write your numbers code in this file!

// SWAPI opening crawl

const getCrawlBtn = document.querySelector('#crawlBtn')
const getCrawlDiv = document.querySelector('#crawlDiv')

getCrawlBtn.addEventListener('click', function() {
    return promiseForData = fetch('https://swapi.co/api/films/1/')
        .then(res => res.json())
        .then(res => addCrawl(res))

    function addCrawl(res) {
        getCrawlDiv.innerHTML = `<p>${res.opening_crawl}</p>`
    }
})

// SWAPI get planets

const planetForm = document.querySelector('#planetForm')
const planetInput = document.querySelector('#planetInput')
const planetDiv = document.querySelector('#planetData')

planetForm.addEventListener('submit', function(e) {
    e.preventDefault()

    fetch(`https://swapi.co/api/planets/${planetInput.value}/`)
        .then(res => res.json())
        .then(res => addPlanet(res))
        

    function addPlanet(res) {
        planetDiv.innerHTML = `
            <p>Planet Name: ${res.name}</p>
            <p>Planet Climate: ${res.climate}</p>
        `
    }
})

// Find these droids

// const droid2 = document.querySelector('#droid-2')
// const droid3 = document.querySelector('#droid-3')

// document.addEventListener('DOMContentLoaded', function(e) {
//     this.console.log('load')
//     e.preventDefault()

//     fetch("https://swapi.co/api/people/2/")
//         .then(res => res.json())
//         .then(resp => console.log(resp))

//         function addCharacter(res) {
//             droid2.innerHTML = `<p>${res.name}</p>`
//         }
// })

// number one

const numberOneBtn = document.querySelector('#number-one')
const numberOneDiv = document.querySelector('#one-facts')

numberOneBtn.addEventListener('click', function() {
    fetch('http://numbersapi.com/1/trivia')
        .then(res => res.text())
        .then(res => numberOneDiv.innerHTML = `${res}`)

})


/// PICK A NUMBER

const numberInput = document.querySelector('#pick-a-number')
const numberDiv = document.querySelector('#random-math-fact')

numberInput.addEventListener('change', function () {
    let number = numberInput.value
    if (isNaN(number)) {
        numberDiv.innerHTML = 'please enter a valid number'
    } else {
        fetch(`http://numbersapi.com/${number}/trivia`)
            .then(res => res.text())
            .then(res => numberDiv.innerHTML = `${res}`)
    }
})


// THOSE WHO FAIL TO STUDY HISTORY

const historyDiv = document.querySelector('#year-history')


const getFactAndAdd = (year) => {
    fetch(`http://numbersapi.com/${year}/year`)
    .then(response => response.text())
    .then(addToHistoryDiv)
    
}

function addToHistoryDiv(response) {
    historyDiv.innerHTML = response
}

function setFactInterval() {
    let year = new Date().getFullYear();
    getFactAndAdd(year)
    setInterval(() => {
        getFactAndAdd(year)
        year--
    }, 5000)
}

document.addEventListener('DOMContentLoaded', function () {
    setFactInterval()
})


// All of the numbers


let allNumbersButton = document.querySelector('#all-numbers-button')

allNumbersButton.addEventListener('click', showAllTheNumbers)


function getAllTheNumbers() {
    return fetch('http://numbersapi.com/1..100').then(res => res.json())
}

function showAllTheNumbers() {
    const div = document.querySelector('#all-the-numbers')
    div.innerHTML = ''
    getAllTheNumbers().then(numbers => {
        let html = '<ul>'
        for (key in numbers) {
            html += `<li>${numbers[key]}</li>`
        }
        html += '</ul>'
        div.innerHTML = html
    })
}

// COULDN'T GET TEST TO PASS BUT FUNCTIONALLY WORKED GOOD

// const numbersButton = document.querySelector('#all-numbers-button')
// const ulEl = document.createElement('ul')

// function getAndAddNumberFacts() {
//     getNumberFacts()
//         .then(addNumberFacts)
// }

// function getNumberFacts() {
    

//     fetch('http://numbersapi.com/1..100')
//         .then(response => response.json())
//         .then(addNumberFacts)
// }

// function addNumberFacts(numberFacts) {
//     const numbersDiv = document.querySelector('#all-the-numbers')
//     numbersDiv.innerHTML = ''
//     numbersDiv.appendChild(ulEl)
//     for(const number in numberFacts) {
//         const liEl = document.createElement('li')
//         ulEl.appendChild(liEl)
//         liEl.innerText = numberFacts[number]
//     } 
// }

    
    
   