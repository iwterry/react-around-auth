import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import api from '../utils/api.js';

import { logErrors } from '../utils/utils.js';
import Card from './Card.js';

function Main(props) {
  const { onEditAvatar, onAddPlace, onEditProfile, onCardClick } = props;
  const [ cards, setCards ] = React.useState([]);
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    api.getInitialCards()
      .then((cardsFromApi) => setCards(cardsFromApi))
      .catch(logErrors);
  }, []);

  return (
    <main className="main-content">
      <section className="profile">
        <div className="profile__avatar-wrapper">
          <img src={currentUser.avatar} alt="profile avatar" className="profile__avatar" />
          <div className="profile__avatar-overlay" onClick={onEditAvatar}></div>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button type="button" aria-label="Edit" className="profile__edit-btn" onClick={onEditProfile}></button>
          <p className="profile__self-description">{currentUser.about}</p>
        </div>
        <button type="button" aria-label="Add location" className="profile__add-btn" onClick={onAddPlace}></button>
      </section>

      <section className="locations">
        <ul className="locations__collection">
        {cards.map(({ name, link, likes, _id, owner }) => { 
          return (
            <Card
              key={_id}
              card={{ name, link, likes, _id, owner }}
              onCardClick={onCardClick} 
            />
          );
        })}
        </ul>
      </section>
    </main>
  );
}

export default Main;