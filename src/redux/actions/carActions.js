import {
	CREATE_CAR_AND_SET_OWNER_SAGA,
	CREATE_CAR_SAGA,
	GET_CARS_SAGA,
} from './action-types';

export const createCarAndSetOwnerAction = (
	carBrand,
	carModel,
	registration,
	engine,
	milage,
	productionYear,
	userId
) => {
	return {
		type: CREATE_CAR_AND_SET_OWNER_SAGA,
		payload: {
			carBrand,
			carModel,
			registration,
			engine,
			milage,
			productionYear,
			userId,
		},
	};
};

export const createCarAction = (
	carBrand,
	carModel,
	registration,
	engine,
	milage,
	productionYear
) => {
	return {
		type: CREATE_CAR_SAGA,
		payload: {
			carBrand,
			carModel,
			registration,
			engine,
			milage,
			productionYear,
		},
	};
};

export const getCarsAction = (page, limit, search) => {
	return {
		type: GET_CARS_SAGA,
		payload: { limit, page, search },
	};
};
