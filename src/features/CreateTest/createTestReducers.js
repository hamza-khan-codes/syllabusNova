const createTestReducers = {
    updateInfo: (state,action)=>{
         Object.assign(state.info, action.payload);
    }
}

