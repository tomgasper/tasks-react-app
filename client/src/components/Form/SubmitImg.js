import React from 'react';
import { handleSubmitImg } from '../../handlers/taskDetailsHandlers'

import ImgIcon from './ImgIcon'

const SubmitImg = ({ id, dispatch }) => {
    return(
        <div>
        <label for="comment-media">
                    <div className='form-addtask-img' onClick={ (e) => console.log(e) }><ImgIcon /></div>
        </label>
        <input className='form-addtask-img-input' type='file' id='comment-media' onChange={ e => handleSubmitImg( dispatch, e.target.files[0], id )} />
        </div>   
    )
}

export default SubmitImg;