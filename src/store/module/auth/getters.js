module.exports = {
    getLoginStatus: (state) => {
        return state.isLoggedIN
    },
    getUserToken: (state) => {
        return state.userToken
    }
}