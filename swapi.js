const fetchSwapi = (type, num) =>
  fetch(`https://swapi.co/api/${type}/${num}/`)
    .then(resp => resp.json())

const getOpeningCrawl = () => {
  fetchSwapi('films', 1)
    .then(data => {
      crawlDiv = document.getElementById('crawlDiv')
      crawlDiv.innerText = data.opening_crawl
  })
}

const getPlanet = (event) => {
  event.preventDefault()
  const planetInput = parseInt(document.getElementById('planetInput').value)
  const planetData = document.getElementById('planetData')
  fetchSwapi('planets', planetInput)
    .then(data => {
      planetData.innerHTML =`
        <br />
        <p>Planet Name: ${data.name}.</p>
        <p>Climate: ${data.climate}.</p>
      `
    })
}

const getHomePlanet = (planetUrl, id) => {
  fetch(planetUrl)
    .then(resp => resp.json())
    .then(planet => {
      document.getElementById(`droid-${id}-homeworld`).innerText = planet.name
    })
}

const getDroids = () => {
  const droidIds = [2, 3]
  droidIds.map(id => {
    const droidName = document.getElementById(`droid-${id}-name`)
    const droidHeight = document.getElementById(`droid-${id}-height`)
    const droidMass = document.getElementById(`droid-${id}-mass`)
    const droidBtn = document.getElementById(`droid-${id}-btn`)
    fetchSwapi('people', id)
      .then(droid => {
        droidName.innerText = droid.name
        droidHeight.innerText = droid.height
        droidMass.innerText = droid.mass
        droidBtn.addEventListener('click', () => getHomePlanet(droid.homeworld, id) )
      })
  })
}

document.addEventListener('DOMContentLoaded', function() {
  const crawlBtn = document.getElementById('crawlBtn')
  crawlBtn.addEventListener('click', getOpeningCrawl)
  const planetForm = document.getElementById('planetForm')
  planetForm.addEventListener('submit', getPlanet)
  const droidsBtn = document.getElementById('find-droids')
  droidsBtn.addEventListener('click', getDroids)
})
