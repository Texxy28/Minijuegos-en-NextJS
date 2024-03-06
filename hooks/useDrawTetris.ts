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

        const piece = [
            [
                ["o", "o"],
                ["o", "o"],
            ],
            [
                ["o"],
                ["o"],
                ["o"],
                ["o"],
            ],
            [
                ["o", "x"],
                ["o", "x"],
                ["o", "o"],
            ],
            [
                ["x", "o"],
                ["x", "o"],
                ["o", "o"],
            ],
            [
                ["x", "o", "o"],
                ["o", "o", "x"],
            ],
            [
                ["o", "o", "x"],
                ["x", "o", "o"],
            ],
            [
                ["x", "o", "x"],
                ["o", "o", "o"],
            ],
        ] 

        const layout = [
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x",],
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x",],
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x",],
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x",],
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x",],
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x",],
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x",],
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x",],
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x",],
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x",],
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x",],
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x",],
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x",],
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x",],
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x",],
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x",],
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x",],
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x",],
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x",],
            ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x",]
        ]

        const tiles = 20;
        const tileSize = context!.canvas.width / tiles;

        let speed = 15;

        let pieceX = 5;
        let pieceY = 1;

        let timeout: ReturnType<typeof setTimeout>;

        let randomPiece = piece[Math.floor(Math.random() * piece.length)];

        const draw = () => {

            clearScreen();
            divideScreen();
            drawGrid();
            drawLayout();
            drawPiece();

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

        const drawLayout = () => {

            context!.fillStyle = 'white'
            for (let i = 0; i < layout.length; i++) {
                for (let j = 0; j < layout[i].length; j++) {
                    if (layout[i][j] === "o") {
                        context!.fillRect(tileSize * (j+5), tileSize * (i), tileSize, tileSize)
                    }
                }
            }

        }

        const drawPiece = () => {

            context!.fillStyle = 'yellow'
            for (let i = 0; i < randomPiece.length; i++) {
                for (let j = 0; j < randomPiece[i].length; j++) {
                    if (randomPiece[i][j] === "o") {
                        context!.fillRect((pieceX+j+4)*tileSize, pieceY*i*tileSize, tileSize, tileSize)
                    }
                }
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

        const keyDown = (e: KeyboardEvent) => {

            if (e.key === "c" || e.key === "C") {
                randomPiece = piece[Math.floor(Math.random() * piece.length)];
            }

            if (e.key === "ArrowLeft") {
                pieceX -= 1
            }

            if (e.key === "ArrowRight") {
                pieceX += 1
            }

        }

        document.body.addEventListener("keydown", (e: KeyboardEvent) => keyDown(e));

        draw();

    }, [canvasRef])

    return { canvasRef }

}