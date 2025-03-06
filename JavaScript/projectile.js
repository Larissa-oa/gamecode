class Projectile {
    constructor(gameScreen, baileysLeft, baileysTop) {
        this.left = baileysLeft
        this.top = baileysTop
        this.width = 180;
        this.height = 170;
        this.pew = new Audio ('./styles/soundeffects/laser.mp3')
        this.pew.volume = 0.1
        this.element = document.createElement('img');
        this.element.src = './styles/images/points/laserVision.png'
        this.element.style.position = 'absolute';
        this.element.style.top = `${this.top}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.width = `${this.width}px`;
        gameScreen.appendChild(this.element);
    }

    move() {
        this.left += 17; 
        this.updatePosition();
        this.pew.play()
    }

    updatePosition() {
        this.element.style.left = `${this.left}px`; 
    }

    hit(enemy) {

        if (
            this.left < enemy.left + enemy.width &&
            this.left + this.width > enemy.left &&
            this.top < enemy.top + enemy.height &&
            this.top + this.height > enemy.top
        ) {
            return true;
        } else {
            return false;
        }
    }
    
}