const filterByName = (array, filter) => {
    let filteredArray = [];
    try {
        filteredArray = array.filter(vtuber => vtuber.name.toLowerCase().includes(filter.value.toLowerCase()));

    } catch (error) {
        console.log(error);
    }
    if (filteredArray.length !== 0) {
        return filteredArray;
    }
    return array;

}

const filterByGroup = (array, filter) => {
    let filteredArray = [];
    try {
        if(filter.value === "other"){
        filteredArray = array.filter(vtuber => vtuber.group !== "nijisanji" &&
        vtuber.group !== "hololive" && 
        vtuber.group !== "independent");

        }else{
            filteredArray = array.filter(vtuber => vtuber.group === filter.value);
        }
    } catch (error) {
        console.log(error);
    }
    return filteredArray;
}


//TODO
//Add both of the lower filters
const filterByCount = (array, filter, type) => {
    console.log(filter);
    let filteredArray = array;
    try {
        if (filter.value === "" || filter.comparisonOp === "") return array;
        const intToParse = parseInt(filter.value);
        switch (type) {
            case "videos":
                if (filter.comparisonOp === ">") {
                    filteredArray = array.filter(vtuber => vtuber.videoCount >= intToParse);
                } else {
                    filteredArray = array.filter(vtuber => vtuber.videoCount <= intToParse);
                };
                break;
            case "subs":
                if (filter.comparisonOp === ">") {
                    filteredArray = array.filter(vtuber => vtuber.subscriberCount >= intToParse);
                } else {
                    filteredArray = array.filter(vtuber => vtuber.subscriberCount <= intToParse);
                };
                break;
            default:
                break;
        }
        console.log(filteredArray);

    } catch (error) {
        console.log(error);
    }
    return filteredArray;
}

const filterArray = (array, filters) => {
    try {
        if (filters.length > 0) {
            let newArray = array;
            for (let i = 0, fLen = filters.length; i < fLen; i++) {
                console.log(filters[i]);
                switch (filters[i].filterType) {
                    case "name":
                        newArray = filterByName(newArray, filters[i]);
                        break;
                    case "subCount":
                        newArray = filterByCount(newArray, filters[i], "subs");
                        break;
                    case "videoCount":
                        newArray = filterByCount(newArray, filters[i], "videos");
                        break;
                    case "group":
                        newArray = filterByGroup(newArray, filters[i]);
                        break;
                    default:
                        break;
                }
            }
            return newArray;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    filterArray
}