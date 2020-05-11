import React from 'react'

import * as u from '../scripts/utils'

// This is to imitate a larger, scalable project.
// Common components can take className as props

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
                className={`block bg-circle-trick border-accent ${className || ''}`}
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
            <span className='row-center-center font-h3'>{buttonText}</span>
        </button>
    )
}

export function LoadingIndicator ({loadingText, errorText}) {
    return (
        <div className='col-center-center gaps-v-2'>
            <div className='pulsating' />
            {!u.isNonEmptyString(errorText) ?
                <span className='fg-primary'>{loadingText}</span> :
                <span className='fg-error'>{errorText}</span>
            }
        </div>
    )
}