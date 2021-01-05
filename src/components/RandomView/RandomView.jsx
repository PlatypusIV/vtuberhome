import React from "react";
import { VtuberListItem } from "../index";
import "./RandomView.css";

export default class RandomView extends React.Component {
    constructor(){
        super();

        this.state={
            hololive:[],
            nijisanji:[],
            independent:[]
        }
    }


    componentDidMount = () => {
        if (this.props.vtuberDataProp && typeof(this.props.vtuberDataProp)!== undefined) {
            // console.log(this.props.vtuberDataProp);
            this.setRandomCards();

        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        try {

        } catch (error) {
            console.log(error);
        }
    }

    getRandomCards = (cardsToGet) => {
        let cardsToReturn = [];

        try {
            if (typeof (this.props.vtuberDataProp) !== undefined) {
                let cardsToRng = [];
                let rng = [];
                switch (cardsToGet) {
                    case "hololive":
                        cardsToRng = this.props.vtuberDataProp.filter(vtuber => vtuber.group === "hololive");

                        break;
                    case "nijisanji":
                        cardsToRng = this.props.vtuberDataProp.filter(vtuber => vtuber.group === "nijisanji");

                        break;
                    case "independent":
                        cardsToRng = this.props.vtuberDataProp.filter(vtuber => vtuber.group !== "nijisanji" && vtuber.group !== "hololive");

                        break;
                    default:
                        break;
                }


                while (rng.length < 5) {
                    let rnum = this.getRandomNumber(0, cardsToRng.length - 1);
                    if (!rng.includes(rnum)) {
                        rng.push(rnum);
                    }
                }



                if (rng.length > 0) {

                    cardsToReturn = rng.map(rnum => cardsToRng[rnum]);
                }
            }

        } catch (error) {
            console.log(error);
        }
        return cardsToReturn;
    }

    setRandomCards =()=>{
        try {

            let types= ["hololive","nijisanji","independent"];
            let cardArrays = [[],[],[]];

            for(let i = 0;i<types.length;i++){
                cardArrays[i] = this.getRandomCards(types[i]);
            }

            this.setState({
                hololive:cardArrays[0],
                nijisanji:cardArrays[1],
                independent:cardArrays[2]
            });

            
        } catch (error) {
            console.log(error);
        }
    }

    getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    showCards = (cardsToShow) => {
        let listToReturn = <div></div>;
        const favArray = this.props.favoritesListProp;
        try {
            listToReturn = cardsToShow.map(vtuber =>
                <VtuberListItem vtuberDataProp={vtuber}
                    favoriteVtuberProp={this.props.favoriteVtuberProp}
                    isFavoritedProp={favArray.includes(vtuber.id)} 
                    key={vtuber.id}/>
            )
        } catch (error) {
            console.log(error);
        }
        return listToReturn;
    }

    render() {

        return (<div className="divMainRandomView">
            <div className="btnContainer">
                <button className="buttonRandomize" onClick={this.setRandomCards}>
                    Random
                </button>
            </div>
            <div className="divGroupBar">
                <div>
                    <span>Hololive</span>
                </div>
                <div className="divGroupCardBar">
                    {this.showCards(this.state.hololive)}
                </div>
            </div>
            <div className="divGroupBar">
                <div>
                    <span>Nijisanji</span>
                </div>
                <div className="divGroupCardBar">
                    {this.showCards(this.state.nijisanji)}
                </div>
            </div>
            <div className="divGroupBar">
                <div>
                    <span>Independent</span>
                </div>
                <div className="divGroupCardBar">
                    {this.showCards(this.state.independent)}
                </div>
            </div>
            <div className="btnContainer">
                <button className="buttonRandomize" onClick={this.setRandomCards}>
                    Random
                </button>
            </div>
        </div>)
    }
}