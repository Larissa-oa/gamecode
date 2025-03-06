class Enemy {
    constructor(gameScreen) {
        this.left = window.innerWidth
        this.top = Math.floor(Math.random() * (gameScreen.offsetHeight - 210)); 
        this.width = 180;
        this.height = 210;
        this.fallingSpeed = 6

        this.enemyImages = [
            "./styles/images/enemy/enemy1.png",
            "./styles/images/enemy/enemy2.png",
            "./styles/images/enemy/enemy3.png"
        ];
        this.randomImageIndex = Math.floor(Math.random() * this.enemyImages.length);
        this.imageSrc = this.enemyImages[this.randomImageIndex];

        this.element = document.createElement('img');
        this.element.src = this.imageSrc;
        this.element.style.position = 'absolute';
        this.element.style.top = `${this.top}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.width = `${this.width}px`;

        gameScreen.appendChild(this.element);
    }

    move() {
        this.left -= this.fallingSpeed 
        this.updatePosition();

    
        if (this.left + this.width < 0) {
            this.element.remove();
        }
    }


    updatePosition() {
        this.element.style.left = `${this.left}px`;
    }

    hit(projectile) {
        const projectileRect = projectile.element.getBoundingClientRect();
        const enemyRect = this.element.getBoundingClientRect();

        return (
            projectileRect.top < enemyRect.bottom &&
            projectileRect.bottom > enemyRect.top &&
            projectileRect.left < enemyRect.right &&
            projectileRect.right > enemyRect.left
        );
    }
}