import React from "react";
import api from "../Utils/Api.js";
import Card from "./Card.js";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const [userName, setUsername] = React.useState("Жак-Ив Кусто");
  const [userDescription, setUserDescription] = React.useState(
    "Исследователь океана"
  );
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then(({ name, about, avatar }) => {
        setUsername(name);
        setUserDescription(about);
        setUserAvatar(avatar);

        api.getInitialCards().then((res) => {
          setCards(res);
        });
      })
      .catch((err) => console.log(`Ошибка: ${err.status}`));
  }, []);

  return (
    <main>
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar-container" onClick={onEditAvatar}>
            <img
              src={userAvatar}
              alt="Аватар автора"
              className="profile__avatar"
            />
            <div className="profile__overlay"></div>
          </div>
          <div className="profile__namespace">
            <div className="profile__container">
              <h1 className="profile__name">{userName}</h1>
              <p className="profile__job">{userDescription}</p>
            </div>
            <button
              type="button"
              className="profile__edit-button"
              onClick={onEditProfile}
            ></button>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {cards.map((card) => {
          return <Card key={card._id} card={card} onCardClick={onCardClick} />;
        })}
      </section>
    </main>
  );
}

export default Main;
