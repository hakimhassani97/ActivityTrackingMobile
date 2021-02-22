
const initAuth = (db)=>{
    let uid = localStorage.getItem('uid')
    if(!uid){
        let uid = db.ref('users/').push().key
        localStorage.setItem('uid', uid)
    }
    return uid
}

export {initAuth}