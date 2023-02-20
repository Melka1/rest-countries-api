let country = []
let countries;
fetch("./data.json")
    .then(res=>res.json())
    .then(data=>{
        data.length = 8;
        country = data
        console.log(data)
        countries = country.map(item => {
            return (
                `<div id=${item.numericCode} class="country--container">
                    <img src=${item.flags.png} alt="">
                    <div class="country--desc">
                        <p class="country--name">${item.name}</p>
                        <p class="population">Population: <span>${item.population}</span></p>
                        <p class="region">Region: <span>${item.region}</span></p>
                        <p class="capital">Capital: <span>${item.capital}</span></p>
                    </div>
                </div>`
            )
        })
        console.log(countries)
        $("#country--list").append(countries)
    })
console.log(countries)

function searchByRegion(e){
    fetch("./data.json")
    .then(res=>res.json())
    .then(data=>{
        // data.length = 8;
        country = data.filter(con=>con.region == e)
        console.log(country)
        countries = country.map(item => {
            return (
                `<div id=${item.numericCode} class="country--container">
                    <img src=${item.flags.png} alt="">
                    <div class="country--desc">
                        <p class="country--name">${item.name}</p>
                        <p class="population">Population: <span>${item.population}</span></p>
                        <p class="region">Sub-region: <span>${item.subregion}</span></p>
                        <p class="capital">Capital: <span>${item.capital}</span></p>
                        <p class="capital">Demonym: <span>${item.demonym}</span></p>
                    </div>
                </div>`
            )
        })
        console.log(countries)
        $("#country--list").children().remove();
        $("#country--list").append(countries)
        $(".regions").toggle()
    })
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
        // data.length = 8;
        let choice = $("#search").val()
        console.log(typeof choice)
        country = data.filter(con => {
            // console.log(con.name, con["name"])
            return con["name"].toLowerCase().match(choice)
        })
        countries = country.map(item => {
            return (
                `<div id=${item.numericCode} class="country--container">
                    <img src=${item.flags.png} alt="">
                    <div class="country--desc">
                        <p class="country--name">${item.name}</p>
                        <p class="population">Population: <span>${item.population}</span></p>
                        <p class="region">Region: <span>${item.region}</span></p>
                        <p class="capital">Capital: <span>${item.capital}</span></p>
                        
                    </div>
                </div>`
            )
        })
        console.log(countries)
        $("#country--list").children().remove();
        $("#country--list").append(countries)
        $(".regions").toggle()
    })
    console.log(countries)
}