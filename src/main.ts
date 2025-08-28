// ============================   Variables globales   ============================
const NumeroCombinaciones = 20;
let nivel=1;
let EstadoStart=0;
let EstadoDificultadFacil=0;   
let EstadoDificultadDificil=0;
let dialogoFacil = 0;
let dialogoDificil=0;
let dialogoNivel=0;
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
//Dialogos simon
const dialogoSimon = document.getElementById("TextoDialogo") as HTMLDivElement;
//Audio
let sound = new Audio('/Sonidos/B.Mp3');
let soundP=new Audio('/Sonidos/P.Mp3');
let soundL=new Audio('/Sonidos/L.Mp3');
// ===========================   Funciones globales   ============================
// Definimos las funciones aparte
    function handleRojo() {  ProcesarSolicitud(1); }
    function handleVerde() { ProcesarSolicitud(2); }
    function handleAzul() { ProcesarSolicitud(3); }
    function handleAmarillo() { ProcesarSolicitud(4); }
// ============================= Eventos de botones
//Eventos para los botones de dificultad
facilBtn.addEventListener("click", () => {
  EstablecerDificultad(facilBtn);
});
dificilBtn.addEventListener("click", () => {
  EstablecerDificultad(dificilBtn);
});
//Evento para el boton start
StartBtn.addEventListener("click", () => {
  if(EstadoDificultadDificil || EstadoDificultadFacil)
  {
    if(EstadoStart==0)
    {
       dialogoSimon.textContent="Simon: El juego ya empezo, mucha suerte!";
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
      dialogoSimon.textContent="Simon: El juego ya empezo, si quieres empezar desde cero, presiona reiniciar!";
    }
  }
  else{
    dialogoSimon.textContent="Simon: Elige una dificultad primero!";
  }
});
//Evento para el boton reset
ResetBtn.addEventListener("click", () => {
  dialogoSimon.textContent="Simon: Reiniciaste el juego, elige una dificultad";
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
// ============================   Logica de Dificultad   ============================
//Funcion para establecer la dificultad
function EstablecerDificultad(boton: HTMLButtonElement) 
{
  if(boton.id === "facilBtn") {
    dialogoSimon.textContent="Simon: Eres mariconcito, pero puedes jugar";
    EstadoDificultadFacil=1; 
    EstadoDificultadDificil=0;  
    facilBtn.classList.add("on");
    facilBtn.classList.remove("off");

    dificilBtn.classList.add("off");
    dificilBtn.classList.remove("onHard");
  }
  if(boton.id === "dificilBtn") {
    dialogoSimon.textContent="Simon: Eres un valiente, presiona start para jugar";
    EstadoDificultadDificil=1;  
    EstadoDificultadFacil=0;   
    dificilBtn.classList.add("onHard");
    dificilBtn.classList.remove("off");
    facilBtn.classList.add("off");
    facilBtn.classList.remove("on");
  }
}
// ============================   Creacion de patrones   ============================
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
  sound.play();
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
      if(dialogoFacil===0)
      {
        soundP.currentTime=0;
        soundP.play();
        dialogoSimon.textContent="Simon: Patron incorrecto, intenta de nuevo";
        dialogoFacil=1;
         patronUsuario=[];
        JugarSecuencia();
        return;
      }
      if(dialogoFacil===1)
      {
        soundP.currentTime=0;
        soundP.play();
        dialogoSimon.textContent="Simon: Te volviste a equivocar, intenta de nuevo";
        dialogoFacil=0;
         patronUsuario=[];
        JugarSecuencia();
        return;
      }
    }
    if(EstadoDificultadDificil)
    {
       if(dialogoDificil===0)
      {
      soundP.currentTime=0;
      soundP.play();
      dialogoSimon.textContent="Simon: Patrón incorrecto, perdiste, se mostrara un patron nuevo";
      dialogoDificil=1;console.log("Patron incorrecto, Perdiste");
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
      if(dialogoDificil===1)
      {
       soundP.currentTime=0;
        soundP.play();
      dialogoSimon.textContent="Simon: Esto no se te da muy bien, se mostrara un patron nuevo";
      dialogoDificil=0;
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
  }
  if(patronUsuario.length == nivel)
  {
    if(nivel == NumeroCombinaciones)
    {
      numeroMarcador.textContent= nivel.toString();
      nivel++;
      dialogoSimon.textContent="Simon: Felicidades, ganaste el juego!";
      console.log("Eres el ganador, presion Reiniciar para volver a jugar");
      EstadoStart=0;
      nivel++;
      DesactivarBotones();
      return;
    }
    else
    {
      if(dialogoNivel===0){
        soundL.play();
        dialogoNivel=1;
        dialogoSimon.textContent="Simon: Muy bien, siguiente nivel";
        console.log("Ganaste el nivel");
        numeroMarcador.textContent= nivel.toString();
        nivel++;
        patronUsuario=[];
        Juego();
        return;
      }
      if(dialogoNivel===1){
        soundL.play();
      dialogoNivel=1;
      dialogoSimon.textContent="Simon: Eres muy bueno, pasas al siguiente nivel";
      console.log("Ganaste el nivel");
      numeroMarcador.textContent= nivel.toString();
      nivel++;
      patronUsuario=[];
      Juego();
      return;
      }

    }
  }
}