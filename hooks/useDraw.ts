import { useEffect, useRef } from "react"

export const useDraw = () => {

    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {

        const canvas = canvasRef.current
        const context = canvas?.getContext('2d')

        class SnakeBodyPart {

            x: number;
            y: number;

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
            }
        }

        const snakeBodyParts: SnakeBodyPart[] = [];
        let bodyLength = 2;

        let headX = 1;
        let headY = 1;

        const tiles = 20;
        const tileSize = context!.canvas.width / tiles;

        let xInputVelocity = 0;
        let yInputVelocity = 0;

        let xVelocity = 0;
        let yVelocity = 0;

        let xPreviousVelocity = 0;
        let yPreviousVelocity = 0;

        let speed = 7

        const random = Math.floor(Math.random() * tiles);

        let appleX = random;
        let appleY = random;

        const draw = () => {

            xVelocity = xInputVelocity;
            yVelocity = yInputVelocity;

            checkMovement();

            changePosition();

            let endGame = gameOver();
            if (endGame) {
                return;
            }

            checkBorderCollision();
            clearScreen();
            checkAppleCollision();
            drawApple();
            drawSnake();

            setTimeout(draw, 1000 / speed);

        }

        const drawGrid = () => {

            context!.fillStyle = 'white'
            for (let i = 0; i < (tiles+1); i++) {
                context!.fillRect(tileSize * i, 0, 1, 500)
                context!.fillRect(0, tileSize * i, 500, 1)
            }

        }

        const clearScreen = () => {
            context!.fillStyle = 'black'
            context!.fillRect(0, 0, context!.canvas.width, context!.canvas.height)
        }

        const drawSnake = () => {
            if (context) {
                context.fillStyle = "#47eb38"

                for (let index = 0; index < snakeBodyParts.length; index++) {
                    let part = snakeBodyParts[index];
                    context.fillRect((part.x * tileSize) + 2.5, (part.y * tileSize) + 2.5, tileSize-4, tileSize-4)
                }

                snakeBodyParts.push(new SnakeBodyPart(headX, headY));
                while (snakeBodyParts.length > bodyLength) {
                    snakeBodyParts.shift();
                }

                context.fillStyle = "#5e7a2c"
                context.fillRect((headX * tileSize) + 2.5, (headY * tileSize) + 2.5, tileSize-4, tileSize-4)

            }
        }

        const drawApple = () => {
            if (context) {
                context.fillStyle = 'red'
                context.fillRect((appleX * tileSize) + 2.5, (appleY * tileSize) + 2.5, tileSize-4, tileSize-4)
            }
        }

        const changePosition = () => {
            headX += xVelocity;
            headY += yVelocity;
        }

        const checkBodyCollision = () => {
            for (let index = 0; index < snakeBodyParts.length; index++) {
                let part = snakeBodyParts[index];
                if (part.x === headX && part.y === headY) {
                    return true;
                }
            }
        }

        const checkAppleCollision = () => {
            if (headX === appleX && headY === appleY) {
                const random = Math.floor(Math.random() * tiles);
                appleX = random;
                appleY = random;
                bodyLength++;
            }
            for (let index = 0; index < snakeBodyParts.length; index++) {
                let part = snakeBodyParts[index];
                if (part.x === appleX && part.y === appleY) {
                    const random = Math.floor(Math.random() * tiles);
                    appleX = random;
                    appleY = random;
                    return;
                }
            }
        }

        const checkBorderCollision = () => {
            if (headX === tiles) {
                headX = 0;
            }
            if (headY === tiles) {
                headY = 0;
            }
            if (headX < 0) {
                headX = tiles;
            }
            if (headY < 0) {
                headY = tiles;
            }
        }

        const gameOver = () => {

            let gameOver = false;

            if (xVelocity === 0 && yVelocity === 0) {
                return false;
            }

            gameOver = checkBodyCollision()!;

            return gameOver;

        }

        const checkMovement = () => {
            
            if (xPreviousVelocity === 1 && xVelocity === -1) {
                xVelocity = xPreviousVelocity;
            }

            if (xPreviousVelocity === -1 && xVelocity === 1) {
                xVelocity = xPreviousVelocity;
            }

            if (yPreviousVelocity === -1 && yVelocity === 1) {
                yVelocity = yPreviousVelocity;
            }

            if (yPreviousVelocity === 1 && yVelocity === -1) {
                yVelocity = yPreviousVelocity;
            }

            xPreviousVelocity = xVelocity;
            yPreviousVelocity = yVelocity;

        }

        const keyDown = (e: KeyboardEvent) => {

            if (e.key === "ArrowDown") {
                xInputVelocity = 0;
                yInputVelocity = 1;
            }

            if (e.key === "ArrowUp") {
                xInputVelocity = 0;
                yInputVelocity = -1;
            }

            if (e.key === "ArrowRight") {
                xInputVelocity = 1;
                yInputVelocity = 0;
            }

            if (e.key === "ArrowLeft") {
                xInputVelocity = -1;
                yInputVelocity = 0;
            }

        }

        document.body.addEventListener("keydown", (e: KeyboardEvent) => keyDown(e));

        draw();

    }, [canvasRef])

    return { canvasRef }

}