import React, {useState} from 'react';
import './MyPage.css';
import { withRouter } from 'react-router-dom';
//import NavBar from './components/views/NavBar/NavBar';


function MyPage(props) {
    return (
        <div className="myPage_container">      
            <div className="myPage_item">
                <span>(img)</span> <span>00의</span> to do list
            </div>
            <div className="myPage_item">달력</div>
            <div className="myPage_item">달성률</div>
            <div className="myPage_item">목표</div>
            <div className="myPage_item">일상</div>
            <div className="myPage_item">공부</div>
            <div className="myPage_item">취미</div>
        </div>
    )

}

export default withRouter(MyPage)