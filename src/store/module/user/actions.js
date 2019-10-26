import API from '@/plugins/API'
import Storage from '@/plugins/Storage'
import Cookies from '@/plugins/cookies'
import router from '@/router'

export const getAdminData = ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
        API().post('/sh/userdata.php', data).then((res) => {
            if (res.data.status == 0) {
                let userData = res.data.result
                let userToken = res.data.result.tok
                Cookies.setCookie('x-auth-tok', userToken, 20)
                commit('SET_LOGIN_STATUS', true)
                commit('SET_USER_TOKEN', userToken)
                commit('SET_USER_DATA', userData)
                resolve(userData)
            } else {
                reject(res.data);
            }
        }).catch((err) => {
            reject(err);
        });
    })
}
export const getUserData = ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
        API().post('/sh/userdata.php', data).then((res) => {
            if (res.data.status == 0) {
                let userData = res.data.result
                resolve(userData)
            } else {
                reject(res.data);
            }
        }).catch((err) => {
            reject(err);
        });
    })
}
export const getWalletBalanceByAddress = ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
        API().post('/sh/balanceOf.php', data).then((res) => {
            if (res.data.status == 0) {
                let balance = res.data.result
                resolve(balance)
            } else {
                reject(res.data);
            }
        }).catch((err) => {
            reject(err);
        });
    })
}