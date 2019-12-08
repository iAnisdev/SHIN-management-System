import API from '@/plugins/API'
import Storage from '@/plugins/Storage'
import Cookies from '@/plugins/cookies'
import router from '@/router'

export const userLogin = ({ commit, dispatch }, data) => new Promise((resolve, reject) => {
    API().post('/sh/login.php', data).then((res) => {
        if (res.data.status == 0) {
            if (res.data.result.admin == 1) {
                let userToken = res.data.result.token
                Cookies.setCookie('x-auth-tok', userToken, 20)
                commit('SET_LOGIN_STATUS', true)
                commit('SET_USER_TOKEN', userToken)
                router.push('/')
                resolve(res)
            } else {
                reject({
                    message: 'No admin access'
                })
            }
        } else {
            reject(res.data);
        }
    }).catch((err) => {
        reject(err);
    });
});
