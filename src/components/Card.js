import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext.js";

function Card({ card, onCardClick }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `elements__delete ${
    isOwn ? "elements__delete_visible" : "elements__delete_hidden"
  }`;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `elements__like ${isLiked ? "elements__like_active" : ""}`;

  function handleClick() {
    onCardClick(card);
  }

  return (
    <article className="elements__card">
      <div className="elements__image-container">
        <img
          src={card.link}
          alt={`Изображение ${card.name}`}
          className="elements__image"
          onClick={handleClick}
        />
      </div>
      <button type="button" className={cardDeleteButtonClassName}></button>
      <div className="elements__figcaption">
        <h2 className="elements__header">{card.name}</h2>
        <div className="elements__like-container">
          <button type="button" className={cardLikeButtonClassName}></button>
          <div className="elements__like-counter">{card.likes.length}</div>
        </div>
      </div>
    </article>
  );
}

export default Card;
