import { useDraw } from "@/hooks/useDraw"
import React from "react";

export function SnakeGame() {

    const { canvasRef } = useDraw();

    return (
        
        <canvas ref={canvasRef} width={500} height={500} className="border-white border"></canvas>

    )

}