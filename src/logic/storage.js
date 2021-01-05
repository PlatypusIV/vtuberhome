const favoriteListKey = 'favoriteVtuberList';

const addFavorite=(vtuberId)=>{
    try {
        let favorites = getFavoritesList();

        if(!favorites.includes(vtuberId)){
            favorites.push(vtuberId);
        }
        setFavoritesList(favorites);
    } catch (error) {
        console.log(error);
    }
}

const getFavoritesList =()=>{
    let favorites = [];
    try {
        let temp = localStorage.getItem(favoriteListKey);
        if(temp !==null){
            favorites = JSON.parse(localStorage.getItem(favoriteListKey));
        }
    } catch (error) {
        console.log(error);
    }
    return favorites;
}

const removeFavorite=(vtuberId)=>{
    try {
        let favorites = getFavoritesList();

        if(typeof(favorites.length)!==undefined){
            let i = favorites.indexOf(vtuberId);
            if(i>-1){
                favorites.splice(i,1);
            }

            setFavoritesList(favorites);
        }


    } catch (error) {
        console.log(error);
    }
}

const setFavoritesList =(newFavorites)=>{
    try {
        localStorage.setItem(favoriteListKey,JSON.stringify(newFavorites));
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    addFavorite,getFavoritesList,removeFavorite,setFavoritesList
}