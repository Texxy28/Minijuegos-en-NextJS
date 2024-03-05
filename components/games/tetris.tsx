import { useDrawTetris } from "@/hooks/useDrawTetris"
import React, { KeyboardEventHandler, useReducer } from "react";

export function TetrisGame() {

    const { canvasRef } = useDrawTetris();

    return (
        
        <canvas 
            ref={canvasRef} 
            width={500} 
            height={500} 
            className="border-white border"
        >
        </canvas>

    )

}