import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setlink] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handkeChangeLink(e) {
    setlink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name, link });
    setName("");
    setlink("");
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="place-input"
        className="popup__input popup__input_type_place"
        name="name"
        onChange={handleChangeName}
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
        onChange={handkeChangeLink}
        // value=""
        placeholder="Ссылка на картинку"
        required
      />
      <span className="link-input-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
