  const themeReducers = {
    toggleTheme: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
    };
    
export default themeReducers
