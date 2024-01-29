//
//moving background
//
const background = document.getElementById("gameContainer")
let i = 0
setInterval(() => {
    i -= 5
    background.style.backgroundPosition = i + "px"
}, 10)

//
//Pikachu GIF
//
class Pikachu {
    constructor () {
        this.width = 11
        this.positionX = 2;
        this.positionY = 3;
        this.domElm = null
        
        //gravity 
        setInterval(function Gravity(){
            
        })

        this.createDomELement();

        
    }
createDomELement () {
    // step1: create the element
    this.domElm = document.createElement("img");

    // step2: add content or modify
    this.domElm.setAttribute("id", "pikachuGIF")
    this.domElm.src = "Pikachu running.gif"
    this.domElm.style.width =  this.width + "vw"
    this.domElm.style.left = this.positionX + "vw";
    this.domElm.style.bottom = this.positionY + "vh";

     //step3: append to the dom: `parentElm.appendChild()`
     const container = document.getElementById("gameContainer");
     container.appendChild(this.domElm)
}
moveLeft(){
    if (this.positionX > 0) {
        this.positionX--
        this.domElm.style.left = this.positionX + "vw";
    }
    
}
moveRight(){
    if (this.positionX + this.width < 100) {
        this.positionX++
        this.domElm.style.left = this.positionX + "vw";
    }
}
jump(){
    setInterval(() => {
    this.positionY += 20
    this.domElm.style.bottom = this.positionY + "vh";
    }, 100)
    setInterval(() => {
        this.positionY--
        this.domElm.style.bottom = this.positionY + "vh";
    }, 100)
}
}
const pikachu = new Pikachu();

//
//add movement left and rigth to Pikachu
//
document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowLeft") {
        pikachu.moveLeft()
    } else if (e.code === "ArrowRight") {
        pikachu.moveRight();
    }
})

//
//add jump to Pikachu
//
document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowUp") {
        pikachu.jump();
    }
})