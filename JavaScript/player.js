
// TASK 6 : CREATE MY PLAYER CLASS
class Player {
    constructor(gameScreen, 
        positionLeft, 
        positionTop, 
        playerWidth, 
        playerHeight,
        playerImageSrc) {
        this.gameScreen = gameScreen
        this.positionLeft = positionLeft
        this.positionTop = positionTop
        this.width = playerWidth
        this.height = playerHeight
        this.directionX = 0
        this.directionY = 0
        this.bark = new Audio('./styles/soundeffects/bark-hit.mp3')
        this.bark.volume = 0.1
        this.coined = new Audio('./styles/soundeffects/points.mp3')
        this.coined.volume = 0.1
        this.element = document.createElement('img')
        this.element.src = playerImageSrc
        this.element.style.position = 'absolute'
        this.element.style.top = `${positionTop}px`
        this.element.style.top = `${this.positionTop}px`
        this.element.style.left = `${this.positionLeft}px`
        this.element.style.height = `${playerHeight}px`
        this.gameScreen.appendChild(this.element)
    }

    // TASK 8: FUNCTIONS REGARGIND MY PLAYER'S MOVEMENT.  The move function changes the player's coordinates, 
    // and the updatePosition function updates the player's visual position in the DOM based on these new coordinates.
    move() {
        this.positionLeft += this.directionX
        this.positionTop  += this.directionY
        //made this conditional statement so my player doesnt go out of my game screen
        if(this.positionLeft < 10) {
            this.positionLeft = 10
        }
        if(this.positionLeft + this.width > this.gameScreen.offsetWidth) {
            this.positionLeft = this.gameScreen.offsetWidth - this.width
        } 
        if(this.positionTop  < 0) {
            this.positionTop = 0;
        }
        if(this.positionTop + this.height > this.gameScreen.offsetHeight) {
            this.positionTop = this.gameScreen.offsetHeight - this.height
        } 
            this.updatePosition()
        }
//This function updates the position of a player element on 
// the screen by setting its top and left CSS styles based on the positionTop 
// and positionLeft (flex-start for all obj) properties. important for visually moving the player.
    updatePosition() {
        this.element.style.top = `${this.positionTop}px`;
        this.element.style.left = `${this.positionLeft}px`;
    }

    /*revise*/
    scored(point) {
        const playerRect = this.element.getBoundingClientRect()
        const pointRect = point.element.getBoundingClientRect()
        if (
            playerRect.top < pointRect.bottom &&
            playerRect.bottom > pointRect.top &&
            playerRect.left < pointRect.right &&
            playerRect.right > pointRect.left
        ) {
            this.coined.play()
            return true;
        } else {
            return false;
        }
    }
/* maybe when cleaning code consider using only one function for both obj and points*/
    gotHit(obstacle) {
        const playerRect = this.element.getBoundingClientRect()
        const obstacleRect = obstacle.element.getBoundingClientRect()
        if (
            playerRect.top < obstacleRect.bottom &&
            playerRect.bottom > obstacleRect.top &&
            playerRect.left < obstacleRect.right &&
            playerRect.right > obstacleRect.left
        ) {
            this.bark.play()
            return true
        } else {
            return false
        }
    }

    gotShot(enemy) {
        const playerRect = this.element.getBoundingClientRect()
        const enemyRect = enemy.element.getBoundingClientRect()
        if (
            playerRect.top < enemyRect.bottom &&
            playerRect.bottom > enemyRect.top &&
            playerRect.left < enemyRect.right &&
            playerRect.right > enemyRect.left
        ) {
            this.bark.play()
            return true
        } else {
            return false
        }
    }
    

}