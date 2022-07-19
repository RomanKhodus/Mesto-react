import React from "react";

import Footer from "./Footer.js";
import Header from "./Header.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";

function App() {
  function closeAllPopups() {
     setEditAvatarPopupOpen(false);
     setEditProfilePopupOpen(false);
     setisAddPlacePopupOpen(false);
  }

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  function handleEditProfilePopupOpen() {
    setEditProfilePopupOpen(true);
  }

  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = React.useState(false);
  function handleisAddPlacePopupOpen() {
    setisAddPlacePopupOpen(true);
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfilePopupOpen}
        onAddPlace={handleisAddPlacePopupOpen}
      />

      <PopupWithForm
        title="Обновить аватар"
        name="avatar"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input
          type="url"
          id="avatar-link-input"
          className="popup__input popup__input_type_link"
          name="link"
          value=""
          placeholder="Ссылка на картинку"
          required
        />
        <span className="avatar-link-input-error popup__input-error"></span>
        <button
          type="submit"
          className="popup__button-submit avatar-popup__button-submit"
        >
          Сохранить
        </button>
      </PopupWithForm>

      <PopupWithForm
        title="Редактировать профиль"
        name="profile"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          id="name-input"
          type="text"
          className="popup__input popup__input_type_name"
          name="name"
          value=""
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
        />
        <span className="name-input-error popup__input-error"></span>
        <input
          id="job-input"
          type="text"
          className="popup__input popup__input_type_job"
          name="about"
          value=""
          placeholder="О себе"
          required
          minLength="2"
          maxLength="200"
        />
        <span className="job-input-error popup__input-error"></span>
        <button type="submit" className="popup__button-submit">
          Сохранить
        </button>
      </PopupWithForm>

      <PopupWithForm
        name="add"
        title="Новое место"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          type="text"
          id="place-input"
          className="popup__input popup__input_type_place"
          name="name"
          value=""
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
          value=""
          placeholder="Ссылка на картинку"
          required
        />
        <span className="link-input-error popup__input-error"></span>
        <button type="submit" className="popup__button-submit">
          Сохранить
        </button>
      </PopupWithForm>

      <ImagePopup />

      <PopupWithForm title="Вы уверены?" name="remove">
        <button type="submit" className="popup__button-submit">
          Да
        </button>
      </PopupWithForm>

      <Footer />
    </div>
  );
}

export default App;
