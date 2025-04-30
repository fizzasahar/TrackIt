import { GET_TASKS } from "../actionTypes";

const initialState = {
	tasks: [],
};

const taskReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_TASKS:
			return { ...state, tasks: action.payload };
		default:
			return state;
	}
};

export default taskReducer;