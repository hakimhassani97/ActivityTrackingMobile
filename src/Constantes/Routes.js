import {base_url} from '../../package.json'

let base_mobile = base_url + '/' + 'mobile'
let base_web = base_url + '/' + 'web'

let Routes = {
    base: base_url,
    base_mobile,
    base_web,
    home: base_mobile+'/Home',
    profile: base_mobile+'/Profile',
    login: base_mobile+'/Login',
    register: base_mobile+'/Register',
    notifications: base_mobile+'/Notifications',
    whome: base_web+'/Home',
    wstats: base_web+'/Statistics',
    wstep: base_web+'/Steps',
    wsitting: base_web+'/Sitting',
    wtemp: base_web+'/Temperature',
    wdoor: base_web+'/Door'
}
export default Routes