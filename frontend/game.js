let turn = 1;

const gameDiv = document.getElementById("game");
const endTurnBtn = document.getElementById("endTurn");

function render() {
  gameDiv.innerHTML = `<p>Turn: ${turn}</p>`;
}

endTurnBtn.addEventListener("click", () => {
  turn++;
  render();
});

render();
