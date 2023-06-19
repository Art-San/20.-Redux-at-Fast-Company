import { createSlice } from '@reduxjs/toolkit'
import qualityService from '../services/quality.service'

const qualitiesSlice = createSlice({
    name: 'qualities',
    initialState: {
        entities: null,
        isLoading: true,
        error: null // Создаем Qualities Reducer
    },
    reducers: {
        // Создаем Qualities Reducer
        qualitiesRequested: (state) => {
            state.isLoading = true
        },
        qualitiesReceved: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        qualitiesRequestFiled: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

const { actions, reducer: qualitiesReducer } = qualitiesSlice
const { qualitiesRequested, qualitiesReceved, qualitiesRequestFiled } = actions // Создаем Qualities Reducer

// Создаем Qualities Reducer
export const loadQualitiesList = () => async (dispatch) => {
    dispatch(qualitiesRequested())
    try {
        const { content } = await qualityService.fetchAll()
        dispatch(qualitiesReceved(content))
    } catch (error) {
        dispatch(qualitiesRequestFiled(error.message))
    }
}

export default qualitiesReducer
