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
        }

        this.setImage = this.setImage.bind(this)
        this.fetchImage = this.fetchImage.bind(this)

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
        this.setState({ loading: true })
        axios.get(c.BASE_URL, {
            headers: {Authorization: `Client-ID ${c.CLIENT_KEY_ENV}`}})
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
        this.fetchImage()
        console.log(process.env)
    }


    render(){
        const {image, loading, error } = this.state
        const {id, url, title, author, avatar, portfolio, color } = image

        return (
            <div className='col-center-center width-100p height-100p'
            style={{ backgroundColor: `${color}`}}>
                {loading ?
                    <m.LoadingIndicator errorText={error} loadingText={c.LOADING}/> : (
                    <>
                    <div className='image-container col-center-center'>
                        <div {...u.fakeButtonProps({onClick: this.fetchImage})}>
                            <m.Image
                                url={url}
                                className='fitted-image'
                                id={id}
                                alt={title} />
                        </div>

                        <div className='row-between-center width-100p'>
                            <AuthorBlock
                                author={author}
                                avatar={avatar}
                                portfolio={portfolio} />
                            <m.AnimatedButton buttonText={c.BUTTON_TEXT} onClick={this.fetchImage}/>
                        </div>
                    </div>
                    </>
                )}
            </div>
        )
    }

}

export function AuthorBlock ({author, avatar, portfolio}) {
    return (
        <div className='row-start-center'>
            <a href={portfolio} className='row-start-center gaps-h-0x5 padding-v-1 padding-h-0x5 fg-primary'>
                <m.CircleUserPic url={avatar} size='2.5rem' />
                <span className='font-h4 text-capitalize'>{author}</span>
            </a>
        </div>
        )
}

