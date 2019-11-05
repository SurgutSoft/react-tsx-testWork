import { combineReducers } from "redux";
import { isErroredFetchItems, isLoadingItems, chartData } from './ChartReducer'

export default combineReducers({
    chartData,
    isLoading: isLoadingItems,
    isErrored: isErroredFetchItems,
})