module.exports = {
    SET_LOGIN_STATUS: (state, status) => {
        state.isLoggedIN = status
    },
    SET_USER_TOKEN: (state, tok) => {
        state.userToken = tok
    }
}