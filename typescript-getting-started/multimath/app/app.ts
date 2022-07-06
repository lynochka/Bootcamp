function startGame() {
  // test that the comment disappears due to the tsconfig
  var messagesElement = document.getElementById("messages");
  messagesElement!.innerText = "Welcome to MultiMath! Starting new game...";
}

document.getElementById("startGame")!.addEventListener("click", startGame);
