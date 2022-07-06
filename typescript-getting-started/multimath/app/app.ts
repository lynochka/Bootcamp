function startGame() {
  // test that the comment disappears due to the tsconfig
  let playerName: string = "Audrey";
  logPlayer(playerName);

  var messagesElement = document.getElementById("messages");
  messagesElement!.innerText = "Welcome to MultiMath! Starting new game...";
}

function logPlayer(name: string) {
  console.log(`New game starting for player: ${name}`);
}

document.getElementById("startGame")!.addEventListener("click", startGame);
