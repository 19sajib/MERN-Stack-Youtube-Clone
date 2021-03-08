import React, { useEffect, useState } from 'react'
import { Tooltip } from 'antd'
import Icon from '@ant-design/icons';
import Axios from 'axios'
import { LikeOutlined, DislikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
//AiOutlineLike  AiFillDislike  AiFillLike

function LikeDislikes(props) {

    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DislikeAction, setDislikeAction] = useState(null)

    let variable= {  }

        if(props.video){
           variable = { videoId: props.videoId, userId: props.userId}
        }
        else {
           variable= {commentId: props.commentId, userId: props.userId}
    }

    useEffect(() => {

        Axios.post('/api/like/getLikes', variable)
        .then(response => {
            if(response.data.success) {
                // How many like does this video or comment have
              setLikes(response.data.likes.length)

                //if i already clike like button or not
                response.data.likes.map(like => {
                    if(like.userId === props.userId) {
                        setLikeAction('liked')
                    }
                })
            } else {
                alert('Failed to get likes')
            }
        })

        Axios.post('/api/like/getDislikes', variable)
        .then(response => {
            if(response.data.success) {
                // How many like does this video or comment have
              setDislikes(response.data.dislikes.length)

                //if i already clike like button or not
                response.data.dislikes.map(like => {
                    if(like.userId === props.userId) {
                        setDislikeAction('disliked')
                    }
                })
            } else {
                alert('Failed to get dislikes')
            }
        })


    }, [Likes, Dislikes])


    const onLike = () => {
        if(LikeAction === null) {
         Axios.post('/api/like/uplike', variable)
         .then(response => {
             if(response.data.success) {
                setLikes(Likes +1)
                setLikeAction('liked')

                //If dislike button is clicked
                if(DislikeAction !== null ) {
                    setDislikeAction(null)
                    setDislikes(Dislikes -1)
                }
                    
             }
             else {
                 alert('Failed to increase like')
             }
         })

        } else {
            Axios.post('/api/like/unlike', variable)
             .then(response => {
             if(response.data.success) {
                setLikeAction(null)
                setLikes(Likes - 1)
             }
             else {
                 alert('Failed to decrease like')
             }
         })

        }
    }

    const onDisLike = () => {
        if(DislikeAction !== null) {

            Axios.post('/api/like/unDislike', variable)
            .then(response => {
                if(response.data.success) {

                    setDislikes(Dislikes - 1)
                    setDislikeAction(null)

                } else {
                    alert('Failed to decrease dislike')
                }
            })

        } else {

            Axios.post('/api/like/upDislike', variable)
            .then(response => {
                if(response.data.success) {
                    setDislikes(Dislikes + 1)
                    setDislikeAction('disliked')
    
                    //If dislike button is clicked
                    if(DislikeAction !== null ) {
                    setLikeAction(null)
                    setLikes(Likes -1)
                    }
                } else {
                    alert('Failed to increase dislike')
                }
            })

        }
    }

    return (
        <React.Fragment>
            <span key="comment-basic-like">
                {LikeAction === 'liked' ? 
                <LikeFilled onClick={onLike} /> : <LikeOutlined onClick={onLike} />}
                {/* <Tooltip title="Like">
                    <Icon type="like"
                          theme={LikeAction === 'liked' ? 'filled' : 'outlined'} 
                        onClick={onLike}
                        />
                </Tooltip> */}
                <span style={{ paddingLeft: '8px', cursor:'auto' }}>{Likes}</span>
            </span>&nbsp;&nbsp;
            <span key="comment-basic-dislike">
            {DislikeAction === 'disliked' ? 
                <DislikeFilled onClick={onDisLike} /> : <DislikeOutlined onClick={onDisLike} />}
                {/* <Tooltip title="Dislike">
                    <Icon type='dislike'
                          theme= {DislikeAction === 'disliked' ? 'filled' : 'outlined'} 
                        onClick={onDisLike}
                        />
                </Tooltip> */}
                <span style={{ paddingLeft: '8px', cursor:'auto' }}>{Dislikes}</span>
            </span>
        </React.Fragment>
    )
}

export default LikeDislikes
