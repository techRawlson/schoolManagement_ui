// userActions.js

export const setUser = (user) => ({
    type: 'SET_USER',
    payload: user,
  });
  
  // Async action creator using redux-thunk
  export const loginUser = (userData) => {
    return async (dispatch) => {
      try {
        // Simulate async login process (replace with actual API call)
        const loggedInUser = {
          username: userData.username,
          jwtToken: userData.jwtToken,
        };
  
        // Dispatch plain object action after successful login
        dispatch(setUser(loggedInUser));
      } catch (error) {
        console.error('Error during login:', error);
        // Handle error if needed
      }
    };
  };
  