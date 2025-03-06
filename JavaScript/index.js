window.onload = function () {
    //TASK 5: CREATE FUNCTION TO START GAME 
    const startButtonElement = document.getElementById('start-game')
    const restartButtonElement = document.getElementById('restart-btn')
    const initialGameScreen = document.getElementById('game-intro-page')
    const batActivationScreen = document.getElementById('bat-page')
    const muteBtnElement = document.getElementById('mute-game')
    const mainGameScreen = document.getElementById('game-main-page')

    let myNewGame = new Game;

    //function to start a new game 
    function startGame() {
        myNewGame.start()
    }
    // function to change inital page to batpage and show decision message 
    startButtonElement.addEventListener("click", function () {
        initialGameScreen.style.display = 'none'
        batActivationScreen.style.display = 'flex'
        setTimeout(() => {
                showBatSignalMessage()
        }, 2000);
    });

    muteBtnElement.addEventListener('click', function () {
      myNewGame.muteBtn()
    });

    restartButtonElement.addEventListener("click", function (){
     window.location.reload()
    })

    // TASK 3: CREATE A BAT SIGNAL ACTIVATION FUNCTION {changed to index.js}
    function showBatSignalMessage() {
        const decisionMessage = document.getElementById('decision-message');
        decisionMessage.style.display = 'block';
    

        document.getElementById('btn-yes').addEventListener('click', () => {
            const yesMessage = document.getElementById('yes-message')
            yesMessage.style.display = 'block'
            decisionMessage.style.display = 'none'
    
            yesMessage.querySelector('#close-message').addEventListener('click', () => {
                yesMessage.style.display = 'none'
                //myNewGame = new Game();
                startGame();
            });
        });

        document.getElementById('btn-no').addEventListener('click', () => {
            const noMessage = document.getElementById('no-message')
            noMessage.style.display = 'block'
            decisionMessage.style.display = 'none'
            
           
    
            noMessage.querySelector('#close-message').addEventListener('click', () => {
                noMessage.style.display = 'none'
                //closing message also starts a new game 
               // myNewGame = new Game();
                startGame();
            });
        });
    }

    //window event listener to ajdust movement of the player accordingly to the keys being used. 
    window.addEventListener('keydown', (event) => {
        if (event.code === "ArrowUp") {
            myNewGame.player.directionY = -8;
        } else if (event.code === "ArrowDown") {
            myNewGame.player.directionY =8;
        } else if (event.code === "ArrowLeft") {
            myNewGame.player.directionX = -8;
        } else if (event.code === "ArrowRight") {
            myNewGame.player.directionX = 8;
        }

        if(event.code === 'Space') {
           myNewGame.player.element.src = './styles/images/players/superbaileys.png'
           setTimeout(() => {
            myNewGame.player.element.src = './styles/images/players/batleys.png'
        }, 10000); 
        const newProjectile = new Projectile(myNewGame.mainGameScreen, myNewGame.player.positionLeft, myNewGame.player.positionTop);
        myNewGame.projectile.push(newProjectile);
    }
    
    });

    window.addEventListener("keyup", (event2) => {
        if (event2.code === "ArrowUp") {
            myNewGame.player.directionY = 0;
        } else if (event2.code === "ArrowDown") {
            myNewGame.player.directionY = 0;
        } else if (event2.code === "ArrowLeft") {
            myNewGame.player.directionX = 0;
        } else if (event2.code === "ArrowRight") {
            myNewGame.player.directionX = 0;
        }
    })
    }
