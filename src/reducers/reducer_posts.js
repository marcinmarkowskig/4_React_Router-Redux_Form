//REDUCER - zwraca state
import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case DELETE_POST:
      return _.omit(state, action.payload);
    case FETCH_POST:
    // { ...state } oznacza wszystkie state'y danych, które dotychczas sciągnęliśmy
      //const post = action.payload.data; nowa zmienna = dane z nowo ściągniętej akcji
      //const newState = { ...state }; nowa zmienna = state'y z poprzednio sciągniętych danych
      //newState[post.id] = post; przypisanie nowo ściągniętej zmiennej do danego miejsca w tablicy poprzedio ściągniętych postów
      //return newState; zwracam tablicę state'ów wszystkich ściągniętych postów
      //to na dole jest tym samymy co 4! linijki powyżej tej
      return { ...state, [action.payload.data.id]: action.payload.data};
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, 'id');//lodash, dzięki tej linii mamy zamianę [{....., id=10, ...}]-> 10: {....., id=10, ...}
      //dzięki lodashowi, możemy użyc również action.payload.data
    default:
      return state;
  }
}
