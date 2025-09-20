function cardOpenCloseFeatures() {
  // element selector

  let allElems = document.querySelectorAll(".elem");
  let fullElemPage = document.querySelectorAll(".fullElems");
  let fullElemPageBtn = document.querySelectorAll(".fullElems .back");

  // open card
  allElems.forEach(function (card) {
    card.addEventListener("click", function () {
      fullElemPage[card.id].style.display = "block";
    });
  });

  // close card
  fullElemPageBtn.forEach(function (back) {
    back.addEventListener("click", function () {
      fullElemPage[back.id].style.display = "none";
    });
  });
}
cardOpenCloseFeatures();

function rippleEffect() {
  const taskBtn = document.querySelector("#task-btn");

  taskBtn.addEventListener("mouseover", function (e) {
    const x = e.pageX - taskBtn.offsetLeft; // pageX - button's left position = X inside button
    const y = e.pageY - taskBtn.offsetTop; // pageY - button's top position = Y inside button

    taskBtn.style.setProperty("--posX", x + "px");
    taskBtn.style.setProperty("--posY", y + "px");
  });
}
 rippleEffect();