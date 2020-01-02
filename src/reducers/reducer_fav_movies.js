import {FAVEFETCH_MOVIE} from '../actions/index'
export default function (state=[],action){
  switch (action.type) {
    case FAVEFETCH_MOVIE:
      return [action.payload];
      default:
  }
  return state
}