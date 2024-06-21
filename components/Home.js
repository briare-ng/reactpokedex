import styles from "../styles/Home.module.css";
import fetch from "node-fetch";
import { useEffect, useState } from "react";
import Pokemon from "./Pokemon";

function Home() {
  // états
  const [isLoaded, setIsLoaded] = useState(false);
  const [limit, setLimit] = useState(10); //nb de pokemon à afficher par page
  const [offset, setOffset] = useState(0); // nombre de pokemons déjà affichés
  const [pokemonsGrid, setPokemonsGrid] = useState([]); //liste des composants pokemons affichés
  const [nextPokemons, setNextPokemons] = useState([]); // stocke les prochains Pokémons à afficher
  const [isLoading, setIsLoading] = useState(false); //défini si on est en train de charger des données par requêtes fetch

  //défini le nb de pokemons à afficher à chaque load dans l'état limit
  const changeLimit = (e) => {
    setLimit(parseInt(e.target.value));
  };

  //effectue les requêtes vers l'API pokeAPI, renvoie un tableau de composants
  const getPokemons = async (offsetVal) => {
    const pokemonTable = [];
    // fetch async d'une liste de 20 pokemons, on obtient un tableau de {nom + url de la fiche du pokemon}
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offsetVal}`
    );
    const pokemons = await response.json();
    const pokemonList = pokemons.results; // names + urls

    //fetch des caractéristiques de chaque pokemon à partir de l'url reçue dans les objets de results
    for (const pokemon of pokemonList) {
      const response = await fetch(`${pokemon.url}`);
      const pokemonFeatures = await response.json();
      pokemonTable.push({
        number: pokemonFeatures.id,
        name: pokemonFeatures.name,
        img: pokemonFeatures.sprites.front_default,
        type: pokemonFeatures.types[0].type.name,
      });
    }
    return GridBuild(pokemonTable); // construit et retourne un tableau de composants Pokémons
  };
  //test d'une autre version de l'algo de requêtes : pas de nette amélioration de vitesse
  // const getPokemonsV2 = async (offsetVal) => {
  //   const fetchTo = offsetVal + limit;
  //   console.log(fetchTo);
  //   const pokemonTable = [];
  //   for (let i = offsetVal+1; i <= fetchTo; i++) {
  //     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
  //     const pokemonFeatures = await response.json();
  //     pokemonTable.push({
  //       number: pokemonFeatures.id,
  //       name: pokemonFeatures.name,
  //       img: pokemonFeatures.sprites.front_default,
  //       type: pokemonFeatures.types[0].type.name,
  //     });
  //   }
  //   return GridBuild(pokemonTable);
  // };

  // construction d'un tableau de composants pokemons à partir d'un tableau d'objets
  const GridBuild = (tab) => {
    const pokemonsCards = tab.map((data) => {
      return (
        <Pokemon
          key={data.number}
          img={data.img}
          name={data.name}
          type={data.type}
          number={data.number}
        />
      );
    });
    return pokemonsCards;
  };

  //crée un tableau des prochains composants pokémons qui seront en attente pour affichage
  const loadNextPokemons = async () => {
    // console.log(`CHARGEMENT EN ATTENTE DES ${limit} SUIVANTS`);
    const newOffset = offset + limit;
    const newPokemons = await getPokemons(newOffset);
    setNextPokemons(newPokemons);
    setIsLoading(false);
  };

  /////tentative de mise à jour du limit en cours d'affichage, pb de maj du limit et des résultats
  // initialisation et mise à jour des données
  // useEffect(() => {
  //   async () => {
  //     setIsLoading(true);
  //     loadNextPokemons();
  //   };
  // }, [limit]);

  //Fonction pour ajouter des Pokemons au clic sur le bouton Load
  const LoadNext = async () => {
    // console.log("CLIC SUR LOAD");
    setIsLoading(true);
    if (offset == 0) {
      //affichage des premiers
      const firstPokemons = await getPokemons(0);
      // console.log(`1ST MOUNT POKEMONS COMPONANTS`);
      setPokemonsGrid(firstPokemons);
      setOffset(limit);
      setIsLoaded(true);
    } else {
      // ajouter les Pokémons stockés en attente à la liste de composants affichés
      // console.log(`MOUNT NEW POKEMONS COMPONANTS`);
      setPokemonsGrid((prevPokemonGrid) => [
        ...prevPokemonGrid,
        ...nextPokemons,
      ]);
      const newOffset = offset + limit;
      setOffset(newOffset);
      // console.log(`offset réglé à ${offset}+${limit}`);
    }
    await loadNextPokemons();
  };

  return (
    <div>
      <main className={styles.main}>
        <h1 className={styles.titre}>
          P<img className={styles.pokeBall} src="favicon.png"></img>KEDEX
        </h1>
        <div className={styles.pokemonContainer}>{pokemonsGrid}</div>
        {!isLoaded && (
          <div>
            <label htmlFor="loadBy">Charger les pokémons par : </label>
            <select
              id="loadBy"
              value={limit}
              onChange={changeLimit}
              className={styles.select}
            >
              <option>1</option>
              <option>5</option>
              <option>10</option>
              <option>20</option>
              <option>50</option>
              <option>100</option>
            </select>
          </div>
        )}
        {!isLoading && (
          <button className={styles.next} onClick={LoadNext}>
            Load
          </button>
        )}
        {/* {isLoading && ( */}
          <div className={styles.loadingText}>
            Catching them...
            <img className={styles.loading} src="favicon.png"></img>
          </div>
        {/* )} */}
      </main>
    </div>
  );
}

export default Home;
