import { useDraw } from "@/hooks/useDraw"
import React from "react";
import { useEffect, useRef } from "react"

export function SnakeGame() {

    const { canvasRef } = useDraw();

    return (

        <React.StrictMode>
            <canvas ref={canvasRef} width={500} height={500} className="mt-6"></canvas>
        </React.StrictMode>

    )

}