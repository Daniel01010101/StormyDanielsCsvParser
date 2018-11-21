let fs = require("fs");
let csvString = fs.readFileSync("D:/Workspaces/Statistics-MarketSize-Service/QA/market-sizes-data.csv", "utf8");

const csv = require('csvtojson')
csv({
    noheader:false,
    output: "json",
    
})
.fromString(csvString)
.then((csvRow)=>{ 
    let formatted = csvRow.map(x => {
        return {
            path: x.path,
            description: x.description,
            offset: Number(x.offset),
            limit: Number(x.limit),
            perCapitaId: Number(x.perCapitaId) != 1 ? x.perCapitaId : 1,
            growthType: x.growthType,
            categoryIds: toArray(x.categoryIds, true),
            industryCodes: toArray(x.industryCodes),
            geographyIds: toArray(x.geographyIds,true),
            dataTypeIds: toArray(x.dataTypeIds, true),
            exchangeRate: x.exchangeRate,
            unifiedCurrency: x.unifiedCurrency,
            localCurrency: truthy(x.localCurrency),
            inflationType: x.inflationType,
            statusCode: Number(x.statusCode),
            errorCode: x.errorCode,
            dataSliceId: Number(x.dataSliceId) != NaN && x.dataSliceId != "" ? Number(x.dataSliceId) : x.dataSliceId
        }
    });

    fs.writeFileSync("D:/Workspaces/Statistics-MarketSize-Service/QA/market-sizes-data.json", JSON.stringify(formatted));
});

function toArray(string, isNumber){
    if(string[0] != "["){
        
        let single;
        if(isNumber && string != ""){
            single = Number(string)==NaN ? string : Number(string);
        }
        else{
            single = string;
        }
        
        return [single];
    }

    let sliced = string.slice(1,string.length-1);
    let array = sliced.split(",");
    if(isNumber){
        return array.map(x => 
            x != "" && Number(x) != NaN ? Number(x) : x);
    }
    return array;
}

function truthy(bool){
     
     if(bool.toLowerCase() == "true"){
        return true;
     }
     if(bool.toLowerCase() == "false"){
        return false;
     }
     return bool;
}

