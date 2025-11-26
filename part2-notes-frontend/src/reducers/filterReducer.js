import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter: (state, action) => action.payload
  }
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer

// const filterReducer = (state = '', action) => {
//   switch (action.type) {
//     case 'SET_FILTER': {
//       return action.payload
//     }
//     default: 
//       return state
//   }
// }

// export const setFilter = content => {
//   return {
//     type: 'SET_FILTER',
//     payload: content
//   }
// }

// export default filterReducer