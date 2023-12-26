import { useEffect, useRef } from "react"

export const useDraw = () => {

    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {

        const canvas = canvasRef.current
        const context = canvas?.getContext('2d')

        const tiles = 20;
        let headX = 10;
        let headY = 10;
        const tileSize = context!.canvas.width / tiles;

        let xVelocity = 0;
        let yVelocity = 0;

        let speed = 7

        const random = Math.floor(Math.random() * tiles);

        const appleX = random;
        const appleY = random;

        const draw = () => {

            clearScreen();
            changePosition();
            drawGrid();
            drawApple();
            drawSnake();

            setTimeout(draw, 1000 / speed);

        }

        const drawGrid = () => {

            context!.fillStyle = 'white'
            for (let i = 0; i < tiles; i++) {
                context!.fillRect(tileSize*i, 0, 1, 500)
                context!.fillRect(0, tileSize*i, 500, 1)
            }

        }

        const clearScreen = () => {
            context!.fillStyle = 'black'
            context!.fillRect(0, 0, context!.canvas.width, context!.canvas.height)
        }

        const drawSnake = () => {
            if (context) {
                context.fillStyle = "green"
                context.fillRect(headX * tileSize, headY * tileSize, tileSize, tileSize)
            }
        }

        const drawApple = () => {
            if (context) {
                context.fillStyle = 'red'
                context.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize)
            }
        }

        const changePosition = () => {
            headX += xVelocity;
            headY += yVelocity;
        }

        const keyDown = (e: KeyboardEvent) => {

            if (e.key === "ArrowDown") {
                if (yVelocity === -1) {
                    return
                }
                xVelocity = 0;
                yVelocity = 1;
            }

            if (e.key === "ArrowUp") {
                if (yVelocity === 1) {
                    return
                }
                xVelocity = 0;
                yVelocity = -1;
            }

            if (e.key === "ArrowRight") {
                if (xVelocity === -1) {
                    return
                }
                xVelocity = 1;
                yVelocity = 0;
            }

            if (e.key === "ArrowLeft") {
                if (xVelocity === 1) {
                    return
                }
                xVelocity = -1;
                yVelocity = 0;
            }

        }

        document.body.addEventListener("keydown", (e: KeyboardEvent) => keyDown(e));

        draw();

    }, [canvasRef])

    return { canvasRef }

}