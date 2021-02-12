import {
	CLEAR_MESSAGE_RECEIVED,
	GET_MESSAGES_SAGA,
	GET_UNREAD_MESSAGES_NUMBER_SAGA,
	MESSAGE_RECEIVED,
	NEW_MESSAGE_SAGA,
	UPDATE_MESSAGE_SEEN_SAGA,
} from './action-types';

export const getMessagesAction = (page, limit, search) => ({
	type: GET_MESSAGES_SAGA,
	payload: { page, limit, search },
});

export const updateMessageSeenAction = (id) => ({
	type: UPDATE_MESSAGE_SEEN_SAGA,
	payload: { id },
});

export const getUnreadMessagesNumberAction = () => ({
	type: GET_UNREAD_MESSAGES_NUMBER_SAGA,
});

export const newMessageAction = (message) => ({
	type: NEW_MESSAGE_SAGA,
	payload: message,
});

export const messageRecievedAction = (message) => ({
	type: MESSAGE_RECEIVED,
	payload: message,
});

export const clearMessageRecievedAction = () => ({
	type: CLEAR_MESSAGE_RECEIVED,
});
