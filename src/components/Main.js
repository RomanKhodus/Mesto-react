function Main({ onEditAvatar, onEditProfile, onAddPlace }) {
  return (
    <main>
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar-container" onClick={onEditAvatar}>
            <img alt="Аватар автора" className="profile__avatar" />
            <div className="profile__overlay"></div>
          </div>
          <div className="profile__namespace">
            <div className="profile__container">
              <h1 className="profile__name">Жак-Ив Кусто</h1>
              <p className="profile__job">Исследователь океана</p>
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
      <section className="elements">🦒</section>
    </main>
  );
}

export default Main;
