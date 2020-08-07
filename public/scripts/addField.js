//Procurar o button
document
  .querySelector("#add-time")

  //quando clicar no button
  .addEventListener("click", cloneField);

//executar uma ação
function cloneField() {
  //duplicar os campos. Que campo ?
  const newFieldContainer = document
    .querySelector(".schedule-item")
    .cloneNode(true);

  //Pegar os campos. Que campos?
  const fields = newFieldContainer.querySelectorAll("input");

  //Para cada campo, limpar.
  fields.forEach(function (field) {
    field.value = "";
  });

  //Colocar na pagina. Onde?
  document.querySelector("#schedule-items").appendChild(newFieldContainer);
}
