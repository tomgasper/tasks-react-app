import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import MouthIcon from '../img/Icons/Mouth'

import Loader from '../img/Loader/Loader'

import { timeDifference } from '../helpers/helpers'

const Comment = ({
        author,
        body,
        date
        }) => {
            const timeDiff = timeDifference( date )
            const userPage = '/' + author

            const [ imgLoaded, setImgLoaded ] = useState(false)
            const [ isImg, setIsImg ] = useState(false)

            useEffect( () => {
                const string1 = body.slice(0,4)
                const string2 = body.slice(0,5)

                if (string1 === 'http' || string2 === 'https') setIsImg(true)
            },[])

            console.log(isImg)

            const renderBody = (body) => {
                const string1 = body.slice(0,4)
                const string2 = body.slice(0,5)

                console.log('IS LOADED:  ' + imgLoaded)

                if (string1 === 'http' || string2 === 'https') {
                    return (
                        <div className="taskpage-comment-img">
                            <div className="taskpage-comment-loader" style={ {display: imgLoaded ? 'none': undefined }} >
                            <Loader/>
                            </div>
                            <img
                            onLoad={ () => setImgLoaded(true) }
                            src={body}
                            style={ {display: imgLoaded ? undefined : 'none' } }
                            />
                    </div>
                    )
                }
                else return body
            }

            return(
                <div className="taskpage-comment">
                <div className='taskpage-comment-container' >
                    <div className='taskpage-comment-avatar' >
                        <MouthIcon color={'black'} width={'3'} />
                        <div className='taskpage-comment-footer'>
                            <NavLink className='taskpage-comment-author' to={userPage}> {author} </NavLink>
                            {/* <div className='taskpage-task-author'>{author}</div> */}
                        </div>
                    </div>
                    <div className='taskpage-comment-right' >
                        <div className='taskpage-comment-body'
                        style={{ backgroundColor: isImg ? 'transparent' : '#ffd30f' }}
                        >{ renderBody(body) }</div>
                    </div>
                </div>
                <div className='taskpage-comment-date'>{timeDiff} ago</div>
            </div>
            )
}

export default Comment