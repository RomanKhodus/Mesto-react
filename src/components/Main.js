import React from "react";
import api from "../Utils/api.js";
import Card from "./Card.js";
import { CurrentUserContext } from "../context/CurrentUserContext.js";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => console.log(`Ошибка: ${err.status}`));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => {
        return state.filter((item) => item._id !== card._id);
      })
    });
  }

  return (
    <main>
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar-container" onClick={onEditAvatar}>
            <img src={currentUser.avatar} alt="Аватар автора" className="profile__avatar" />
            <div className="profile__overlay"></div>
          </div>
          <div className="profile__namespace">
            <div className="profile__container">
              <h1 className="profile__name">{currentUser.name}</h1>
              <p className="profile__job">{currentUser.about}</p>
            </div>
            <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
          </div>
        </div>
        <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
      </section>
      <section className="elements">
        {cards.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
