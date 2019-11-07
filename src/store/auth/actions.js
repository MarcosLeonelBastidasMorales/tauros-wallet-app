// Constants
import { LOGIN } from './constants';

// Login
export const signIn = ({ email, password }) => async dispatch => {
  const url = 'https://api.staging.tauros.io/api/v2/auth/signin/';

  const options = {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  };

  try {
    const { payload } = await fetch(url, options).then(res => res.json());
    const { token } = payload;
    dispatch({ type: LOGIN, payload: token });
  } catch (err) {
    console.error(err);
  }
};
