import React from "react";
import "./styles.css";
import { Header, Nav, VtuberList, Footer, LiveStreamsView, RandomView, FavoritesView, AboutView } from "./components";

const storage = require("./logic/storage");
const filter = require("./logic/filter");
const tempVtuberCollection = require("./vtubersCollection.json");


// const languages = ["en", "jp", "de", "ch"];

export default class App extends React.Component {
  state = {
    vtubers: [],
    currentlyShownVtubers: [],
    favoriteVtubers: [],
    currentView: "home",
    language: "en"
  };
  componentDidMount() {
    this.onMountSetup();

  }

  // componentDidUpdate = (prevProps, prevState) => {
  //   try {

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }


  onMountSetup = () => {

    const favorites = storage.getFavoritesList();

    this.setState({
      vtubers: tempVtuberCollection,
      currentlyShownVtubers:tempVtuberCollection,
      favoriteVtubers: favorites
    });
  }

  selectView = (newView) => {
    try {
      this.setState({
        currentView: newView
      });
    } catch (error) {
      console.log(error);
    }
  }

  // selectLanguage = (language) => {
  //   try {
  //     console.log(language);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  favoriteVtuber = (vtuberId, isFavorited) => {
    try {
      if (isFavorited) {
        storage.addFavorite(vtuberId);
      } else {
        storage.removeFavorite(vtuberId);
      }
      const favorites = storage.getFavoritesList();
      if (favorites !== null) {
        this.setState({
          favoriteVtubers: favorites
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  //TODO
  //stop the infinite loops
  filterVtuberList=(filterObj)=>{
    try {

      if(filterObj.length>0){
        let tempArr = filter.filterArray(this.state.vtubers,filterObj);

        if(tempArr.length!==0){
          this.setState({
            currentlyShownVtubers:tempArr
          });
        }
      }else{
        this.setState({
          currentlyShownVtubers:this.state.vtubers
        });
      }

      
    } catch (error) {
      console.log(error);
    }
  }

  showView = (currentView) => {
    let viewToReturn = <div></div>;
    try {
      switch (currentView) {
        case "home":
          viewToReturn = <div className="divContentBoxForFlex"><VtuberList vtuberDataProp={this.state.currentlyShownVtubers}
            favoriteVtuberProp={this.favoriteVtuber}
            favoritesListProp={this.state.favoriteVtubers}
            filterVtuberProp={this.filterVtuberList} /></div>;
          break;
        case "random":
          viewToReturn = <div className="divContentBoxForFlex"><RandomView vtuberDataProp={this.state.vtubers}
            favoriteVtuberProp={this.favoriteVtuber}
            favoritesListProp={this.state.favoriteVtubers} /></div>;
          break;
        case "currentlyLive":
          viewToReturn = <div className="divContentBoxForFlex"><LiveStreamsView favoritesListProp={this.state.favoriteVtubers} /></div>;
          break;
        case "favorites":
          viewToReturn = <div className="divContentBoxForFlex"><FavoritesView favoriteVtuberProp={this.favoriteVtuber}
            vtuberDataProp={this.state.vtubers}
            favoritesListProp={this.state.favoriteVtubers} /></div>;
          break;
        // case "about":
        //   viewToReturn = <div className="divContentBoxForFlex"><AboutView /></div>;
        //   break;
        default:
          viewToReturn = <div className="divContentBoxForFlex"><VtuberList vtuberDataProp={this.state.vtubers}
            favoriteVtuberProp={this.favoriteVtuber} /></div>;
          break;
      }
    } catch (error) {
      console.log(error);
    }

    return viewToReturn;
  }

  render() {
    const { currentView } = this.state;
    return (
      <div id="pageContainer">
        <header className="headerMain">
          <Header />
        </header>
        <div className="divPageContent">
          <div className="navbarContainer">
            <Nav selectViewProp={this.selectView} selectLangProp={this.selectLanguage}/>
          </div>
          {this.showView(currentView)}
        </div>
        <footer className="footerMain">
          <Footer />
        </footer>
      </div>
    );
  }
}