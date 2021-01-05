import React from "react";
import "./FilterBox.css";

//name, group, subCount, videoCount



export default class FilterBox extends React.Component {
    constructor() {
        super();
        this.state = {
            amOpen: false,
            filters: [],
            closedFilters: []
        }


    }

    noNumbersRegex = /(\D)/;

    componentDidUpdate = (prevProps, prevState) => {
        try {
            if (prevState.filters !== this.state.filters) {
                console.log(this.state.filters);
                this.props.filterProp(this.state.filters);
            }
        } catch (error) {
            console.log(error);
        }
    }

    openCloseFilter = () => {
        this.setState({
            amOpen: !this.state.amOpen
        });
    }


    addFilter = () => {
        try {

            let newFilters = this.state.filters;
            if (newFilters.length < 4) {
                newFilters.push({ filterType: "name", value: "", comparisonOp: "", id: Math.floor((Math.random() * 1009)) });
            };

            this.setState({
                filters: newFilters
            }, () => {
                console.log(this.state.filters);
                this.props.filterProp(this.state.filters);
            });
        } catch (error) {
            console.log(error);
        }
    }

    removeFilter = (filterToRemove) => {
        try {
            console.log(filterToRemove);
            let newFilters = this.state.filters;
            for (let i = 0; i < newFilters.length; i++) {
                if (newFilters[i].id === filterToRemove) {
                    newFilters.splice(i, 1);

                }
            };
            this.setState({
                filters: newFilters
            }, () => {
                console.log(this.state.filters);
                this.props.filterProp(this.state.filters);
            });

        } catch (error) {
            console.log(error);
        }
    }

    changeFilter = (e, id) => {
        try {
            let filters = this.state.filters;
            for (let i = 0; i < filters.length; i++) {
                if (filters[i].id === id) {
                    filters[i].filterType = e.target.value;
                    if (filters[i].filterType !== "subCount" && filters[i].filterType !== "videoCount") {
                        filters[i].comparisonOp = "";
                    };
                    break;
                }
            };

            this.setState({
                filters: filters
            }, () => {
                console.log(this.state.filters);
                this.props.filterProp(this.state.filters);
            });
        } catch (error) {
            console.log(error);
        }
    }

    //TODO
    //invalidate
    changeFilterValue = (e = "", id, comparisonOp = "") => {
        try {

            let filters = this.state.filters;
            let f = filters.indexOf(filters.find(f => f.id === id));

            if (comparisonOp !== "") {

                filters[f].comparisonOp = comparisonOp;
            } else {
                filters[f].value = e;
            }

            this.setState({
                filters: filters
            }, () => {
                console.log(this.state.filters);
                this.props.filterProp(this.state.filters);
            });

        } catch (error) {
            console.log(error);
        }
    }

    changeFilterVisual = (filter) => {
        let inputToReturn = <input className="inputFilterValue"
            onChange={(e) => this.changeFilterValue(e.target.value, filter.id)}>
        </input>;
        try {
            switch (filter.filterType) {
                case "name":
                    inputToReturn = <input className="inputFilterValue"
                        onChange={(e) => this.changeFilterValue(e.target.value, filter.id)}>
                    </input>;
                    break;
                case "group":
                    inputToReturn = <select name="groupFilterOptions"
                        className="inputFilterValue"
                        defaultValue=""
                        onChange={(e) => this.changeFilterValue(e.target.value, filter.id)}>
                        <option value=""></option>
                        <option value="hololive">Hololive</option>
                        <option value="nijisanji">Nijisanji</option>
                        <option value="other">Other</option>
                        <option value="independent">Independent</option>
                    </select>
                    break;
                case "subCount":
                case "videoCount":
                    inputToReturn = <div className="divComparisonInput" >
                        <select defaultValue=""
                            className="inputComparisonOperator"
                            onChange={(e) => this.changeFilterValue("", filter.id, e.target.value)}>
                            <option value=""></option>
                            <option value="<">{"<"}</option>
                            <option value=">">{">"}</option></select>
                        <input type="number"
                            className="inputFilterValue"
                            pattern="\d"
                            title="Only digits"
                            onChange={(e) => this.changeFilterValue(e.target.value, filter.id)}>
                        </input>
                    </div>;
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.log(error);
        }
        return inputToReturn;
    }

    showFilters = (filters) => {
        let filterBoxes = <div></div>;
        try {
            if (filters.length !== 0) {
                filterBoxes = filters.map(filter => <div className="divFilterItem" key={filter.id}>
                    <label>Filter by:</label>
                    <select name="filterOptions" onChange={(e) => this.changeFilter(e, filter.id)}
                        className="selectFilterOptions"
                        defaultValue="name">
                        <option value="name" >Name</option>
                        <option value="group">Group</option>
                        <option value="subCount">Sub count</option>
                        <option value="videoCount">Video count</option>
                    </select>
                    {this.changeFilterVisual(filter)}
                    <button className="btnFilterButtons" onClick={() => { this.removeFilter(filter.id) }}>x</button>
                </div>)
            }
        } catch (error) {
            console.log(error);
        }
        return filterBoxes;
    }

    render() {
        return (
            <div className="divMainFilter">
                <button className={this.state.amOpen ?"invisible":"btnFilterOpenClose"} onClick={this.openCloseFilter}>Filter</button>
                <div className={this.state.amOpen ? "divFilterOpen" : "divFilterClosed"}>
                    <div className="divAddFilterHeader">
                        <label>Add filter</label>
                        <button className="btnFilterButtons" onClick={this.addFilter}>
                            +
                        </button>
                    </div>
                    {this.showFilters(this.state.filters)}
                    <div className="divAddFilterFooter">
                        <label>Close filterbox</label>
                        <button className="btnFilterButtons" onClick={this.openCloseFilter}>
                            x
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}