import { Redirect, Route } from "react-router"
import Routes from "../Constantes/Routes"

const initAuth = (db)=>{
    let uid = localStorage.getItem('uid')
    if(!uid){
        let uid = db.ref('users/').push().key
        localStorage.setItem('uid', uid)
    }
    return uid
}

export const login = (user)=>{
    localStorage.setItem('currentUser', JSON.stringify(user))
}
export const logout = ()=>{
    localStorage.removeItem('currentUser')
}

export const isLoggedIn = ()=>{
    let user = localStorage.getItem('currentUser')
    user = JSON.parse(user)
    return user
}

/**
 * the PrivateRoute Component
 * redirects to login if not authenticated
 */
 export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        if (!isLoggedIn()) {
            // user not authenticated
            return <Redirect to={{ pathname: Routes.login, state: { from: props.location } }} />
        }
        // user authenticated
        return <Component {...props} />
    }} />
)

/**
 * the PublicRoute Component
 * redirects to home if authenticated
 */
export const PublicRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        if (isLoggedIn()) {
            // user authenticated
            return <Redirect to={{ pathname: Routes.home, state: { from: props.location } }} />
        }
        // user not authenticated
        return <Component {...props} />
    }} />
)


export {initAuth}