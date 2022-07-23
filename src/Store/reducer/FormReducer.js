import { ADD_USER, SET_SELECTED_USER, UPDATE_USER, DELETE_USER } from '../type/FormType';

const DEFAULT_STATE = {
    userList: [
        {
            id: 1,
            maSV: '123456',
            name: 'Vo Thanh Nam',
            phoneNumber: '0399677216',
            email: 'nam@gmail.com'
        }
    ],

    selectedUser: null,
}


// Store of state
export const FormReducer = (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
        case ADD_USER: {
            const data = [...state.userList];

            data.push(payload);

            state.userList = data;


            return { ...state }
        }

        case SET_SELECTED_USER: {

            return { ...state, selectedUser: payload };
        }

        case UPDATE_USER: {
            const data = [...state.userList];

            const idx = data.findIndex(ele => ele.id === payload.id);

            if (idx !== -1) {
                data[idx] = payload;
            }

            state.userList = data;
            // state.userList = state.userList.map(ele => ele.id === payload.id ? payload : ele); 
            state.selectedUser = null;

            return { ...state }
        }

        case DELETE_USER: {
            // const data = [...state.userList];

            // const idx = data.findIndex(ele => ele.id === payload.id);

            // if(idx !== -1) {
            //     data.splice(idx, 1)
            // }
            
            state.userList = state.userList.filter((ele) => ele.id !== payload.id);

            return { ...state }
        }

        default:
            return state
    }
}