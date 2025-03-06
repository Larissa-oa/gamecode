class Enemy {
    constructor(gameScreen) {
        this.left = window.innerWidth; // Start at the right edge of the screen
        this.top = Math.floor(Math.random() * (gameScreen.offsetHeight - 210)); // Random top position (within the screen height, minus enemy height)
        this.width = 180;
        this.height = 210;
        this.fallingSpeed = 3;

        // Randomly select an enemy image
        this.enemyImages = [
            "./styles/images/enemy/enemy1.png",
            "./styles/images/enemy/enemy2.png",
            "./styles/images/enemy/enemy3.png"
        ];
        this.randomImageIndex = Math.floor(Math.random() * this.enemyImages.length);
        this.imageSrc = this.enemyImages[this.randomImageIndex];

        // Create the enemy element
        this.element = document.createElement('img');
        this.element.src = this.imageSrc;
        this.element.style.position = 'absolute';
        this.element.style.top = `${this.top}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.width = `${this.width}px`;

        gameScreen.appendChild(this.element);
    }

    // Move the enemy from right to left
    move() {
        this.left -= 5;  // Move left by 4px per frame (adjust speed here)
        this.updatePosition();

        // Remove the enemy when it goes off the left side of the screen
        if (this.left + this.width < 0) {
            this.element.remove();
        }
    }

    // Update the position of the enemy element
    updatePosition() {
        this.element.style.left = `${this.left}px`;
    }

    // Check if the projectile hits the enemy (collides)
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