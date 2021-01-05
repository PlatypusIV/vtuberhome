import React from "react";
import { VtuberListItem, FilterBox } from "../index";
import "./VtuberList.css";


export default class VtuberList extends React.Component {
    componentDidMount = () => {

    }

    componentDidUpdate = (prevProps, prevState) => {

    }

    createVtuberList = (vtuberList) => {
        let listToReturn = <div></div>;
        const favArray = this.props.favoritesListProp;
        try {

            listToReturn = vtuberList.map(vtuber =>
                <VtuberListItem vtuberDataProp={vtuber}
                    favoriteVtuberProp={this.props.favoriteVtuberProp}
                    isFavoritedProp={favArray.includes(vtuber.id)}
                    key={vtuber.id} />
            )


        } catch (error) {
            console.log(error);
        }

        return listToReturn;
    }

    createVtuberListRow = () => {
        try {

        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div>
                <div className="divFilterBoxContainer"><FilterBox filterProp={this.props.filterVtuberProp}></FilterBox></div>
                <div className="divVtuberList">
                    {this.createVtuberList(this.props.vtuberDataProp)}
                </div>
            </div>)
    }
}