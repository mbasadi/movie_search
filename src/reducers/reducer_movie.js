import {INTFETCH_MOVIE} from '../actions/index'
import {SEARCH_MOVIE} from '../actions/index'
export default function (state=[],action){
  switch (action.type) {
    case INTFETCH_MOVIE:
      return [action.payload];
    case SEARCH_MOVIE:
      return [action.payload];
      default:
  }
  return state
}
