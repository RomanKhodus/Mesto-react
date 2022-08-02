import React from "react";
import Footer from "./Footer.js";
import Header from "./Header.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import api from "../Utils/api.js";
import { CurrentUserContext } from "../context/CurrentUserContext.js";

function App() {
  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
    setSelectedCard({ name: "", link: "" });
  }

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  function handleEditProfilePopupOpen() {
    setEditProfilePopupOpen(true);
  }

  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = React.useState(false);
  function handleisAddPlacePopupOpen() {
    setisAddPlacePopupOpen(true);
  }

  const [selectedCard, setSelectedCard] = React.useState({ name: "", link: "" });
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  const [currentUser, setCurrentUser] = React.useState({});
  React.useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(`Ошибка: ${err.status}`));
  }, []);

  function handleUpdateUser(user) {
    api
      .setUserInfo(user)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err.status}`));;
  }

  function handleUpdateAvatar({avatar}) {
    api.setAvatar(avatar).then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfilePopupOpen}
          onAddPlace={handleisAddPlacePopupOpen}
          onCardClick={handleCardClick}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <PopupWithForm
          name="add"
          title="Новое место"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          buttonText="Сохранить"
        >
          <input
            type="text"
            id="place-input"
            className="popup__input popup__input_type_place"
            name="name"
            // value=""
            placeholder="Название"
            required
            minLength="2"
            maxLength="40"
          />
          <span className="place-input-error popup__input-error"></span>
          <input
            type="url"
            id="link-input"
            className="popup__input popup__input_type_link"
            name="link"
            // value=""
            placeholder="Ссылка на картинку"
            required
          />
          <span className="link-input-error popup__input-error"></span>
        </PopupWithForm>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <PopupWithForm title="Вы уверены?" name="remove" buttonText="Да"></PopupWithForm>

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;









