

class Scraper {

    constructor(method, collectionType) {

        this.method = method;
        this.collectionType = collectionType;
    }

    async createURLandFetchPage(method, collectionType) {

        const url = "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/" + collectionType + "/" + method;

        try {
            const response = await fetch(url);
            const webtext = await response.text();
            //console.log(webtext);
    
/*             for (obj of data.value) {
                str = `${obj.Perioden} - ${obj.TotaleBevolking_1}`;
                (console.log(str));
                addRowToTable(obj,tableForContent);            
            }        
            console.log(data.value[0]);
            destructureJSON(data); */
        } catch(err) {
            console.error(err);
        }

    return(webtext);
    }








}