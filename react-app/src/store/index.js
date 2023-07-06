import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import boardsReducer from './boardsReducer';
import cardsReducer from './cardsReducer';
import listsReducer from './listsReducer';
import commentsReducer from './commentsReducer'
import labelsReducer from './labelsReducer'

const rootReducer = combineReducers({
  session,
  boards: boardsReducer,
  cards: cardsReducer,
  labels: labelsReducer,
  comments: commentsReducer,
  lists: listsReducer
});



let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
