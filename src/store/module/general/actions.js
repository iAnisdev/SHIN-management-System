import API from '@/plugins/API'
import Storage from '@/plugins/Storage'
import Cookies from '@/plugins/cookies'
import router from '@/router'
import { reject } from 'q'

export const toggelLoader = ({ commit, dispatch }, data) => {
    commit('SET_LOADER_STATUS')
}

export const getSystemVariables = ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
        API().post('/sh/getSysVars.php', data).then((res) => {
            if (res.data.status == 0) {
                resolve(res.data)
            } else {
                reject(res.data)
            }
        }).catch((err) => {
            reject(err)
        })
    })
}

export const setSystemVariable = ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
        API().post('/sh/setSysVar.php', data).then((res) => {
            if (res.data.status == 0) {
                resolve(res.data)
            } else {
                reject(res.data)
            }
        }).catch((err) => {
            reject(err)
        })
    })
}


export const getAccountTypes = ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
        API().post('/sh/getacct.php', data).then((res) => {
            if (res.data.status == 0) {
                resolve(res.data)
            } else {
                reject(res.data)
            }
        }).catch((err) => {
            reject(err)
        })
    })
}
export const getWalletBalance = ({ commit, dispatch }, data) => {
    // console.log('called ' , data)
    return new Promise((resolve, reject) => {
        API().post('/sh/balanceOf.php', data).then((res) => {
            if (res.data.status == 0) {
                resolve(res.data)
            } else {
                reject(res.data)
            }
        }).catch((err) => {
            reject(err)
        })
    })
}

export const transferToUser = ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
        API().post('/sh/tran2user.php', data).then((res) => {
            if (res.data.status == 0) {
                resolve(res.data)
            } else {
                reject(res.data)
            }
        }).catch((err) => {
            reject(err)
        })
    })
}

export const transferAmount = ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
        API().post('/sh/transfer.php', data).then((res) => {
            if (res.data.status == 0) {
                resolve(res.data)
            } else {
                reject(res.data)
            }
        }).catch((err) => {
            reject(err)
        })
    })
}

export const tranToAdvisors = ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
        API().post('/sh/tran2advisors.php', data).then((res) => {
            if (res.data.status == 0) {
                resolve(res.data)
            } else {
                reject(res.data)
            }
        }).catch((err) => {
            reject(err)
        })
    })
}

export const tranToAirdrop = ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
        API().post('/sh/tran2airdrop.php', data).then((res) => {
            if (res.data.status == 0) {
                resolve(res.data)
            } else {
                reject(res.data)
            }
        }).catch((err) => {
            reject(err)
        })
    })
}

export const tranToTeam = ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
        API().post('/sh/tran2team.php', data).then((res) => {
            if (res.data.status == 0) {
                resolve(res.data)
            } else {
                reject(res.data)
            }
        }).catch((err) => {
            reject(err)
        })
    })
}


export const tranFromAdvisors = ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
        API().post('/sh/tranFadvisors.php', data).then((res) => {
            if (res.data.status == 0) {
                resolve(res.data)
            } else {
                reject(res.data)
            }
        }).catch((err) => {
            reject(err)
        })
    })
}

export const tranFromAirdrop = ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
        API().post('/sh/tranFairdrop.php', data).then((res) => {
            if (res.data.status == 0) {
                resolve(res.data)
            } else {
                reject(res.data)
            }
        }).catch((err) => {
            reject(err)
        })
    })
}

export const tranFromTeam = ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
        API().post('/sh/tranFteam.php', data).then((res) => {
            if (res.data.status == 0) {
                resolve(res.data)
            } else {
                reject(res.data)
            }
        }).catch((err) => {
            reject(err)
        })
    })
}

export const getTransactionList = ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
        API().post('/sh/transactionsOf.php', data).then((res) => {
            if (res.data.status == 0) {
                resolve(res.data)
            } else {
                reject(res.data)
            }
        }).catch((err) => {
            reject(err)
        })
    })
}


export const logoutUser = ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
        resolve()
    })
}
