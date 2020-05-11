import React from 'react'

import * as f from 'fpx'

import * as c from './const'

// Checks and sets url for background images
export function bgUrl(url) {
    url = f.onlyString(url)
    if (!url) return undefined
    return `url("${url}")`
}

// Joins className strings
export function cls() {
    return f.filter(arguments, isNonEmptyString).join(' ')
}

// Checks if a string not empty
export function isNonEmptyString(value) {
    return f.isString(value) && value.trim() !== ''
}

// Fake Button props

/*
Usage:

  <span {...u.fakeButtonProps({onClick: someAction})}>
    label
  </span>

Usable for layouts unsupported by the native button element, such as a flex
container. Doesn't work for submit buttons. Supports focus and keyboard
activation. Last resort, try native buttons first.
*/
export function fakeButtonProps({onClick, disabled, readOnly, ...props} = {}) {
    disabled = Boolean(disabled || readOnly)
    return {
        role: 'button',
        tabIndex: disabled ? undefined : 0,
        onKeyPress: (onClick && !disabled)
            ? simulateActivationOnKeyPress.bind(undefined, onClick)
            : undefined,
        onClick,
        disabled,
        ...props,
    }
}

function simulateActivationOnKeyPress(onClick, event) {
    f.validate(onClick, f.isFunction)
    if (event.keyCode === c.KEY_CODE_ENTER) {
        onClick(event)
        return
    }
    if (event.keyCode === c.KEY_CODE_SPACE) {
        // Prevent default scroll on Space
        event.preventDefault()
        onClick(event)
    }
}