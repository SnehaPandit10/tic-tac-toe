import React from 'react'
import './resetBoard.css';

export const ResetBoard = ({ resetBoard, restart }) => {
    return (
        <div>
            <button className='reset' onClick={resetBoard}>RESET</button>
            <button className='reset' onClick={restart}>RESTART</button>
        </div>
    )
}
