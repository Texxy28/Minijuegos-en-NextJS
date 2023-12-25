import { useEffect, useRef } from "react"

export function SnakeGame() {

    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas?.getContext('2d')
        //Our first draw

        if (context != null) {
            context.fillStyle = 'white'
            context.fillRect(0, 0, context.canvas.width, context.canvas.height)
        }

    }, [])

    return (

        <canvas ref={canvasRef} width={500} height={500} className="mt-6"></canvas>

    )

}