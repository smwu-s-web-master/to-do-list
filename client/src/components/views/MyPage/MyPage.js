import React, {useState} from 'react';
import './MyPage.css';
import { withRouter } from 'react-router-dom';


function MyPage(props) {
    return (
            
        <div className="flex_container">
            <h1>header Component</h1>
        
            <div className="myPage_container">
                
                <div className="item">to do list</div>
                <div className="item">달력</div>
                <div className="item">달성률</div>
                <div className="item">목표</div>
                <div className="item">일상</div>
                <div className="item">공부</div>
                <div className="item">취미</div>
            </div>
        </div>
    )

}

export default withRouter(MyPage)