import React from "react";
import PopupWithForm from "./PopupWithForm.js";


function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    
    avatarRef.current.value = '';
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        id="avatar-link-input"
        className="popup__input popup__input_type_link"
        name="link"
        ref={avatarRef}
        // value=""
        placeholder="Ссылка на картинку"
        required
      />
      <span className="avatar-link-input-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;