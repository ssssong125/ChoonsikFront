import { 
    GET_BOARD,
    GET_BOARDS,
    POST_BOARDS_MANAGEMENT,
    PUT_BOARDS_MANAGEMENT,
    DELETE_BOARDS_MANAGEMENT
} from '../modules/BoardModule.js';

export const callBoardListAPI = ({currentPage}) => {
    
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v2/boards/${currentPage}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v2/boards`;
    }
    
    console.log('[BoardAPICalls] requestURL : ', requestURL);

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken") 
            }
        })
        .then(response => response.json());
        if(result.status === 200){
            console.log('[BoardAPICalls] callBoardListAPI RESULT : ', result);
            dispatch({ type: GET_BOARDS,  payload: result.data });
        }
    };
}

export const callBoardDetailAPI = ({boardCode}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v2/boards/detail/${boardCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken") 
            }
        })
        .then(response => response.json());

        console.log('[BoardAPICalls] callBoardDetailAPI RESULT : ', result);
        if(result.status === 200) {
            console.log('[BoardAPICalls] callBoardDetailAPI SUCCESS');
            dispatch({ type: GET_BOARD,  payload: result.data });
        }
    };
}

export const callBoardRegistAPI = ({form}) => {

    console.log('[BoardAPICalls] callBoardRegistAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v2/boards/management`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                // "Content-Type": "application/json",  
                // "Content-Type" : "multipart/form-data",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: form
        })
        .then(response => response.json());

        console.log('[BoardAPICalls] callBoardRegistAPI RESULT : ', result);

        dispatch({ type: POST_BOARDS_MANAGEMENT,  payload: result });
    };    
}

export const callBoardUpdateAPI = ({form}) => {
    console.log('[BoardAPICalls] callBoardUpdateAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v2/boards/management`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: form
        })
        .then(response => response.json());

        console.log('[BoardAPICalls] callBoardUpdateAPI RESULT : ', result);

        dispatch({ type: PUT_BOARDS_MANAGEMENT,  payload: result });
    };    
}

// export const callProductListAboutMealAPI = () => {
//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/products/meals`;

//     return async (dispatch, getState) => {

//         const result = await fetch(requestURL, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "*/*"                
//             }
//         })
//         .then(response => response.json());
//         if(result.status === 200){
//             console.log('[ProduceAPICalls] callProductListAboutMeal RESULT : ', result);
//             dispatch({ type: GET_PRODUCTS_MEAL,  payload: result.data });
//         }
        
//     };
// }

// export const callProductListAboutDessertAPI = () => {
//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/products/dessert`;

//     return async (dispatch, getState) => {

//         const result = await fetch(requestURL, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "*/*"                
//             }
//         })
//         .then(response => response.json());
//         if(result.status === 200){
//             console.log('[ProduceAPICalls] callProductListAboutDessert RESULT : ', result);
//             dispatch({ type: GET_PRODUCTS_DESSERT,  payload: result.data });
//         }
        
//     };
// }


// export const callProductListAboutBeverageAPI = () => {
//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/products/beverage`;

//     return async (dispatch, getState) => {

//         const result = await fetch(requestURL, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "*/*"                
//             }
//         })
//         .then(response => response.json());
//         if(result.status === 200){
//             console.log('[ProduceAPICalls] callProductListAboutBeverage RESULT : ', result);
//             dispatch({ type: GET_PRODUCTS_BEVERAGE,  payload: result.data });
//         }
        
//     };
// }

// export const callSearchBoardAPI = ({search}) => {
//     console.log('[ProduceAPICalls] callSearchProductAPI Call');

//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/products/search?s=${search}`;
    
//     return async (dispatch, getState) => {

//         const result = await fetch(requestURL, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "*/*"
//             }
//         })
//         .then(response => response.json());

//         console.log('[ProduceAPICalls] callSearchProductAPI RESULT : ', result);

//         dispatch({ type: GET_BOARDS,  payload: result.data });
//     };    
// };

// export const callProductListForAdminAPI = ({currentPage}) => {
//     let requestURL;

//     if(currentPage !== undefined || currentPage !== null){
//         requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/products-management?offset=${currentPage}`;
//     }else {
//         requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/products-management`;
//     }
    
//     console.log('[ProduceAPICalls] requestURL : ', requestURL);

//     return async (dispatch, getState) => {

//         const result = await fetch(requestURL, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "*/*",
//                 "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
//             }
//         })
//         .then(response => response.json());
//         if(result.status === 200){
//             console.log('[ProduceAPICalls] callProductListForAdminAPI RESULT : ', result);
//             dispatch({ type: GET_PRODUCTS,  payload: result.data });
//         }
        
//     };
// }

// export const callBoardDetailForAdminAPI = ({productCode}) => {
//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v2/products-management/${productCode}`;

//     return async (dispatch, getState) => {

//         const result = await fetch(requestURL, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "*/*",
//                 "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
//             }
//         })
//         .then(response => response.json());

//         console.log('[BoardAPICalls] callBoardDetailForAdminAPI RESULT : ', result);
//         if(result.status === 200){
//             console.log('[BoardAPICalls] callBoardDetailForAdminAPI SUCCESS');
//             dispatch({ type: GET_PRODUCT,  payload: result.data });
//         }
//     };
// }