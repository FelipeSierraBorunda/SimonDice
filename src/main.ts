// Vinnculamos los botones del html en Ts
const facilBtn = document.getElementById("facilBtn") as HTMLButtonElement;
const dificilBtn = document.getElementById("dificilBtn") as HTMLButtonElement;

function EstablecerDificultad(boton: HTMLButtonElement) 
{
  if(boton.id === "facilBtn") {
    boton.classList.add("on");
    boton.classList.remove("off");

    dificilBtn.classList.add("off");
    dificilBtn.classList.remove("onHard");
  }
  if(boton.id === "dificilBtn") {
    boton.classList.add("onHard");
    boton.classList.remove("off");

    facilBtn.classList.add("off");
    facilBtn.classList.remove("on");
  }
}

facilBtn.addEventListener("click", () => {
  EstablecerDificultad(facilBtn);
});
dificilBtn.addEventListener("click", () => {
  EstablecerDificultad(dificilBtn);
});