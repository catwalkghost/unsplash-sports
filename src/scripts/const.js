export const TITLE = 'DAZNX Unsplash Image Viewer'

export const CLIENT_KEY_ENV = process.env.REACT_APP_CLIENT_KEY

export const RETINA_SCREEN = window.devicePixelRatio > 1 || (window.matchMedia && window.matchMedia("(-webkit-min-device-pixel-ratio: 1.5),(-moz-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5)").matches)

export const BASE_URL = 'https://api.unsplash.com/photos/random?query=sport&orientation=landscape'

export const KEY_CODE_ENTER = 13
export const KEY_CODE_SPACE = 32

export const BUTTON_TEXT = 'Refresh'

export const LOADING = 'Loading'
