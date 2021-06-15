import { API_URL } from '../../utils/constant'

export const signup = (username, password, successCb, errorCb) => {
  fetch(
    'https://hasura.io/learn/auth/signup',
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password
      })
    }
  )
  .then(resp => resp.json()
    .then(respObj => {
      console.log('ini ye')
      if (resp.status === 200) {
        successCb(respObj);
        return;
      }
      if (respObj.errors && respObj.errors.length > 0) {
        errorCb({
          title: 'Error',
          message: respObj.errors[0].message
        })
        return;
      } else if (respObj.message && respObj.message.includes('unique')) {
        errorCb({
          title: 'This username is already signed up',
          message: 'Try logging in'
        })
        return;
      }
      errorCb({
        title: 'Unknown Error',
        message: 'Please try again'
      })
    })
  )
  .catch(err => {
    console.log(err);
    errorCb({
      title: 'Unexpected',
      message: 'Please try again'
    })
  })
};

export const login = (username, password, successCb, errorCb) => {
  fetch(
    `${API_URL}/auth/login`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    }
  )
  .then(resp => {
    resp.json()
    .then(respObj => {
      if (resp.status === 200 && respObj.is_success === true) {
        successCb(respObj);
        return;
      }
      if (respObj.error) {
        errorCb({
          title: 'Error',
          message: respObj.error
        });
        return;
      }
      errorCb({
        title: 'Unknown Error',
        message: 'Please try again'
      })
    })}
  )
  .catch(err => {
    console.log(err);
    errorCb({
      title: 'Unexpected',
      message: 'Please try again'
    })
  })
};

let logout;
export const setLogout = (l) => {
  logout = l
};
export { logout };