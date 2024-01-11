// On récupère tous les éléments du DOM ayant l'attribut data-cell
const gridCells = document.querySelectorAll("[data-cell]");

// On récupère l'élément du DOM ayant l'id 'gameStatus'
const gameStatusElement = document.getElementById("gameStatus");

// On récupère l'élément du DOM ayant l'id 'endGameStatus'
const finalStatusElement = document.getElementById("endGameStatus");

// On définit les deux joueurs et les lettres qui vont être liées
const firstPlayer = "X";
const secondPlayer = "O";

// On initialise le joueur qui commence
let currentPlayer = firstPlayer;

// On fait en sorte que l'on puisse cliquer qu'une fois sur une case
gridCells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick, { once: true });
});

// Cette fonction est appelée quand une cellule est cliquée
function handleCellClick(e) {
  // On met le symbole du joueur dans la cellule cliquée
  e.target.innerHTML = currentPlayer;

  // On vérifie si le joueur courant a gagné en lancant la fonction checkVictory
  // On utilise la concaténation pour coller wins + la lettre du joueur qui a joué en dernier
  if (checkVictory(currentPlayer)) {
    updateStatus("wins" + currentPlayer);
    return finishGame();
  }
  // On vérifie si la partie est nulle
  else if (checkStalemate()) {
    updateStatus("stalemate");
    return finishGame();
  }

  // On met à jour le statut du jeu
  updateStatus(currentPlayer);

  // On change de joueur tour après tour
  currentPlayer == firstPlayer
    ? (currentPlayer = secondPlayer)
    : (currentPlayer = firstPlayer);
}
// On définit l'ensemble des combinaisons de victoires possibles dans le tableau
const victoryConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Cette fonction vérifie si un joueur a gagné en vérifiant à travers toutes
// les combinaisons possibles si il y a 3 fois la même lettre
function checkVictory(currentPlayer) {
  return victoryConditions.some((condition) => {
    return condition.every((index) => {
      return gridCells[index].innerHTML == currentPlayer;
    });
  });
}

// Cette fonction vérifie si la partie est nulle
function checkStalemate() {
  return [...gridCells].every((cell) => {
    return cell.innerHTML == firstPlayer || cell.innerHTML == secondPlayer;
  });
}

// Cette fonction met à jour le statut de jeu
function updateStatus(status) {
  let statusMessage;

  if (status === "X") {
    statusMessage = "C'est le tour du joueur 2";
  } else if (status === "O") {
    statusMessage = "C'est le tour du joueur 1";
  } else if (status === "winsX") {
    statusMessage = "Le joueur 1 a gagné!";
  } else if (status === "winsO") {
    statusMessage = "Le joueur 2 a gagné!";
  } else if (status === "stalemate") {
    statusMessage = "Egalité!";
  }

  // On met à jour le message de statut dans le DOM en fonction du tour ou de fin de jeu
  gameStatusElement.innerHTML = statusMessage;
  finalStatusElement.innerHTML = statusMessage;
}

// Cette fonction termine le jeu
// function finishGame() {
//   document.getElementById('endingGame').style.display = "block"
// }

// Cette fonction recharge la page pour recommencer le jeu
function refreshGame() {
  window.location.reload();
}

// On récupère l'élément du DOM ayant l'id 'reloadGame'
const refreshGameElement = document.getElementById("reloadGame");

// On ajoute un écouteur d'événement 'click' à l'élément 'reloadGame'
refreshGameElement.addEventListener("click", refreshGame);
