import React from "react";
import "./FavoritesView.css";
import { VtuberListItem } from "../";

export default class FavoritesView extends React.Component {

    componentDidMount = () => {

    }

    componentDidUpdate = () => {

    }

    makeFavoriteList = (favIdArray) => {




    }


    showFavoritesList = (inputFavorites, inputVtubers) => {
        let favsToReturn = <div></div>;
        if (typeof (favIdArray) === undefined || inputFavorites.length === 0) {
            return favsToReturn;
        }

        let tempFavList = inputVtubers.filter(vtuber =>(inputFavorites.includes(vtuber.id)));

        favsToReturn = tempFavList.map(vtuber=>
            <VtuberListItem vtuberDataProp={vtuber}
                    favoriteVtuberProp={this.props.favoriteVtuberProp}
                    isFavoritedProp={inputFavorites.includes(vtuber.id)} 
                    key={vtuber.id}/>
        );
        console.log(favsToReturn);
        return favsToReturn;
    }

    render() {
        return (<div className="divMainFavoriteView">{this.showFavoritesList(this.props.favoritesListProp, this.props.vtuberDataProp)}</div>)
    }
}