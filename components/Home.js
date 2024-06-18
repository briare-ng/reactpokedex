import styles from "../styles/Home.module.css";
import react from "react";
import fetch from "node-fetch";
import { useEffect, useState } from "react";
import Pokemon from "./Pokemon";

function Home() {
  // états
  const [limit, setLimit] = useState(20);
  const [pokemonsList, setPokemonsList] = useState([]);

  const getPokemons = async () => {
    const pokemonTable = [];
    // fetch async d'une liste de 20 résultats de pokemons, on obtient une liste de nom + url de la fiche du pokemon
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`
    );
    const pokemons = await response.json();
    const pokemonList = pokemons.results; //got name + url
    console.log("pokemonlist", pokemonList);

    //fetch d'un pokemon particulier à partir de l'url de celui-ci
    for (const pokemon of pokemonList) {
      //   // const response = await fetch(`https://pokeapi.co/api/v2/pokemon/25/`);
      const response = await fetch(`${pokemon.url}`);
      const pokemonFeatures = await response.json();
      pokemonTable.push({
        name: pokemonFeatures.name,
        img: pokemonFeatures.sprites.front_default,
        type: pokemonFeatures.types[0].type.name,
      });
    }
    setPokemonsList(pokemonTable);
    // console.log("pokemonTable", pokemonTable);
  };

  //initialisation des données de pokemonsList
  //se mettra à jour lors du changement d'état de limit
  useEffect(() => {
    getPokemons();
  }, [limit]);

  // composants card pokemons
  console.log("pokemonsList", pokemonsList);

  const pokemonsGrid = pokemonsList.map((data, i) => {
    return <Pokemon key={i} img={data.img} name={data.name} type={data.type} />;
  });
  console.log("pokemonsGrid", pokemonsGrid);
  //Fonction pour ajouter +15 Pokemons sur clic sur bouton Next
  const next20 = () => {
    setLimit(limit + 20); // ou set limit?
  };
  console.log("limit", limit);

  return (
    <div>
      <main className={styles.main}>
        <h1 className={styles.titre}>
          P<img className={styles.pokeBall} src="favicon.png"></img>KEDEX
        </h1>
        <div className={styles.pokemonContainer}>{pokemonsGrid}</div>
        <button className={styles.next} onClick={next20}>
          Next
        </button>
      </main>
    </div>
  );
}

export default Home;
