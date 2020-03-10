let hkreducer=localStorage['hk']!==undefined?JSON.parse(localStorage['hk']):[];
function hkReducer(state={keywords:hkreducer}, action) {
    //console.log(action);
    switch (action.type) {
        case "addHK":
            return Object.assign({},state,action);
        default:
            return state;
    }
}
export default hkReducer;