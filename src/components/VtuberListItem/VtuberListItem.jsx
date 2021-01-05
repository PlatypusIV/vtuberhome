import React from "react";
import "./VtuberListItem.css";
const youtubeUrls = require("../../logic/youtubeRelated");

export default class VtuberListItem extends React.Component {
    constructor(props) {
        super();

        this.state = {
            favoriteChecked: false
        }
    }

    componentDidMount = () => {
        try {
            this.setState({
                favoriteChecked: this.props.isFavoritedProp
            });
        } catch (error) {
            console.log(error);
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.favoriteChecked !== this.state.favoriteChecked) {
            this.props.favoriteVtuberProp(this.props.vtuberDataProp.id, this.state.favoriteChecked);
        }
    }

    // selectVtuber = () => {
    //     // console.log(this.props.vtuberDataProp);
    // }

    showTwitter=(vtuber)=>{
        if(vtuber.twitter!==""){
           return <span><strong>Twitter:</strong><a href={vtuber.twitter}>{vtuber.twitter}</a></span>;

        }
    }

    favoriteVtuber = (evt) => {
        try {
            this.setState({ favoriteChecked: evt.target.checked });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const vtuber = this.props.vtuberDataProp;
        return (<span className="divVtuberListItem">
            <div className="divCardMain">
                <img src={vtuber.thumbnails.medium.url} alt="It seems that this thumbnail could not be gotten" className="cardVtuberImage" />
                <div className="divTitle"><strong>Name:</strong>{vtuber.name}</div>
                <div className="divVtuberCardBody">
                    <span><strong>Group:</strong>{vtuber.group}</span>
                    <span className="divChannelLink"><strong>Channel:</strong>
                        <a href={youtubeUrls.craftChannelUrl(vtuber.id)}>{vtuber.title}</a>
                    </span>
                    {this.showTwitter(vtuber)}
                    <span><strong>Subscriber count:</strong>{vtuber.subscriberCount}</span>
                    <span><strong>Video count:</strong>{vtuber.videoCount}</span>
                    <span className="spanFavoriteCheckBox">
                        <form>
                            <input type="checkbox" id="checkboxFavorite" onChange={this.favoriteVtuber} checked={this.state.favoriteChecked} />
                            <label htmlFor="checkboxFavorite">Favorite</label>
                        </form>
                    </span>
                    {vtuber.retired && (<span><strong>(retired)</strong></span>)}
                </div>
            </div>
        </span>)
    }
}