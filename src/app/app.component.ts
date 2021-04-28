import { Component, VERSION } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  tablero = new Array(3); //[x,o,o]
  turno: boolean = true;
  jugadorX: string = "";
  empate: string = "";
  jugadorO: string = "";
  campoX: boolean = false;
  contador: number = 0;
  juegos: any[] = [];
  remarcar:any[]=[];

  constructor() {
    this.inicializar();
  }
  //Permite inicializar el tablero
  inicializar() {
    
    for (let i = 0; i < 3; i++) {
      this.tablero[i] = new Array(3); //[[x,x,o] , [x,o,o] , [o,x,o]]
    }
  }
  iniciarJuego() {
    debugger;
    this.inicializar();
    if (this.jugadorX != null && this.jugadorO != null) {
      (document.getElementById("X") as HTMLButtonElement).disabled = true;
      (document.getElementById("O") as HTMLButtonElement).disabled = true;
      
    }
  }
  nuevoJuego() {
    this.inicializar();
    this.jugadorO = "";
    this.jugadorX = "";
    this.contador = 0;
    (document.getElementById("X") as HTMLButtonElement).disabled = false;
    (document.getElementById("O") as HTMLButtonElement).disabled = false;
    
    
  }

  marcarPosicion(fila: number, columna: number) {
    this.tablero[fila][columna] = this.turno ? "X" : "O";
    this.contador++;
    if (this.contador >= 5) {
      this.verificarJuego();
    }
    this.turno = !this.turno;
    console.log(this.tablero);
  }

  verificarJuego() {
    var jugadas = ["XXX", "OOO"];
    //Recorrido de las filas
    for (var fila = 0; fila < 3; fila++) {
      var h = this.tablero[fila].join("");
      if (h == jugadas[0] || h == jugadas[1]) {
        alert("Ganó horizontal");
        this.resultadoJuego();
      }
    }
    //Recorrido de las columnas
    for (var columna = 0; columna < 3; columna++) {
      let xCount = 0;
      let oCount = 0;
      for (var fila = 0; fila < 3; fila++) {
        var v = this.tablero[fila][columna];
        if (v === "X") xCount++;
        if (v === "O") oCount++;
      }
      if (xCount == 3 || oCount == 3) {
        alert("Ganó vertical");
        this.resultadoJuego();
      }
    }
    // Diagonales
    var dID = this.tablero[0][0] + this.tablero[1][1] + this.tablero[2][2];
    var dDI = this.tablero[2][0] + this.tablero[1][1] + this.tablero[0][2];
    if (dID == jugadas[0] || dID == jugadas[1]) {
      this.resultadoJuego(); //alert("Lateral Izquierda-Derecha");
    } else if (dDI == jugadas[0] || dDI == jugadas[1]) {
      this.resultadoJuego(); //alert("Lateral Derecha-Izquierda");
    }
  }
  resultadoJuego() {
    if (this.turno) {
      alert("Gano X");
      this.juegos.push([this.jugadorX, this.jugadorO, this.jugadorX]);
    } else if (!this.turno) {
      alert("Gano O");
      this.juegos.push([this.jugadorX, this.jugadorO, this.jugadorO]);
    } else {
      alert("Empate");
      this.juegos.push([this.jugadorX, this.jugadorO, this.empate]);
      
    }
    console.log(this.juegos);
  }
}
