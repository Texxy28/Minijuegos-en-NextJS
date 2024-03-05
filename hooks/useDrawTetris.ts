import { useEffect, useRef } from "react"

export const useDrawTetris = () => {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {

        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");

        class Pieces {

            x: number;
            y: number;
            

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
            }


        }

        const tiles = 20;
        const tileSize = context!.canvas.width / tiles;

        let speed = 7;

        let timeout: ReturnType<typeof setTimeout>;

        const draw = () => {

            clearScreen();
            divideScreen();
            drawGrid();

            timeout = setTimeout(draw, 1000/speed);

        }

        const drawGrid = () => {

            context!.fillStyle = 'white'
            for (let i = 0; i < 10; i++) {
                context!.fillRect(tileSize * (i+5), 0, 1, tileSize*25)
            }

            for (let i = 1; i < 20; i++) {
                context!.fillRect(tileSize*5, i*tileSize, tileSize*10, 1)
            }

        }

        const clearScreen = () => {
            context!.fillStyle = 'black'
            context!.fillRect(0, 0, context!.canvas.width, context!.canvas.height)
            // context!.fillStyle = "white";
            // context!.font = "20px serif"
            // context!.fillText(points.toString(), 10, 20)
        }

        const divideScreen = () => {

            context!.fillStyle = "white";

            context!.fillRect(0, 0, tileSize * 5, tileSize * 5);

            context!.fillRect(tileSize*5, 0, 1, context!.canvas.height);

            context!.fillRect(tileSize*15, 0, 1, context!.canvas.height);

            context!.fillRect(tileSize*15, 0, tileSize * 5, tileSize * 5);

        }

        draw();

    }, [canvasRef])

    return { canvasRef }

}