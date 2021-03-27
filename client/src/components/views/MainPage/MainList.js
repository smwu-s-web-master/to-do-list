import React from "react";
import { Link } from "react-router-dom";
import "./MainList.css";

function MainList({ userImg, userName, mainCategory }) {
  return (
    <div className="list">
      <Link
        to={{
          /*pathname: `/movie/${id}`,
          state: {
            year,
            title,
            summary,
            poster,
            genres
          }*/
        }}
      >
        <img src={`http://localhost:4000/${userImg}`} alt={userName} title={userName} />
        <div className="list__data">
          <h2>주요 리스트</h2>
          <h5 className="list_category">'{mainCategory}'</h5>
        </div>
        <h3 className="list_user">{userName}</h3>
      </Link>
    </div>
  );
}

export default MainList;
