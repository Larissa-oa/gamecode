// TASK 1 :  Creating the Game class is important because it 
// encapsulates all the game logic in one place and make it easier to maintain

class Game {
    constructor () {
        this.initialGameScreen = document.getElementById('game-intro-page')
        this.batActivationScreen = document.getElementById('bat-page')
        this.mainGameScreen = document.getElementById('game-main-page')
        this.endGameScreen = document.getElementById('game-end-page')
        this.batSignal = document.getElementById('bat-signal')
        this.decisionMessage = document.getElementById('decision-message')
        this.scoreElement = document.getElementById('score')
        this.progressBar = document.getElementById('progress-bar')
        this.muteButtonElement = document.getElementById('mute-game')
        this.highScoresListElement = document.getElementById('high-scores')
        /*this.nameInputElement = document.getElementById('player-name')
        this.playerName = this.nameInputElement.value
        localStorage.setItem('Name', this.playerName)*/
        this.themeSong = new Audio('./styles/soundeffects/backgroundmain.mp3')
        this.themeSong.volume = 0.1
        //TASK 7 : edit my player characteristics adding value to the parameter 
        // given to the constructor on the class player 
        this.player = new Player (
            this.mainGameScreen, 
            200, 
            550, 
            180, 
            210, 
            './styles/images/players/batleys.png'
        ) 
        this.obstacles = []
        this.enemy = []
        this.projectile = []
        this.points = []
        this.lives = 4
        this.score = 0 
        this.isMudted = false 
        this.gameIsOver = false 
        this.gameIntervalId =  null
        this.gameLoopFrequency = (1000/60)
    }
// TASK 2 : function to start game at the main page after the batactivation
//interval and loop is needed here to The loop and interval are needed to 
// repeatedly call the update(), allowing the player to move
    start() {
        this.themeSong.play()
        this.batActivationScreen.style.display = 'none'
        this.mainGameScreen.style.display = 'block'
        this.counter = 0;
        this.gameIntervalId = setInterval(() => {
            this.gameLoop();
        }, this.gameLoopFrequency);
    }

//function that controls the movements
update() {
    
    this.player.move();

    
    for (let i = 0; i < this.obstacles.length; i++) {
        const currentObstacle = this.obstacles[i];
        currentObstacle.move();

        if (this.player.gotHit(currentObstacle)) {
            this.lives -= 1;
            this.progressBar.style.width = `${(this.lives / 4) * 100}%`;
            this.updateProgressBar();
            this.obstacles.splice(i, 1);
            currentObstacle.element.remove();
            i--; 
        }

        if (currentObstacle.top > 900) {
            this.obstacles.splice(i, 1);
            currentObstacle.element.remove();
            i--; 
        }

        if (this.lives === 0) {
            this.gameOver();
        }
    }

    for (let j = 0; j < this.points.length; j++) {
        const currentPoint = this.points[j];
        currentPoint.move();

        if (this.player.scored(currentPoint)) {
            this.score += 1;
            this.scoreElement.innerText = this.score;
            this.points.splice(j, 1);
            currentPoint.element.remove();
            j--; 
        }

        if (currentPoint.top > 900) {
            this.points.splice(j, 1);
            currentPoint.element.remove();
            j--; 
        }

        for (let k = 0; k < this.enemy.length; k++) {
            const currentEnemy = this.enemy[k];
            currentEnemy.move();
            
            for (let l = this.projectile.length - 1; l >= 0; l--) {
                const currentProjectile = this.projectile[l];
                currentProjectile.move()
        
                // If the projectile hits the enemy
                if (currentProjectile.hit(currentEnemy)) {
                    this.projectile.splice(l, 1);
                    currentProjectile.element.remove();
                    this.enemy.splice(k, 1);   
                    currentEnemy.element.remove();
                    this.score +=5
                    this.scoreElement.innerText = this.score;
                    break 
                } else if (currentProjectile.left > window.innerWidth) {
                    this.projectile.splice(l, 1);
                    currentProjectile.element.remove();
                }
            }
        
            if (currentEnemy.left < 0) {
                this.enemy.splice(k, 1);
                currentEnemy.element.remove();
                k--;
            }
    
            if (this.player.gotShot(currentEnemy)) {
                this.gameOver(); 
            }
        }
    }
}

// game loop handles tasks like moving objects, 
// checking for collisions, and updating the display, 
// making the game interactive and responsive.
gameLoop() {
    this.counter++;
    this.update();

    if(this.score % 10 === 0) {
        this.fallingSpeed += 5
    }
    // Create a new obstacle every 140 frames 
    if (this.counter % 120 === 0) {
        const obstacle = new Obstacle(this.mainGameScreen);
        this.obstacles.push(obstacle);
    }
    // Crestes a new point object every 110 frames 
    if (this.counter % 110 === 0) {
        const point = new Point(this.mainGameScreen)
        this.points.push(point)
    }

   if (this.counter % 220 === 0) {
    console.log(this.enemy)
        const enemies = new Enemy(this.mainGameScreen)
        this.enemy.push(enemies)
    }
}

gameOver() {
    this.themeSong.pause()
    this.mainGameScreen.style.display = 'none'
    this.endGameScreen.style.display = 'grid'
    //this.updateHighScores()
    clearInterval(this.gameIntervalId) 

}

updateProgressBar () {
    const lifePercentage = (this.lives / 3) * 100
    this.progressBar.style.width = `${lifePercentage}`
}

muteBtn() {
    this.isMuted = !this.isMuted;

    if (this.isMuted) {
        this.themeSong.pause()
        this.muteButtonElement.innerText = 'Unmute'
    }
        else {
        this.themeSong.play()
        this.muteButtonElement.innerText = 'Mute'
}
}


/* TO BE ADDED AT A LATER TIME updateHighScores() {
    const scoresInStorage = JSON.parse(localStorage.getItem("high-scores"));
    console.log(this.nameInputElement, this.playerName)

    this.highScoresListElement.innerHTML = '';

    if (scoresInStorage) {
        const topThreeScores = scoresInStorage
            .sort((a, b) => b.score - a.score)
            .slice(0, 3);
        localStorage.setItem("high-scores", JSON.stringify(topThreeScores));
        topThreeScores.forEach((oneScoreObject) => {
            const ourLiElement = document.createElement("li");
            ourLiElement.innerText = `${oneScoreObject.name} ${oneScoreObject.score}`;
            this.highScoresListElement.appendChild(ourLiElement);
        });
    } else {
        localStorage.setItem(
            "high-scores",
            JSON.stringify([{ name: this.playerName, score: this.score }])
        );
    }
}*/
}