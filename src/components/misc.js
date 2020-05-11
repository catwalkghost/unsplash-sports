import React from 'react'

import * as u from '../scripts/utils'

export function Image({alt, style, url, className}) {
        return (
            <img
                className={`${className || ''}`}
                style={style}
                src={url}
                alt={alt} />
        )
}

export function CircleUserPic({url, size, className, style}) {
    return(
            <span
                className={`block bg-circle-trick ${className || ''}`}
                style={{
                    width: size || undefined,
                    backgroundImage: u.bgUrl(url || ''),
                    ...style,
                }} />
        )
}

export function AnimatedButton({buttonText, onClick}){
    return (
        <button onClick={onClick} className='animated-button'>
            <span>{buttonText}</span>
        </button>
    )
}

export function LoadingIndicator ({loadingText, errorText}) {
    return (
        <div className='col-center-center gaps-v-1'>
            <div className='pulsating' />
            <span>{loadingText}</span>
            {!u.isNonEmptyString(errorText) ? null : (
                <span>{`Error: ${errorText}`}</span>
            )}
        </div>
    )
}