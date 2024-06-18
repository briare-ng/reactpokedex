import styles from "../styles/Pokemon.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSkullCrossbones,
  faSeedling,
  faFire,
  faDroplet,
  faBugs,
  faHandFist,
  faBoltLightning,
  faMountain,
  faTowerBroadcast,
  faHillRockslide,
  faDragon,
  faGhost,
  faHandSparkles,
  faCube,
  faSnowflake,
  faMoon,
  faFaceMehBlank,
  faCircleQuestion,
  faDove,
  faUniversalAccess,
} from "@fortawesome/free-solid-svg-icons";

function Pokemon(props) {
  //couleur de fond de la card en fonction du type de pokemon + icône de type
  let background;
  let faIcon;
  switch (props.type) {
    case "grass":
      background = { backgroundColor: "rgb(131, 222, 123)" };
      faIcon = faSeedling;
      break;
    case "fire":
      background = { backgroundColor: "rgb(255, 180, 82)" };
      faIcon = faFire;
      break;
    case "water":
      background = { backgroundColor: "rgb(172, 197, 255)" };
      faIcon = faDroplet;
      break;
    case "bug":
      background = { backgroundColor: "rgb(247, 206, 153)" };
      faIcon = faBugs;
      break;
    case "poison":
      background = { backgroundColor: "rgb(255, 121, 223)" };
      faIcon = faSkullCrossbones;
      break;
    case "fighting":
      background = { backgroundColor: "rgb(255, 113, 113)" };
      faIcon = faHandFist;
      break;
    case "electric":
      background = { backgroundColor: "rgb(250, 255, 145)" };
      faIcon = faBoltLightning;

      break;
    case "ground":
      background = { backgroundColor: "rgb(238, 225, 211)" };
      faIcon = faMountain;

      break;
    case "psychic":
      background = { backgroundColor: "rgb(255, 235, 89)" };
      faIcon = faTowerBroadcast;

      break;
    case "rock":
      background = { backgroundColor: "rgb(180, 189, 98)" };
      faIcon = faHillRockslide;

      break;
    case "fairy":
      background = { backgroundColor: "rgb(255, 138, 181)" };
      faIcon = faHandSparkles;

      break;
    case "ghost":
      background = { backgroundColor: "rgb(255, 249, 244)" };
      faIcon = faGhost;

      break;
    case "steel":
      background = { backgroundColor: "rgb(162, 147, 207)" };
      faIcon = faCube;

      break;
    case "ice":
      background = { backgroundColor: "rgb(211, 228, 255)" };
      faIcon = faSnowflake;

      break;
    case "dragon":
      background = { backgroundColor: "rgb(87, 255, 186)" };
      faIcon = faDragon;

      break;
    case "dark":
      background = { backgroundColor: "rgb(139, 135, 133)" };
      faIcon = faMoon;

      break;
    case "shadow":
      background = { backgroundColor: "rgb(87, 85, 84)" };
      faIcon = faFaceMehBlank;

      break;
    case "unknown":
      background = { backgroundColor: "rgb(227, 155, 118)" };
      faIcon = faCircleQuestion;

      break;
    case "flying":
      background = { backgroundColor: "rgb(178, 207, 255)" };
      faIcon = faDove;
      break;
    default:
      background = { backgroundColor: "rgb(204, 201, 196)" };
      faIcon = faUniversalAccess;
  }

  const title = props.name.charAt(0).toUpperCase() + props.name.slice(1);

  return (
    <div className={styles.card} style={background}>
      <h3 className={styles.name}>{title}</h3>
      <div className={styles.imgFrame}>
        <img className={styles.image} src={props.img} alt={props.name}></img>
      </div>
      <p className={styles.type}>
        type : {props.type}&nbsp;
        <span className={styles.icon}>
          <FontAwesomeIcon icon={faIcon} />
        </span>
      </p>
    </div>
  );
}
export default Pokemon;
