
const pokemonContainer = document.querySelector("#row-pokemons");

const pokemonName = document.querySelector("#nombre");
const pokemonType = document.querySelector("#tipo");
const pokemonWeight = document.querySelector("#peso");
const pokemonHeight = document.querySelector("#altura");

const obtenerPokemones = async () => {
  const response = await fetch ("https://pokeapi.co/api/v2/pokemon?limit=50");
  const data = await response.json();
  console.log(data.results);
  setPokemonsInView (data.results);
};

//función que renderiza los cards en HTML
const setPokemonsInView = (results) => {
  const imgUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
   results.map (async(result,index) => {
    const bgColor = await obtenerColorArray(index+1);
    const html = `
        <div class="col-md-3 mt-5">
          <div class="card" style="background-color: ${bgColor};">
            <img class="card-img-top mt-2" width="90" height="180" src="${imgUrl}${index+1}.png"/>
            <div class="card-body text-center">
              <h6 class="text-title text-white">N° ${index+1}</h6>
              <h4 class="text-title text-dark">${result.name}</h4>
            </div>
            <button class="btn btn-primary" onclick='obtenerDetallePokemon("${
              result.url
            }")' data-bs-toggle="modal" data-bs-target="#pokeinfo">PokeInfo</button>
          </div>
        </div>`;
    
    pokemonContainer.innerHTML += html;        
  });

};

const obtenerDetallePokemon = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  pokemonName.innerHTML = "Name: " + data.name;
  obtenerTipo(data.types);
  pokemonWeight.innerHTML = "Weight: " + data.weight + " Kg";
  pokemonHeight.innerHTML = `Height: ${data.height} ft`;

}

const obtenerTipo = (tipos) => {
  tipos.map ((result) => {pokemonType.innerHTML = "Type: " + result.type.name })
};

const obtenerColorArray = async (id) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  const data = await response.json();
  const color = {
    red: "#FA3B3B",
    green: "#6CF543",
    yellow: "#F5F528",
    blue: "#3546ED",
    brown: "#D57A12",
    purple: "#AD39E7",
    pink: "#F35DCA"
  };
    
  return color[data.color.name]
}


obtenerPokemones();


