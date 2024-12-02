const SAMPLE_COLLECTION = [1,2,3,4,5];





// handy for generateArguments functions
function getRandomInteger(min, max) { // min is included, max is not
        return Math.floor(Math.random() * (max - min) + min);
    }


class Formula {

    constructor(collectionType, methodName, startArrayMapOrObject = [1,2,3,4,5]) {

        this.collectionType = collectionType;
        this.methodName = methodName;
        this.startArrayMapOrObject = startArrayMapOrObject;
    }

    // here the calculation is done, the method (concat, unshift or whatever) is applied to samplecollection. Returnvalues + the 
    // (un)altered array that was the starting point is returned. 
    applyMethod(methodName, sampleCollection, argumentList) {
    
        let retVal;

        //problem: because 'sampleCollection' changes because of methods that alter the array input, the return value doesn't work.
        // try to declare a global thing
    
        (methodName == 'length') ? retVal = sampleCollection[methodName] : retVal = sampleCollection[methodName](...argumentList);
    
        console.log(methodName.toUpperCase());
        console.log(`returnvalue = ${retVal}`);
        console.log(`collection = ${SAMPLE_COLLECTION}`);
    
        return [retVal, sampleCollection, argumentList];
    
    }

    createTextStringElements(collectionType, methodName, startArrayMapOrObject, retValAndAlteredStartCollection) {

        let retVal = retValAndAlteredStartCollection[0];
        let alterCollection = retValAndAlteredStartCollection[1];
        let argumentArray = retValAndAlteredStartCollection[2];
        
        let startElement = ('[' + startArrayMapOrObject.toString() + ']').replaceAll(', ', ',');
        let methodIncludingArguments = methodName + '(' + argumentArray.toString() + ')';
        let returnValue = Array.isArray(retVal) ? (('[' + retVal.toString() + ']').replaceAll(', ', ',')) : String(retVal);
        let alteredSTartElement = ('[' + alterCollection.toString() + ']').replaceAll(', ', ',');

        return([startElement, methodIncludingArguments, returnValue, alteredSTartElement, collectionType]);
    }


    formatString(arrayStringElements) {

        let a = arrayStringElements;

        let startArrAsString = '[' + String(SAMPLE_COLLECTION) + ']';

        let lastLine = a[3]==startArrAsString ? ("The original " + collectionType.toLowerCase() + " remains intact.") : ("The original " +  collectionType.toLowerCase() + " is modified to " + a[3] + ".");


        let formattedSTring = `${startArrAsString}.${a[1]} = ${a[2]}<br/>${lastLine}`;

        return formattedSTring;
    }


    publishString(formattedSTring) {

        document.getElementById("formulaField").innerHTML = formattedSTring;
    }




    // Arrays only - long function body, for every method I need to write a custom algorithm that calculates adequate arguments
    generateArgumentsForArrayType(methodName, sampleCollection) {

        let retVal = [];

        const sampleLength = sampleCollection.length;

        const functionsWithZeroArguments = ["entries", "keys", "length", "pop", "reverse", "shift", "toReversed", "toString", "values"];


        if (functionsWithZeroArguments.includes(methodName)) {
            retVal = ['fiets'];
            console.log("hebbes");
            console.log(`The returned argument is ${retVal}`);
            return(retVal);
            }


        switch(methodName) {

            case "at":            
                const index = Math.floor(getRandomInteger(-sampleLength, sampleLength)); 
                retVal.push([index]);
                break;

            case "concat":
                let retArray = [];
                const retArraySize = getRandomInteger(2,5);
                let i=0;
                while (i<retArraySize) {
                    retArray.push(getRandomInteger(-10,20));
                    i++;
                }
                retVal.push(retArray);
                break;

            case "copyWithin":
                let a = getRandomInteger(0,sampleLength);
                let b = getRandomInteger(0,sampleLength-1);
                while (b==a) b = getRandomInteger(0,sampleLength-1)
                let c = getRandomInteger(b+1,sampleLength);

                retVal = [a,b,c]
                break;

            case "every":
                // asks voor a function (return true or false) as parameter
                break;           

            case "push":
                
                retVal.push([getRandomInteger(-10,20)]);                
                break;

        }


    return retVal;

    }



    runAll(type, method, startArray = [1,2,3,4,5]) {



        let argumentArray = this.generateArgumentsForArrayType(method,startArray);
        let outcome = this.applyMethod(method, startArray, argumentArray);
        let stringOutcome = this.createTextStringElements(type, method, SAMPLE_COLLECTION,outcome);
        let stringFormatted = this.formatString(stringOutcome, type);
        this.publishString(stringFormatted);
    }

}




