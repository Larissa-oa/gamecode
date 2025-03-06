//creating a class obstacle just like players and points so we can maniputale it 
class Obstacle {
    constructor(gameScreen) {
        this.left = Math.floor(Math.random() * (gameScreen.offsetWidth - 200));
        this.top = 50;
        this.width = 140;
        this.height = 120;
        this.fallingSpeed = 5
        // Array of obstacle images
        this.obstacleImages = [
            "./styles/images/obstacles/obstacle1.png",
            "./styles/images/obstacles/obstacle2.png",
            "./styles/images/obstacles/obstacle3.png"
        ];
        
        // Randomly select an image from obstaclesimg array 
        this.randomImageIndex = Math.floor(Math.random() * this.obstacleImages.length);
        this.imageSrc = this.obstacleImages[this.randomImageIndex];
        this.fallingSpeed = 4
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
        this.top += 4;
        this.updatePosition();
    }

    updatePosition() {
        this.element.style.top = `${this.top}px`;
    }
}
