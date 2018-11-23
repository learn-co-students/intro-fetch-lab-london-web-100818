// Write your numbers code in this file!


function getElement(string){
    return document.querySelector(string);
}

yearFactInterval();
getElement("#crawlBtn").addEventListener("click", getOpeningCrawl);
getElement("#planetForm").addEventListener("submit", getPlanet);
getElement("#number-one").addEventListener("click", random1Fact);
getElement("#pick-a-number").addEventListener("change", e => numberOnChange(e))
getElement("#all-numbers-button").addEventListener("click", allNumberFacts)

function fetchData(type, id){
    return fetch(`https://swapi.co/api/${type}/${id}/`)
        .then(res => res.json());
}

function getOpeningCrawl(){
    fetchData("films", "1")
        .then(json => JSON.stringify(json))
        .then(data => getElement("#crawlDiv").innerHTML = data);
    
}

function fetchNumber(number){
    return fetch(`http://numbersapi.com/${number}/trivia`)
        .then(res => res.text());
        
}

function fetch100Numbers(){
    return fetch('http://numbersapi.com/1..100')
        .then(res => res.json());
}

function fetchYear(year){
    return fetch(`http://numbersapi.com/${year}/year`)
        .then(res => res.text());
}

function showYear(year){
    fetchYear(year).then(fact => getElement("#year-history").innerHTML = fact);
}

function allNumberFacts(){
    
    const element = document.createElement("ul");
    fetch100Numbers().then(data => {
        getElement("#all-the-numbers").innerHTML = ""
        for(let fact in data){
            const list = document.createElement("li");
            list.innerText = data[fact];
            element.appendChild(list);
        }
        getElement("#all-the-numbers").appendChild(element);
    });
}

function yearFactInterval(){
    let year = new Date().getFullYear();
    showYear(year);
    setInterval(() =>{
        year--;
        showYear(year);
    }, 5000)
}

function numberOnChange(e){
    e.preventDefault()
    const number = getElement("#pick-a-number").value
    if(isNaN(parseInt(number))){
        getElement("#random-math-fact").innerText = "please enter a valid number"
    } else {
        fetchNumber(number).then(fact => {
            getElement("#random-math-fact").innerText = fact;
        });   
    }
}

function random1Fact(){
    fetchNumber(1).then(fact => {
        getElement("#one-facts").innerText = fact});
}

function getPlanet(){
    const planetId = getElement("#planetInput").value;
    getElement("#planetData").innerHTML = "";
    if(planetId <= 0 || planetId > 60){
        getElement("#planetData").innerHTML = "Please enter a number between 1 and 60.";
    } else{
        fetchData("planets", planetId)
            .then(data => 
                getElement("#planetData").innerHTML 
                    = `name: ${data.name}
                    <br>climate: ${data.climate}`);
        }
}

function getDroids(){
    getDroid("#droid-2", 2);
    getDroid("#droid-3", 3);
}

function homePlanetButton(className, id){   
    const btn = document.createElement("button");
    btn.className = `${className}-btn`;
    btn.innerText = `Get home planet`;
    const homeworld = fetchData("people", id)
                        .then(data => data.homeworld)
                        .then(world => fetch(world))
                        .then(res => res.json());
    btn.addEventListener("click", () =>{
        homeworld.then(world => {
            getElement(className).innerHTML += world.name;
        })
        
    })
    return btn;
}

function getDroid(element, id){
    fetchData("people", id)
            .then(data => {
                getElement(element).innerHTML 
                    = `<hr>name: ${data.name}
                        <br>height: ${data.height}
                        <br>mass: ${data.mass}
                        <br>`;
                
                getElement(element).appendChild(homePlanetButton(element, id));});
    

}

getDroids();



    

