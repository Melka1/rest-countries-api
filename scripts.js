let countryList = [] //all the countries
let darkTheme = false
let countries;
let subSet = {}

function initialize(){
    $("main").children().remove()
    $("main").append(`
    <div class="search--control">
            <div class="search--bar ${darkTheme?'dark--search':''}">
                <span class="material-symbols-outlined">
                    search
                </span>
                <input id="search" type="text" onkeyup="handleSearch()" placeholder="Search for a country...">
            </div>
            <div class="choose--category ${darkTheme?'dark--nav':''}">
                <p onclick="showMenu()">Filter by Region</p>
                <span onclick="showMenu()" class="material-symbols-outlined">
                    expand_more
                </span>
                <div class="regions ${darkTheme?'dark--nav':''}">
                    <p onclick="searchByRegion('Africa')">Africa</p>
                    <p onclick="searchByRegion('Americas')">America</p>
                    <p onclick="searchByRegion('Asia')">Asia</p>
                    <p onclick="searchByRegion('Europe')">Europe</p>
                    <p onclick="searchByRegion('Oceania')">Oceania</p>
                </div>
            </div>
        </div>
        <div class="country--list" id="country--list"></div>`)
    fetch("./data.json")
    .then(res=>res.json())
    .then(data=>{
        countryList = data
        let countrySet = [...countryList]
        countrySet.length = 8
        console.log(data)
        countries = countrySet.map(item => {
            return (
                `<div onclick="displayCountryInfo('${item.alpha3Code}')" id=${item.numericCode} class="country--container ${darkTheme?'dark--nav':''}">
                    <img src=${item.flags.png} alt="">
                    <div class="country--desc">
                        <p class="country--name">${item.name}</p>
                        <p class="population">Population: <span>${covertNumber(item.population)}</span></p>
                        <p class="region">Region: <span>${item.region}</span></p>
                        <p class="capital">Capital: <span>${item.capital}</span></p>
                    </div>
                </div>`
            )
        })
        $("#country--list").append(countries)
        countryList.forEach(element => {
            subSet[element.alpha3Code] = element.name
        });
    })
}

initialize()

function searchByRegion(e){
    country = countryList.filter(item => item.region == e)
    countries = country.map(item => {
        return (
            `<div onclick="displayCountryInfo('${item.alpha3Code}')" id=${item.numericCode} class="country--container ${darkTheme?'dark--nav':''}">
                <img src=${item.flags.png} alt="${item.name+" flag"}">
                <div class="country--desc">
                    <p class="country--name">${item.name}</p>
                    <p class="population">Population: <span>${covertNumber(item.population)}</span></p>
                    <p class="region">Sub-region: <span>${item.subregion}</span></p>
                    <p class="capital">Capital: <span>${item.capital}</span></p>
                    <p class="capital">Demonym: <span>${item.demonym}</span></p>
                </div>
            </div>`
        )
    })
    $("#country--list").children().remove();
    $("#country--list").append(countries)
    $(".regions").toggle()
    console.log(countries)
}

function showMenu(){
    $(".regions").toggle()
}

function handleSearch(){
    country = []
    console.log($("#search").val())
    fetch("./data.json")
    .then(res=>res.json())
    .then(data=>{
        let choice = $("#search").val()
        country = data.filter(con => {
            return con["name"].toLowerCase().match(choice)
        })
        countries = country.map(item => {
            return (
                `<div onclick="displayCountryInfo('${item.alpha3Code}')" id=${item.numericCode} class="country--container ${darkTheme?'dark--nav':''}">
                    <img src=${item.flags.png} alt="${item.name+" flag"}">
                    <div class="country--desc">
                        <p class="country--name">${item.name}</p>
                        <p class="population">Population: <span>${covertNumber(item.population)}</span></p>
                        <p class="region">Region: <span>${item.region}</span></p>
                        <p class="capital">Capital: <span>${item.capital}</span></p>
                    </div>
                </div>`
            )
        })
        console.log(countries)
        $("#country--list").children().remove();
        $("#country--list").append(countries)
    })
}

function handleTheme(){
    darkTheme = !darkTheme
    if(darkTheme){
        $("#theme").addClass("kind")
        $("nav").addClass("dark--nav")
        $("body").addClass("dark--body")
        $(".country--container").addClass("dark--nav")
        $(".country--info").addClass("dark--words")
        $(".search--bar").addClass("dark--search")
        $(".choose--category").addClass("dark--nav")
        $(".regions").addClass("dark--nav")
        $(".border--countries button").addClass("dark--nav")
        $(".back").addClass("dark--nav")

    } else {
        $("#theme").removeClass("kind")
        $("nav").removeClass("dark--nav")
        $("body").removeClass("dark--body")
        $(".country--container").removeClass("dark--nav")
        $(".search--bar").removeClass("dark--search")
        $(".choose--category").removeClass("dark--nav")
        $(".regions").removeClass("dark--nav")
        $(".country--info").removeClass("dark--words")
        $(".border--countries button").removeClass("dark--nav")
        $(".back").removeClass("dark--nav")
    }
}

function displayCountryInfo(id){
   
            country = countryList.filter(item => item.alpha3Code == id)
            console.log(country)    
            countryInfo = `
            <div id="country--preview" class="country--preview">
            <div onclick="initialize()" class="back ${darkTheme?'dark--nav':''}">
                <span class="material-symbols-outlined">
                keyboard_backspace
                </span>
                <p>Back</p>
            </div>
            <div class="preview--pane">
                <div class="flag">
                    <img src="${country[0].flags.svg}" alt="${country[0].name+" flag"}">
                </div>
                <div class="country--info ${darkTheme?'dark--words':''}">
                    <h1 class="name">${country[0].name}</h1>
                    <div class="desc--pane">
                        <div class="pane1">
                            <p class="native--name">Native Name: <span>${country[0].nativeName}</span></p>
                            <p class="population">Population: <span>${covertNumber(country[0].population)}</span></p>
                            <p class="region">Region: <span>${country[0].region}</span></p>
                            <p class="sub--region">Sub Region: <span>${country[0].subregion}</span></p>
                            <p class="capital">Capital: <span>${country[0].capital}</span></p>
                        </div>
                        <div class="pane2">
                            <p class="domain">Top Level Domain: <span>${country[0].topLevelDomain}</span></p>
                            <p class="currency">Currencies: <span>${country[0].currencies.map(curr=>curr.name).join(", ")}</span></p>
                            <p class="language">Languages: <span>${country[0].languages.map(lang=>lang.name).join(", ")}</span></p>
                        </div>
                    </div>
                    ${country[0].borders?`
                    <div class="border--countries">
                            <p class="border--list">Border Countries:</p>
                            ${country[0].borders.map(border=>{
                                return `<button class="${darkTheme?'dark--nav':''}" onclick="displayCountryInfo('${border}')" >${subSet[border]}</button>`
                            }).join("")}
                        </div>
                    `:""
                    }
                </div>
            </div>
        </div>`

        console.log(countryInfo)
        $("main").children().remove()
        $("main").append(countryInfo)
}

function covertNumber(num){
    let count = 0
    let strArr = [...(num+'')]
    let correct = ''
    for(let i=strArr.length-1; i>=0; i--){
        correct = strArr[i] + correct
        count ++;
        if(count === 3&&i!=0){
            correct = ',' + correct
            count = 0
        }
    }
    return correct
}