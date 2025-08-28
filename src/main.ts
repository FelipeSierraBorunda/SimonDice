// ============================   Variables globales   ============================
const NumeroCombinaciones = 2;
let nivel=1;
let EstadoStart=0;
let EstadoDificultadFacil=0;   
let EstadoDificultadDificil=0;
let patron: number[] = [];
let patronUsuario: number[] = [];
// ============================   Importaciones   ============================
// Vinnculamos los botones del html en Ts
const facilBtn = document.getElementById("facilBtn") as HTMLButtonElement;
const dificilBtn = document.getElementById("dificilBtn") as HTMLButtonElement;
// Vinculamos el boton start del html en Ts
const StartBtn = document.getElementById("StartBtn") as HTMLButtonElement;
// Vinculamos el boton reset del html en Ts
const ResetBtn = document.getElementById("ResetBtn") as HTMLButtonElement;
//
const numeroMarcador = document.getElementById("NumeroMarcador") as HTMLSpanElement;
// ===========================   Funciones globales   ============================
// Definimos las funciones aparte
    function handleRojo() { ProcesarSolicitud(1); }
    function handleVerde() { ProcesarSolicitud(2); }
    function handleAzul() { ProcesarSolicitud(3); }
    function handleAmarillo() { ProcesarSolicitud(4); }
// ============================   Logica de Dificultad   ============================
//Funcion para establecer la dificultad
function EstablecerDificultad(boton: HTMLButtonElement) 
{
  if(boton.id === "facilBtn") {
    EstadoDificultadFacil=1; 
    EstadoDificultadDificil=0;  
    facilBtn.classList.add("on");
    facilBtn.classList.remove("off");

    dificilBtn.classList.add("off");
    dificilBtn.classList.remove("onHard");
  }
  if(boton.id === "dificilBtn") {
    EstadoDificultadDificil=1;  
    EstadoDificultadFacil=0;   
    dificilBtn.classList.add("onHard");
    dificilBtn.classList.remove("off");
    facilBtn.classList.add("off");
    facilBtn.classList.remove("on");
  }
}
//Eventos para los botones de dificultad
facilBtn.addEventListener("click", () => {
  EstablecerDificultad(facilBtn);
});
dificilBtn.addEventListener("click", () => {
  EstablecerDificultad(dificilBtn);
});
// ============================   Creacion de patrones   ============================
//Evento para el boton start
StartBtn.addEventListener("click", () => {
  if(EstadoDificultadDificil || EstadoDificultadFacil){
    if(EstadoStart==0)
    {
    nivel=1;
    patronUsuario=[];
    patron=[];
    numeroMarcador.textContent= "0";
    EstadoStart=1;
     creacionPatrones();
     console.log(patron);
     EmpezarJuego();
    }
    else{
      console.log("El juego ya empezo, por favor reinicie");
    }
  }
});
// Creacion de patrones
function creacionPatrones ()
{
  for (let i = 0; i < NumeroCombinaciones; i++) 
  {
    if(patron.length <= NumeroCombinaciones-1 ) 
    {
    //Se crea el numero aleatorio
    let numeroaleatorio = GeneracionNumeroAleatorio();
    //Se agrega al patron el numero aleatorio
    patron.push(numeroaleatorio);
      
    }
  }
}
// Creacion de numero aleatorio
function GeneracionNumeroAleatorio(): number {
  return Math.floor(Math.random()*(4)+1);
}
// ============================   Reinicio de patrones   ============================
//Evento para el boton reset
ResetBtn.addEventListener("click", () => {
  nivel=1;
  patron=[];
  patronUsuario=[];
  EstadoStart=0; 
  //No permitir Jugar secuencia
  DesactivarBotones();
  //Reiniciar la dificultad
  EstadoDificultadDificil=0;  
  EstadoDificultadFacil=0;  
  dificilBtn.classList.add("off");
  dificilBtn.classList.remove("onHard");
  facilBtn.classList.add("off");
  facilBtn.classList.remove("on");
  //Reiniciar marcador
  numeroMarcador.textContent= "0";
});
// ============================   Empezar el juego  ============================
const BtnRojo=document.getElementById("rojo") as HTMLButtonElement;
const BtnVerde=document.getElementById("verde") as HTMLButtonElement;
const BtnAzul=document.getElementById("azul") as HTMLButtonElement; 
const BtnAmarillo=document.getElementById("amarillo") as HTMLButtonElement;
function EmpezarJuego(){
  Juego();
}
// ============================   Juego Facil   ============================
async function Juego() {
  await MostrarSecuencia();
  JugarSecuencia();
}
async function MostrarSecuencia(){
  DesactivarBotones();
  for (let i = 0; i < nivel; i++) 
  {
    ReiniciarOpacidad();  
    console.log(patron[i]);
    await Delay(1000);
    AplicarOpacidad(patron[i]);
    await Delay(1000);
    ReiniciarOpacidad();
  }
}
function JugarSecuencia() 
{
  if (EstadoStart) 
  {
    // Guardamos las funciones para quitarlas después
    BtnRojo.addEventListener("click", handleRojo);
    BtnVerde.addEventListener("click", handleVerde);
    BtnAzul.addEventListener("click", handleAzul);
    BtnAmarillo.addEventListener("click", handleAmarillo);
  }
}
function AplicarOpacidad(color:number){
  if(color==1){ BtnRojo.style.opacity="0.25";}
  if(color==2){BtnVerde.style.opacity="0.25";}
  if(color==3){ BtnAzul.style.opacity="0.25";}
  if(color==4){BtnAmarillo.style.opacity="0.25";}
}
// ========================= Reiniciar opacidad botones
function ReiniciarOpacidad()
{
  BtnRojo.style.opacity="1";
  BtnVerde.style.opacity="1";
  BtnAzul.style.opacity="1";
  BtnAmarillo.style.opacity="1";
}
// ========================= Funciones extra
function Delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}
function DesactivarBotones()
{
  BtnRojo.removeEventListener("click", handleRojo);
  BtnVerde.removeEventListener("click", handleVerde);
  BtnAzul.removeEventListener("click", handleAzul);
  BtnAmarillo.removeEventListener("click", handleAmarillo);
}
function ProcesarSolicitud(color:number)
{
  patronUsuario.push(color);
  console.log(patronUsuario);
  let i = patronUsuario.length-1;

  if(patronUsuario[i]!=patron[i])
  {
    if(EstadoDificultadFacil)
    {
      console.log("Patron incorrecto, intenta de nuevo");
      patronUsuario=[];
      JugarSecuencia();
      return;
    }
    if(EstadoDificultadDificil)
    {
      console.log("Patron incorrecto, Perdiste");
      patronUsuario=[];
      patron=[];
      numeroMarcador.textContent= "0";
      nivel=1;
      DesactivarBotones();

      EstadoStart=1;
     creacionPatrones();
     console.log(patron);
      EmpezarJuego();
      return;
    }
  }
  if(patronUsuario.length == nivel)
  {
    if(nivel == NumeroCombinaciones)
    {
      numeroMarcador.textContent= nivel.toString();
      nivel++;
      console.log("Ganaste el juego");
      EstadoStart=0;
      nivel++;
      DesactivarBotones();
      return;
    }
    else
    {
    console.log("Ganaste el nivel");
    numeroMarcador.textContent= nivel.toString();
    nivel++;
    patronUsuario=[];
    Juego();
    }
  }
}