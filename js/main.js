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
        this.height = 16
        this.positionX = 2;
        this.positionY = 3;
        this.lives = 3;
        this.domElm = null

        this.createDomELement();
        
    }
createDomELement () {
    // step1: create the element
    this.domElm = document.createElement("img");

    // step2: add content or modify
    this.domElm.setAttribute("id", "pikachuGIF")
    this.domElm.src = "Pikachu running.gif"
    this.domElm.style.width =  this.width + "vw"
    this.domElm.style.height = this.height + "vh"
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
    const jumpUp = setInterval(() => {
    this.positionY += 3
    this.domElm.style.bottom = this.positionY + "vh";
    if (this.positionY === 40) {clearInterval(jumpUp)}
    }, 20)
    const jumpDown = setInterval(() => {
    this.positionY--
    this.domElm.style.bottom = this.positionY + "vh";
    if (this.positionY === 3) {clearInterval(jumpDown)}
    }, 20)
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

//
//Water puddles
//

class WaterPuddles {
    constructor () {
        this.width = 4
        this.height = 4
        this.positionX = 90;
        this.positionY = 3;
        this.domElm = null

        this.createDomELement();   
    }
    createDomELement () {
        // step1: create the element
        this.domElm = document.createElement("img");
    
        // step2: add content or modify
        this.domElm.setAttribute("id", "WaterPuddle")
        this.domElm.src = "waterpuddle.png"
        this.domElm.style.width =  this.width + "vw"
        this.domElm.style.height = this.height + "vh"
        this.domElm.style.left = this.positionX + "vw";
        this.domElm.style.bottom = this.positionY + "vh";
    
         //step3: append to the dom: `parentElm.appendChild()`
         const container = document.getElementById("gameContainer");
         container.appendChild(this.domElm)
    }
    moveLeft (){
        this.positionX--
        this.domElm.style.left = this.positionX + "vw";
    }
}
const obstaclesWater = []

//generating infinite obstacles and pushing them to the array every 7 seconds
setInterval (() => {
    const waterpuddle = new WaterPuddles();
    obstaclesWater.push(waterpuddle)
}, 2000)

//move the obstacles water
setInterval(() => {
    obstaclesWater.forEach((obstacleInstance, index) => {
        //1. move the obstacles
        obstacleInstance.moveLeft()
        //2. detect collision
        if (pikachu.positionX < obstacleInstance.positionX + obstacleInstance.width &&
            pikachu.positionX + pikachu.width > obstacleInstance.positionX &&
            pikachu.positionY < obstacleInstance.positionY + obstacleInstance.height &&
            pikachu.positionY + pikachu.height > obstacleInstance.positionY) {
                obstaclesWater.splice(index, 1)
                console.log(obstacleInstance)
                obstacleInstance.domElm.style.display = "none"
                console.log("collision")
            pikachu.lives--
            console.log(pikachu.lives)
            reducePikachuLives()
        }
    })
}, 50)

//
//Pikachu Life 1
//

// step1: create the element
const pikachuLife1 = document.createElement("img");
// step2: add content or modify
pikachuLife1.setAttribute("id", "pikachuLife1")
pikachuLife1.src = "pikachulife.png"
pikachuLife1.style.width = 4 + "vw"
pikachuLife1.style.height = 8 + "vh"
pikachuLife1.style.right = 12 + "vw"
pikachuLife1.style.top = 2 + "vh"
//step3: append to the dom: `parentElm.appendChild()`
document.getElementById("gameContainer").appendChild(pikachuLife1)

//
//Pikachu Life 2
//

const pikachuLife2 = document.createElement("img");

pikachuLife2.setAttribute("id", "pikachuLife2")
pikachuLife2.src = "pikachulife.png"
pikachuLife2.style.width = 4 + "vw"
pikachuLife2.style.height = 8 + "vh"
pikachuLife2.style.right = 7 + "vw"
pikachuLife2.style.top = 2 + "vh"

document.getElementById("gameContainer").appendChild(pikachuLife2)

//
//Pikachu Life 3
//

const pikachuLife3 = document.createElement("img");

pikachuLife3.setAttribute("id", "pikachuLife3")
pikachuLife3.src = "pikachulife.png"
pikachuLife3.style.width = 4 + "vw"
pikachuLife3.style.height = 8 + "vh"
pikachuLife3.style.right = 2 + "vw"
pikachuLife3.style.top = 2 + "vh"

document.getElementById("gameContainer").appendChild(pikachuLife3)

function reducePikachuLives() {
    if (pikachu.lives === 2) {
        document.getElementById("pikachuLife1").style.display = "none"
    }
    else if (pikachu.lives === 1) {
        document.getElementById("pikachuLife2").style.display = "none"
    }
    else if (pikachu.lives === 0) {
        console.log ("game over")
    location.href ="gameover.html"
    }
}