import React from 'react'
import ReactAudioPlayer from 'react-audio-player';

const Audio = ({ vmurl }) => {
    return (
        <div className=''>
            <audio id="click" src={vmurl} controls></audio>
        </div>
    )
}

export default Audio