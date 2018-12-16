import React, { Component } from 'react';
import firebase from '../../Config/Firebase/firebase'
import './card.css'
import { library, counter } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';


library.add(faTimes)
library.add(faCheck)


class Card extends Component {
    constructor(props) {
        super(props)

        this.state = {
            images: [
                {
                    original: props.image1,
                },
                {
                    original: props.image2,
                },
                {
                    original: props.image3,
                }
            ]
        }
    }

    meet() {
        this.props.meet()
    }

    cancel() {
        this.props.cancel()
    }

    render() {
        const { images } = this.state
        const { name, nickname } = this.props
        return (
            <div className='main-container'>
                <div className={'cards'}>
                    <div className={'card-img'}>
                        <ImageGallery showThumbnails={false} items={images} />
                    </div>
                    <div className={'nameDiv'}>
                        <div>
                            <div onClick={() => this.cancel()}>
                                <FontAwesomeIcon icon='times' className={'cross'} />
                            </div>
                        </div>
                        <div className={'nick'}>
                            <div>{name}</div>
                            <span>{nickname}</span>
                        </div>
                        <div className={'select'}>
                            <div onClick={() => this.meet()}>
                                <FontAwesomeIcon icon='check' className={'check'} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Card;