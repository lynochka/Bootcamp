function startGame() {
  var messagesElement = document.getElementById("messages");
  messagesElement!.innerText = "Welcome to MultiMath! Starting new game...";
  console.log("Hi");
}

document.getElementById("startGame")!.addEventListener("click", startGame);
