const initialState = [];

const reviewReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SAVE_REVIEW_LIST':
            return state = action.payload;
        default:
            return state;
    }
}

export default reviewReducer;