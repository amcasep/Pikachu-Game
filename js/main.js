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
        this.energy = 0;
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
//Obstacle Diglett
//

class Diglett {
    constructor () {
        this.width = 4
        this.height = 8
        this.positionX = 90;
        this.positionY = 3;
        this.domElm = null

        this.createDomELement();   
    }
    createDomELement () {
        // step1: create the element
        this.domElm = document.createElement("img");
    
        // step2: add content or modify
        this.domElm.setAttribute("id", "Diglett")
        this.domElm.src = "diglett.gif"
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
const obstaclesDiglett = []

//generating infinite Digletts and pushing them to the array every 10 seconds
setInterval (() => {
    const diglett = new Diglett();
    obstaclesDiglett.push(diglett)
}, 10000)

//move the obstacles Diglett
setInterval(() => {
    obstaclesDiglett.forEach((diglettInstance, index) => {
        //1. move the obstacles
        diglettInstance.moveLeft()
        //2. detect collision
        if (pikachu.positionX < diglettInstance.positionX + diglettInstance.width &&
            pikachu.positionX + pikachu.width > diglettInstance.positionX &&
            pikachu.positionY < diglettInstance.positionY + diglettInstance.height &&
            pikachu.positionY + pikachu.height > diglettInstance.positionY) {
                obstaclesDiglett.splice(index, 1)
               // console.log(diglettInstance)
               diglettInstance.domElm.style.display = "none"
             //   console.log("collision")
            pikachu.lives--
         //   console.log(pikachu.lives)
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
pikachuLife1.style.top = 3 + "vh"
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
pikachuLife2.style.top = 3 + "vh"

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
pikachuLife3.style.top = 3 + "vh"

document.getElementById("gameContainer").appendChild(pikachuLife3)

//
//Reducing Lives
//

function reducePikachuLives() {
    if (pikachu.lives === 2) {
        document.getElementById("pikachuLife1").style.display = "none"
    }
    else if (pikachu.lives === 1) {
        document.getElementById("pikachuLife2").style.display = "none"
    }
    else if (pikachu.lives === 0) {
       // console.log ("game over")
    location.href ="gameover.html"
    }
}

//
//Pokeballs
//

class Pokeballs {
    constructor () {
        this.width = 2
        this.height = 4
        this.positionX = Math.floor(Math.random() * (100 - this.width +1))
        this.positionY = 100
        this.domElm = null

        this.createDomELement();   
    }

    createDomELement () {
        // step1: create the element
        this.domElm = document.createElement("img");
    
        // step2: add content or modify
        this.domElm.setAttribute("id", "pokeball")
        this.domElm.src = "Pokeball.gif"
        this.domElm.style.width =  this.width + "vw"
        this.domElm.style.height = this.height + "vh"
        this.domElm.style.left = this.positionX + "vw";
        this.domElm.style.bottom = this.positionY + "vh";
    
         //step3: append to the dom: `parentElm.appendChild()`
         const container = document.getElementById("gameContainer");
         container.appendChild(this.domElm)
    }

    moveDown(){
        this.positionY--
        this.domElm.style.bottom = this.positionY + "vh";
    }
}
const energyPokeballs = []

//generating infinite obstacles and pushing them to the array every 7 seconds
setInterval (() => {
    const pokeball = new Pokeballs();
    energyPokeballs.push(pokeball)
}, 4000)

//ENERGYPOKEBALLS -> move & detect collision
setInterval(() => {
    energyPokeballs.forEach((pokeballInstance, index) => {
     //1. move the obstacles
     pokeballInstance.moveDown()
     //2. detect collision
     if (pikachu.positionX < pokeballInstance.positionX + pokeballInstance.width &&
        pikachu.positionX + pikachu.width > pokeballInstance.positionX &&
        pikachu.positionY < pokeballInstance.positionY + pokeballInstance.height &&
        pikachu.positionY + pikachu.height > pokeballInstance.positionY) {
            energyPokeballs.splice(index, 1)
            //console.log(pokeballInstance)
            pokeballInstance.domElm.style.display = "none"
            pikachu.energy++
            increasePikachuEnergy ();
            //console.log(pikachu.energy)
        }
    })
 }, 20)

//
//Pikachu Energy
//

// step1: create the element
const pikachuenergy1 = document.createElement("img");
// step2: add content or modify
pikachuenergy1.setAttribute("id", "pikachuenergy1")
pikachuenergy1.src = "energy.png"
pikachuenergy1.style.width = 3 + "vw"
pikachuenergy1.style.height = 8 + "vh"
pikachuenergy1.style.left = 2 + "vw"
pikachuenergy1.style.top = 3 + "vh"
pikachuenergy1.style.display = "none"
//step3: append to the dom: `parentElm.appendChild()`
document.getElementById("gameContainer").appendChild(pikachuenergy1)

const pikachuenergy2 = document.createElement("img");
pikachuenergy2.setAttribute("id", "pikachuenergy2")
pikachuenergy2.src = "energy.png"
pikachuenergy2.style.width = 3 + "vw"
pikachuenergy2.style.height = 8 + "vh"
pikachuenergy2.style.left = 6 + "vw"
pikachuenergy2.style.top = 3 + "vh"
pikachuenergy2.style.display = "none"
document.getElementById("gameContainer").appendChild(pikachuenergy2)

const pikachuenergy3 = document.createElement("img");
pikachuenergy3.setAttribute("id", "pikachuenergy3")
pikachuenergy3.src = "energy.png"
pikachuenergy3.style.width = 3 + "vw"
pikachuenergy3.style.height = 8 + "vh"
pikachuenergy3.style.left = 10 + "vw"
pikachuenergy3.style.top = 3 + "vh"
pikachuenergy3.style.display = "none"
document.getElementById("gameContainer").appendChild(pikachuenergy3)

const shoot = document.createElement("p")
shoot.innerText = "SHOOT!"
shoot.style.left = 15 + "vw"
shoot.style.top = -3.5 + "vh"
shoot.style.display = "none"
document.getElementById("gameContainer").appendChild(shoot)

//
//Increasing Energy
//

function increasePikachuEnergy () {
    if (pikachu.energy === 1) {
        pikachuenergy1.style.display = "block"
    }
    else if (pikachu.energy === 2) {
        pikachuenergy2.style.display = "block"
    }
    else if (pikachu.energy === 3) {
        pikachuenergy3.style.display = "block"
        shoot.style.display = "block"
    }
}

//
//Obstacle Pidgey
//

class Pidgey {
    constructor () {
        this.width = 10
        this.height = 20
        this.positionX = 90;
        this.positionY = Math.floor(Math.random() * (50 - this.height +1))
        this.domElm = null

        this.createDomELement();   
    }
    createDomELement () {
        // step1: create the element
        this.domElm = document.createElement("img");
    
        // step2: add content or modify
        this.domElm.setAttribute("id", "pidgey")
        this.domElm.src = "pidgey.gif"
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


const obstaclesPidgey = []

//generating infinite obstacles and pushing them to the array every 7 seconds
setInterval (() => {
    const pidgey = new Pidgey();
    obstaclesPidgey.push(pidgey)
}, 25000)

//move the obstacles Pidgey & detect collision with pikachu
setInterval(() => {
    obstaclesPidgey.forEach((pidgeyInstance, index) => {
        //1. move the obstacles
        pidgeyInstance.moveLeft()
        //2. detect collision
        if (pikachu.positionX < pidgeyInstance.positionX + pidgeyInstance.width &&
            pikachu.positionX + pikachu.width > pidgeyInstance.positionX &&
            pikachu.positionY < pidgeyInstance.positionY + pidgeyInstance.height &&
            pikachu.positionY + pikachu.height > pidgeyInstance.positionY) {
                obstaclesPidgey.splice(index, 1)
               // console.log(pidgeyInstance)
               pidgeyInstance.domElm.style.display = "none"
             //   console.log("collision")
            pikachu.lives--
         //   console.log(pikachu.lives)
            reducePikachuLives()
        }
    })
}, 50)

//
//Shooting Lightnings
//
class Lightnings {
    constructor () {
        this.width = 2
        this.height = 2
        this.positionX = pikachu.positionX + pikachu.width;
        this.positionY = pikachu.positionY + pikachu.height / 2;
        this.domElm = null

        this.createDomELement();
    }
createDomELement () {
    // step1: create the element
    this.domElm = document.createElement("img");

    // step2: add content or modify
    this.domElm.setAttribute("id", "lightning")
    this.domElm.src = "lightning.png"
    this.domElm.style.width =  this.width + "vw"
    this.domElm.style.height = this.height + "vh"
    this.domElm.style.left = this.positionX + "vw";
    this.domElm.style.bottom = this.positionY + "vh";

     //step3: append to the dom: `parentElm.appendChild()`
     const container = document.getElementById("gameContainer");
     container.appendChild(this.domElm)
}
moveRight(){
    this.positionX++
    this.domElm.style.left = this.positionX + "vw";
    }
}

document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && pikachu.energy >= 3) {
        const lightning = new Lightnings();
        pikachu.energy = 0;
        pikachuenergy1.style.display = "none"
        pikachuenergy2.style.display = "none"
        pikachuenergy3.style.display = "none"
        shoot.style.display = "none"
        setInterval(() => {
            //1. move the lightnings
            lightning.moveRight()
            //2. detect collision between lightnings and pidgeys
            obstaclesPidgey.forEach((pidgeyInstance, index) => {
                if (lightning.positionX < pidgeyInstance.positionX + pidgeyInstance.width &&
                    lightning.positionX + lightning.width > pidgeyInstance.positionX &&
                    lightning.positionY < pidgeyInstance.positionY + pidgeyInstance.height &&
                    lightning.positionY + lightning.height > pidgeyInstance.positionY) {
                        obstaclesPidgey.splice(index, 1)
                       pidgeyInstance.domElm.style.display = "none"
                }
            });
        }, 50)
    }
});
