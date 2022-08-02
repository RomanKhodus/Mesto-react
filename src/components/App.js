import React from "react";
import Footer from "./Footer.js";
import Header from "./Header.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js"
import api from "../Utils/api.js";
import { CurrentUserContext } from "../context/CurrentUserContext.js";

function App() {
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
       });
     });
   }

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

  function handleAddPlaceSubmit(cardData){
    api.setNewCard(cardData).then((newCard) => {
      setCards([newCard, ...cards]);
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
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
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

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <PopupWithForm title="Вы уверены?" name="remove" buttonText="Да"></PopupWithForm>

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;























