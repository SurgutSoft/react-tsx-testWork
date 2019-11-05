import {
    IS_LOADING_DATA,
    IS_ERRORED_FETCH_ITEMS,
    FETCH_ITEMS_IS_SUCCESS,
} from "../actions/ChartAction"
import { ActionType} from "../actions/ChartAction"

export function isErroredFetchItems(state = false, action: ActionType) {
    switch (action.type) {
        case IS_ERRORED_FETCH_ITEMS:
            return action.isErrored;

        default:
            return state;
    }
}

export function isLoadingItems(state = false, action: ActionType) {
    switch (action.type) {
        case IS_LOADING_DATA:
            return action.isLoading;

        default:
            return state;
    }
}

export function chartData(state = [], action: ActionType) {
    switch (action.type) {
        case FETCH_ITEMS_IS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

