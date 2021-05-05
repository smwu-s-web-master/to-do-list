import React, { useState } from 'react'
import { Button, Input } from 'antd';
import axios from 'axios';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
const { TextArea } = Input;

function Comments(props) {
    
    const currentUserId = localStorage.getItem("userId");
    const [Comment, setComment] = useState("");
    const [year, setyear] = useState();
    const [month, setmonth] = useState();
    const [date, setdate] = useState();
   
    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }
    const onSubmit = (e) => {
        e.preventDefault();

        const today = new Date();
        setyear(today.getFullYear());
        setmonth(today.getMonth() + 1);
        setdate(today.getDate());

        const variables = {
            content: Comment,
            writer: currentUserId,
            userId: props.userId,
            category: props.category,
            year,
            month,
            date
        }
        console.log(variables);
        axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    setComment("")
                    props.refreshFunction(response.data.result)
                } else {
                    alert('Failed to save Comment')
                    console.log(response);
                }
            })
    }

    return (
        <div style={{paddingBottom: '50px'}}>
            <br />
            <p style={{width: '100%', textAlign:'center', fontSize: '20px'}}> Comment 💬 </p>
            <hr style={{width: '80%'}}/>
            {/* Comment Lists  */}
            {console.log(props.CommentLists)}
            {props.CommentLists && props.CommentLists.map((comment, index) => (
                (!comment.responseTo &&
                    <React.Fragment>
                        <div style={{ width: '90%', marginLeft: '30px' }}>
                        <SingleComment 
                            comment={comment}
                            userId={props.userId} 
                            category={props.category}
                            refreshFunction={props.refreshFunction}
                            year={year}
                            month={month}
                            date={date} 
                        />
                        <ReplyComment 
                            CommentLists={props.CommentLists} 
                            userId={props.userId} 
                            category={props.category} 
                            parentCommentId={comment._id} 
                            refreshFunction={props.refreshFunction} 
                        />
                        </div>
                    </React.Fragment>
                )
            ))}


            {/* Root Comment Form */}
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleChange}
                    value={Comment}
                    placeholder="write some comments"
                />
                <br />
                <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
            </form>
        </div>
    )
}
export default Comments
