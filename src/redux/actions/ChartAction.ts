export const FETCH_ITEMS_IS_SUCCESS = "FETCH_ITEMS_IS_SUCCESS";
export const IS_ERRORED_FETCH_ITEMS = "IS_ERRORED_FETCH_ITEMS";
export const IS_LOADING_DATA = "IS_LOADING_DATA";

type Action<K, V = void> = V extends void ? { type: K } : { type: K } & V

export type ActionType = Action<"FETCH_ITEMS_IS_SUCCESS", {payload: [] }> | 
Action<"IS_ERRORED_FETCH_ITEMS", {isErrored: boolean}> | 
Action<"IS_LOADING_DATA", {isLoading: boolean}>; 

export function erroredFetchItems(boolean: boolean) {
    return {
        type: IS_ERRORED_FETCH_ITEMS,
        isErrored: boolean,
    };
}

export function isLoadingItems(boolean: boolean) {
    return {
        type: IS_LOADING_DATA,
        isLoading: boolean,
    };
}

export function fetchItemsSuccess(data: any) {
    return {
        type: FETCH_ITEMS_IS_SUCCESS,
        payload: data,
    }
}

const firstChartData = {
    label: 'lorem ipsum1',
    fill: false,
    backgroundColor: 'red',
    borderColor: 'red',
    pointRadius: 1,
    pointHitRadius: 50,
    data: [60, 62, 64, 74, 69, 55, 56, 45, 37, 20, 15],
};

const secondChartData = {
    label: 'lorem ipsum2',
    fill: false,
    backgroundColor: 'green',
    borderColor: 'green',
    pointRadius: 1,
    pointHitRadius: 50,
    data: [10, 11, 13, 15, 16, 14, 13, 15, 19, 20, 27],
};

const thirdChartData = {
    label: 'lorem ipsum3',
    fill: false,
    backgroundColor: 'black',
    borderColor: 'black',
    pointRadius: 1,
    pointHitRadius: 50,
    data: [20, 16, 10, 5, 4, 5, 7, 8, 9, 9, 9],
};

//типо получаем данные по api с сервера
export function fetchDataChart() {
    return async (dispatch: any) => {
        dispatch(isLoadingItems(true));
        await setTimeout(() => {
            dispatch(isLoadingItems(false));
            dispatch(fetchItemsSuccess(data));
        }, 2500);
    };
}

const data = {
    labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    datasets: [firstChartData, secondChartData, thirdChartData]
};

