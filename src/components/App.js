import React from 'react';

import CurrentUserContext from '../contexts/CurrentUserContext.js';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/api.js';
import { logErrors } from '../utils/utils.js';

import defaultAvatar from '../images/profile-avatar.jpg';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';

function App() {
  const [ isEditProfilePopupOpen, setIsEditProfilePopupOpen ]  = React.useState(false);
  const [ isAddPlacePopupOpen, setIsAddPlacePopupOpen ] = React.useState(false);
  const [ isEditAvatarPopupOpen, setIsEditAvatarPopupOpen ] = React.useState(false);
  const [ selectedCard, setSelectedCard ] = React.useState({ _id: null, link: '#',  name: '' });
  const [ currentUser, setCurrentUser ] = React.useState({
    name: 'Jacques Cousteau',
    about: 'Explorer',
    avatar: defaultAvatar,
    _id: null
  });
  const [ cards, setCards ] = React.useState([]);
  const [ idOfCardToBeDeleted, setIdOfCardToBeDeleted ] = React.useState(null);

  React.useEffect(() => {
    api.getUserProfile()
      .then(({ _id, name, about, avatar }) => setCurrentUser({ _id, name, about, avatar }))
      .catch(logErrors);
  }, []);

  React.useEffect(() => {
    api.getInitialCards()
      .then(setCards)
      .catch(logErrors);
  }, []);

  function handleCardLike(clickedCardId, isClickedCardLikedAlreadyByUser) {
    api.updateCardLikes(clickedCardId, !isClickedCardLikedAlreadyByUser)
      .then((updatedCard) => {
        const updatedCards = cards.map((card) => card._id === clickedCardId ? updatedCard : card);
        setCards(updatedCards);
      })
      .catch(logErrors);
  }

  function handleCardDelete(cardToBeDeletedId) {
    setIdOfCardToBeDeleted(cardToBeDeletedId);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardSelect(cardId, cardName, cardLink) {
    setSelectedCard({
      _id: cardId,
      name: cardName, 
      link: cardLink
    });
  }

  function handleUpdateUser(name, about) {
    api.updateUserProfile(name, about)
      .then((updatedUser) => setCurrentUser({
        ...currentUser,
        name: updatedUser.name,
        about: updatedUser.about 
      }))
      .catch(logErrors)
      .finally(closeAllPopups);
  }

  function handleUpdateAvatar(avatar) {
    api.updateUserAvatar(avatar)
      .then((updatedUser) => setCurrentUser({
        ...currentUser,
        avatar: updatedUser.avatar
      }))
      .catch(logErrors)
      .finally(closeAllPopups);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIdOfCardToBeDeleted(null);
    setSelectedCard({ ...selectedCard, _id: null });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardDelete={handleCardDelete} 
          onCardSelect={handleCardSelect}
          onCardLike={handleCardLike}
          cards={cards}
        />
        <Footer />
        
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <PopupWithForm name="location-create" title="New place" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
          <div className="project-form__field-wrapper project-form__field-wrapper_form_location-create">
            <input 
              type="text"
              aria-label="Title"
              name="locationTitle"
              id="location-title-input"
              className="project-form__input project-form__input_type_location-create-field"
              placeholder="Title"
              minLength="2"
              maxLength="30"
              required
            />
            <p className="project-form__input-error project-form__input-error_field_location-title-input"></p>
          </div>
          <div className="project-form__field-wrapper project-form__field-wrapper_form_location-create">
            <input
              type="url"
              aria-label="Image link"
              name="imageLink"
              id="location-image-link-input"
              className="project-form__input project-form__input_type_location-create-field"
              placeholder="Image link"
              required
            />
            <p className="project-form__input-error project-form__input-error_field_location-image-link-input"></p>
          </div>
        </PopupWithForm>

        <PopupWithForm 
          name="confirmation-prompt" 
          title="Are you sure?" 
          isOpen={idOfCardToBeDeleted != null} 
          onClose={closeAllPopups}
        />
          
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
