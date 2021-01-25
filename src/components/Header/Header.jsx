import React from "react";
import "./Header.css";
import masterPiece from "../../images/TuberHome2Improved.png";
import smolMasterPiece from "../../images/vtuberHomeSmol.png";

export default class Header extends React.Component {

    render() {
        return (<div>
            <header >
                <div className="divHeaderImg"><img src={masterPiece} id="imgMainHeaderImage"/>
                    <img src={smolMasterPiece} id="imgSmolHeaderImage"/>
                </div>
            </header>
        </div>)
    }
}