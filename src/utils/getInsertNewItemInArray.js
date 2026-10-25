const getInsertNewItemInArray = (prevArray, newItem) => { // its allways insert new value without reapting
    if (prevArray.includes(newItem)) {
        return prevArray
    }
    return [...prevArray, newItem]
}

export default getInsertNewItemInArray