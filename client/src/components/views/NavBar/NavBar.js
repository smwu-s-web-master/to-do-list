import React from 'react'
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import './NavBar.css';

function NavBar(props) {

    const onLogoutHandler = () => {
        axios.get(`/api/users/logout`)
            .then(response => {
                if (response.data.success) {
                    props.history.push("/login")
                    window.localStorage.removeItem('userImg');
                } else {
                    alert('로그아웃 하는데 실패 했습니다.')
                }
            })
    }

    const currentUsername = localStorage.getItem("userName");
    const currentUserId = localStorage.getItem("userId");


    return (
        <div>
            <ul className="nav_container1">
                <li className="mainMenu"><a href="http://localhost:3000/main">Main Page</a>
                    <ul id="nav_container2">
                        <li className="subMenu"><a href="http://localhost:3000/daily">일상</a></li>
                        <li className="subMenu"><a href="http://localhost:3000/study">공부</a></li>
                        <li className="subMenu"><a href="http://localhost:3000/hobby">취미</a></li>
                    </ul>
                </li>
                <li className="mainMenu"><a href="http://localhost:3000/my">My Page</a></li>
                <li className="mainMenu">
                    <button onClick={onLogoutHandler}>
                        로그아웃
                    </button>
                </li>
                <li className="mainMenu">
                    <Link to={{
                        pathname: '/open',
                         state:{
                            userName: currentUsername,
                            userId: currentUserId,
                            mainCategory: "일상"
                        }
                    }}>
                        <b>!!!</b>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default withRouter(NavBar)