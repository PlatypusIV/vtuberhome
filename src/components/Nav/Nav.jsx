import React from "react";
import "./Nav.css";

export default class Nav extends React.Component {
    selectView = (e, view) => {
        try {
            this.props.selectViewProp(view);
        } catch (error) {
            console.log(error);
        }
    }

    selectLanguage = (e) => {
        try {

            console.log(e.target.value);
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (<nav className="navMainNavBar">
            <div className="divNavBtnContainer">
                <button className="btnWebsiteLinks" onClick={(e) => this.selectView(e, "home")}>Home</button>
                <button className="btnWebsiteLinks" onClick={(e) => this.selectView(e, "random")}>Random</button>
                {/* <button className="btnWebsiteLinks" onClick={(e) => this.selectView(e, "currentlyLive")}>Currently Live</button> */}
                <button className="btnWebsiteLinks" onClick={(e) => this.selectView(e, "favorites")}>Favorites</button>
                {/* <button className="btnWebsiteLinks" onClick={(e) => this.selectView(e, "rankings")}>Rankings</button> */}
                {/* <button className="btnWebsiteLinks" onClick={(e) => this.selectView(e, "memes")}>Memes</button> */}
                {/* <button className="btnWebsiteLinks" onClick={(e) => this.selectView(e, "about")}>About</button> */}
            </div>
        </nav>)
    }
}