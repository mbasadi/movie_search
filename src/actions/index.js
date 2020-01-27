import axios from 'axios';
const API_KEY = 'be08e33eec7abc6a424374d3030f2c65';
const SESSION_ID = '24329828bb3cdd40d3b3da2626e5952b91695cbc';
const account_id = '5df9ba74609750001531b2e1';
const Basic_URL='https://api.themoviedb.org/3/';
export const INTFETCH_MOVIE = 'INTFETCH_MOVIE';
export const SEARCH_MOVIE = 'SEARCH_MOVIE';
export const FAVEPOST_MOVIE = 'FAVEPOST_MOVIE';
export const FAVEFETCH_MOVIE = 'FAVEFETCH_MOVIE';
export const SAVEPOST_MOVIE = 'SAVEPOST_MOVIE';
export const SAVEFETCH_MOVIE = 'SAVEFETCH_MOVIE';
export function Fetchingdata(type,term=null) {
  let Query='';
  let out_type='';
  switch (type) {
    case INTFETCH_MOVIE:
     Query=`${Basic_URL}movie/popular?api_key=${API_KEY}`;
     out_type=INTFETCH_MOVIE;
    break;
    case SEARCH_MOVIE:
     Query=`${Basic_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${term}&page=1&include_adult=tfalse`;
     out_type=SEARCH_MOVIE;
    break;
    case FAVEFETCH_MOVIE:
     Query=`${Basic_URL}account/${account_id}/favorite/movies?api_key=${API_KEY}&session_id=${SESSION_ID}&language=en-US&sort_by=created_at.asc&page=1`;
     out_type=FAVEFETCH_MOVIE;
    break;
    case SAVEFETCH_MOVIE:
     Query=`${Basic_URL}account/${account_id}/watchlist/movies?api_key=${API_KEY}&session_id=${SESSION_ID}&language=en-US&sort_by=created_at.asc&page=1`;
     out_type=SAVEFETCH_MOVIE;
    break;
    default:
    };
    let request = axios.get(Query);
    return(dispatch) => {
      request.then(({ data }) => {
        
        dispatch({
          type: out_type,
          payload: data
        }
        )
      })
    };
};
export function Postingdata(type,id, boul) {
  let Query='';
  let Request_Body='';
  let out_type='';
  switch (type){
    case SAVEPOST_MOVIE:
     Query=`${Basic_URL}account/${account_id}/watchlist?api_key=${API_KEY}&session_id=${SESSION_ID}`;
     Request_Body={
      "media_type": "movie",
      "media_id": id,
      "watchlist": boul
    };
     out_type=SAVEPOST_MOVIE;
    Fetchingdata('SAVEFETCH_MOVIE');
    break;
  case FAVEPOST_MOVIE:
   Query=`${Basic_URL}account/${account_id}/favorite?api_key=${API_KEY}&session_id=${SESSION_ID}`;
   Request_Body={
    "media_type": "movie",
    "media_id": id,
    "favorite": boul
  };
     out_type=FAVEPOST_MOVIE;
    Fetchingdata('FAVEFETCH_MOVIE');
    break; 
    default:
}
let request = axios.post(Query, Request_Body, {
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
  });
return(dispatch) => {
  request.then(({ data }) => {
    dispatch({
      type: out_type,
      payload: data
    }
    )
  })
};

}
