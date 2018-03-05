//ZBIÓR REDUCERÓW - redux store
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import PostsReducer from './reducer_posts';

const rootReducer = combineReducers({
  posts: PostsReducer,
  form: formReducer//podłączy nas to do action creatorów
});

export default rootReducer;
