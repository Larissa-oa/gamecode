class Projectile {
    constructor(gameScreen, baileysLeft, baileysTop) {
        this.left = baileysLeft
        this.top = baileysTop
        this.width = 180;
        this.height = 170;
        this.pew = new Audio ('./styles/soundeffects/laser.mp3')
        this.pew.volume = 0.1
        this.fallingSpeed = 12
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
        this.left += this.fallingSpeed 
        this.updatePosition();
        this.pew.play()
    }

    updatePosition() {
        this.element.style.left = `${this.left}px`; 
    }

        hit(enemy) {
            const projectileRect = this.element.getBoundingClientRect();
            const enemyRect = enemy.element.getBoundingClientRect();
    
            return (
                projectileRect.top < enemyRect.bottom &&
                projectileRect.bottom > enemyRect.top &&
                projectileRect.left < enemyRect.right &&
                projectileRect.right > enemyRect.left
            );
        }
    
}