import {
	UPDATE_MESSAGE_SEEN,
	GET_MESSAGES,
	GET_UNREAD_MESSAGES_NUMBER,
	NEW_MESSAGE,
} from '../actions/action-types';

const initialState = {
	messages: [],
	count: 1,
	unreadMessages: 0,
};

export const messagesReducer = (state = initialState, action) => {
	switch (action.type) {
		case NEW_MESSAGE:
			return {
				count: state.count,
				messages: [action.payload, ...state.messages],
				unreadMessages: state.unreadMessages + 1,
			};
		case GET_MESSAGES:
			return {
				messages: action.payload.messages,
				count: action.payload.count,
				unreadMessages: state.unreadMessages,
			};
		case GET_UNREAD_MESSAGES_NUMBER:
			return { ...state, unreadMessages: action.payload };

		case UPDATE_MESSAGE_SEEN:
			const newMessages = state.messages.map((msg) => {
				if (msg.id === action.payload.id) return action.payload;
				return msg;
			});

			return {
				...state,
				messages: newMessages,
				unreadMessages: state.unreadMessages - 1,
			};
		default:
			return state;
	}
};
