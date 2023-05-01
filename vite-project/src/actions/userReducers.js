export const userReducers = {
 changeUser(state, {payload}){
   return {...state, isLogged: true, user: payload}
 },
 logout(state){
   return {...state, isLogged: false, user: ''}
 }
}