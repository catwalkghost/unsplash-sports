import React from 'react'

import axios from 'axios'

import * as c from '../scripts/const'
import * as u from '../scripts/utils'

import * as f from "fpx";
import * as m from './misc'


export class UnsplashImage extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            image: {
                id: '',
                url: '',
                title: '',
                author: '',
                avatar: '',
                portfolio: '',
                color: '',
            },
            loading: true,
            error: '',

            // This is used to detect screen orientation,
            // So a portrait oriented image is shown on mobile
            // screen: 'landscape',
        }

        this.setImage = this.setImage.bind(this)
        this.fetchImage = this.fetchImage.bind(this)

        this.isPortrait = this.isPortrait.bind(this)
        this.setScreen = this.setScreen.bind(this)
    }

    isPortrait()  {
        const { screen } = this.state
        return screen === 'portrait'
    }

    setScreen() {
        if (window.matchMedia('(orientation: portrait)').matches) {
            console.log('orientation: portrait')
            this.setState({
                screen: 'portrait'
            })
        }

        if (window.matchMedia('(orientation: landscape)').matches) {
            console.log('orientation: landscape')
            this.setState({
                screen: 'landscape'
            })
        }
    }


    setImage(image) {
        this.setState({
            image: {
                id: image.id,
                url: image.urls.regular,
                title: image.alt_description,
                author: image.user.name,
                avatar: image.user.profile_image.medium,
                portfolio: image.user.portfolio_url,
                color: image.color,
            }
        })
    }

    fetchImage() {
        const { screen } = this.state
        this.setState({ loading: true })
        axios.get(c.BASE_URL, {
            headers: { params: { orientation: screen === 'portrait' ? 'portrait' : 'landscape' }, Authorization: `Client-ID ${c.CLIENT_KEY_3}`}})
            .then(response => {
                const {data} = response
                const image = data
                console.log(data)
                this.setImage(image)
                this.setState({ loading: false })
            })
            .catch(err => {
                console.log(`Unable to fetch photos from UNSPLASH: ${err}`)
                this.setState({ loading: true, error: `${err}` })
            })
    }


    componentDidMount() {
        // window.addEventListener('orientationChange' && 'resize', this.setScreen)
        this.fetchImage()
    }


    render(){
        const {image, loading, error } = this.state
        const {id, url, title, author, avatar, portfolio, color } = image

        return (
            <div className='col-center-center width-100p'
            style={{ backgroundColor: `${color}`}}>
                {loading ?
                    <m.LoadingIndicator errorText={error} loadingText={c.LOADING}/> : (
                    <>
                    <div className='image-container' {...u.fakeButtonProps({onClick: this.fetchImage})}>
                        <m.Image
                            url={url}
                            className='fitted-image'
                            id={id}
                            alt={title} />
                    </div>
                    <Author
                    author={author}
                    avatar={avatar}
                    portfolio={portfolio} />
                    <m.AnimatedButton buttonText={c.BUTTON_TEXT} onClick={this.fetchImage}/>
                    </>
                )}
            </div>
        )
    }

}

export function Author ({author, avatar, portfolio}) {
    return (
        <div className='row-start-center'>
            <a href={portfolio} className='row-start-center gaps-h-1 padding-v-1 padding-h-0x5'>
                <m.CircleUserPic url={avatar} size='2.5rem' />
                <span>{author}</span>
            </a>
        </div>
        )
}

