import React from 'react';

import CurrentUserContext from '../contexts/CurrentUserContext.js';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ConfirmationPromptPopup from './ConfirmationPromptPopup.js';

import api from '../utils/api.js';
import { logErrors } from '../utils/utils.js';

import defaultAvatar from '../images/profile-avatar.jpg';

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
  const [ isUpdatingAvatar, setIsUpdatingAvatar ] = React.useState(false);
  const [ isUpdatingProfile, setIsUpdatingProfile ] = React.useState(false);
  const [ isCreatingPlace, setIsCreatingPlace ] = React.useState(false);
  const [ isDeletingAfterConfirming, setIsDeletingAfterConfirming ] = React.useState(false);

  const isOpen = (
    isEditAvatarPopupOpen || 
    isEditProfilePopupOpen || 
    isAddPlacePopupOpen || 
    idOfCardToBeDeleted || /* for confirmation popup */
    selectedCard._id      /* for image popup */
  );


  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIdOfCardToBeDeleted(null);
    setSelectedCard({ ...selectedCard, _id: null });
  }

  function handleClosingAllPopupsUsingEscKey(evt) {
    if(evt.key === 'Escape') {
      closeAllPopups();
    }
  }


  React.useEffect(() => { // using approach similar to earlier sprints
    if(isOpen) {
      document.addEventListener('keydown', handleClosingAllPopupsUsingEscKey);
    } else {
      document.removeEventListener('keydown', handleClosingAllPopupsUsingEscKey);
    }
  }, [isOpen]);

  React.useEffect(() => {
    api.getUserProfile()
      .then(setCurrentUser)
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

  function handleCardDelete(id) {
    setIdOfCardToBeDeleted(id);
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
    setIsUpdatingProfile(true);
    api.updateUserProfile(name, about)
      .then(setCurrentUser)
      .catch(logErrors)
      .finally(() => {
        closeAllPopups();
        setIsUpdatingProfile(false);
      });
  }

  function handleUpdateAvatar(avatar) {
    setIsUpdatingAvatar(true);
    api.updateUserAvatar(avatar)
      .then(setCurrentUser)
      .catch(logErrors)
      .finally(() => {
        closeAllPopups();
        setIsUpdatingAvatar(false);
      });
  }

  function handleAddPlace(name, link) {
    setIsCreatingPlace(true);
    api.createCard(name, link)
      .then((newCard) => setCards([newCard, ...cards]))
      .catch(logErrors)
      .finally(() => {
        closeAllPopups();
        setIsCreatingPlace(false);
      });
  }

  function handleConfirmation() {
    setIsDeletingAfterConfirming(true);
    api.deleteCard(idOfCardToBeDeleted)
      .then((data) => {
        console.log('returned:', data);
        const updatedCards = cards.filter((aCard) => aCard._id !== idOfCardToBeDeleted);
        setCards(updatedCards);
      })
      .catch(logErrors)
      .finally(() => {
        closeAllPopups();
        setIsDeletingAfterConfirming(false);
      });
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
        
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser} 
          isUpdatingProfile={isUpdatingProfile} 
        />

        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups} 
          onAddPlace={handleAddPlace} 
          isCreatingPlace={isCreatingPlace} 
        />

        <ConfirmationPromptPopup 
          isOpen={idOfCardToBeDeleted !== null} 
          onClose={closeAllPopups} 
          onConfirmation={handleConfirmation} 
          isDeletingAfterConfirming={isDeletingAfterConfirming} 
        />
          
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar} 
          isUpdatingAvatar={isUpdatingAvatar} 
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
/*
  Note:
  - All popups can be closed using close button, ESC key, and clicking on overlay (and not 
    its contents)
  - forms operate as follows
    - submit button is disabled when having invalid inputs, submitting, and closing  form popups
    - input errors are shown when inputs are invalid and are hidden when closing the form popups
      and shown when opening
    - when closing form popup, input fields are not reset, but they cleared when 
      submitting (except for profile form to update user name and description)
    - text change on submit button to show the user that information is being saved (except
      when deleting cards)
    - when deleting card, the user is asked to confirm first.
*/