class Point {
    constructor(gameScreen) {
        this.left = Math.floor(Math.random() * (gameScreen.offsetWidth - 200));
        this.top = 50;
        this.width = 120;
        this.height = 100;
        this.fallingSpeed = 5
        this.pointsImages = [
            "./styles/images/points/point1.png",
            "./styles/images/points/point2.png",
            "./styles/images/points/point3.png",
            "./styles/images/points/point4.png"
        ];
        // Randomly select an image
        this.randomImageIndex = Math.floor(Math.random() * this.pointsImages.length);
        this.imageSrc = this.pointsImages[this.randomImageIndex];
        this.fallingSpeed = 5
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
        this.top += this.fallingSpeed;
        this.element.style.top = `${this.top}px`
    }

    updatePosition() {
        this.element.style.top = `${this.top}px`;
    }
}