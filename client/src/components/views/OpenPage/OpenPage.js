import React, { useEffect, useState } from 'react'
import './OpenPage.css';
import OpenTodoListTemplate from './OpenList/OpenTodoListTemplate';
import OpenTodoItemList from './OpenList/OpenTodoItemList';
//import Comment from './Comment/Comment';
import axios from 'axios';
import {withRouter} from "react-router-dom";


function OpenPage(props) {
    console.log(props);

    const userName = props.location.state.userName;
    const [category, setcategory] = useState("일상");
    const [todos, settodos] = useState([{
        //시험용 list
        id: 0,
        text: "안녕",
        checked: true,
        privated: false
      }, {
          id: 1,
        text: "밥먹기",
        checked: false,
        privated: false
      }]);
    const [Comments, setComments] = useState([])

    useEffect(() => {
        if(props.location.state.mainCategory !== undefined)
            setcategory(props.location.state.mainCategory);
    })
    // mainPage에서 선택한 userName, mainCategory 서버로 전송 
    // 서버에서 해당 유저의 해당 category에 맞는 list, 댓글  반환. 
    /*async function getOpenLists() {
        
        let body = {
          userName,
          category 
        };

        const response = await axios.post("api/main/getMain", body);
        console.log(response);
        settodos(response.data.todos);
        // 댓글도 가져오기.

        axios.post('api/comment/getComments', body)
        .then(response => {
            if (response.data.success) {
                setComments(response.data.comments)
            } else {
                alert("코멘트 정보를 가져오는 것을 실패 하였습니다.")
            }
        })
    }
    
    useEffect(() => {
        //서버에 post해서 정보 새로 받아오기.
        getOpenLists();
    }, [category])*/

    const refreshFunction = (newComment) => {
        setComments((Comments.concat(newComment)))
    }

    const pickDaily = () => {
        setcategory("일상");
    }
    const pickStudy = () => {
        setcategory("공부");
    }
    const pickHobby = () => {
        setcategory("취미");
    }
    
    return (
        <div className="openPage">
            <div className="openPage_items">
                <div className="print_lists">
                    <div id="userName">{userName}  [{category}]</div>
                    <div id="lists">
                        {/*list 목록 출력된 공간*/}
                        <OpenTodoListTemplate>
                            <OpenTodoItemList
                            todos={todos}
                            />
                        </OpenTodoListTemplate>
                    </div>
                </div>
                <div className="comments">
                    {/*댓글 영역
                    <Comment 
                        refreshFunction={refreshFunction} 
                        commentLists={Comments} 
                        userName={userName}
                        category={category}
                    />*/}
                </div>
            </div>
            <div className="openPage_menu">
                {/*카테고리 선택하는 토글*/}
                <div onClick={pickDaily}>일상</div>
                <div onClick={pickStudy}>공부</div>
                <div onClick={pickHobby}>취미</div>
            </div>
        </div>
    )
}

export default withRouter(OpenPage)


