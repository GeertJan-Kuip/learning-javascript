const START_ARRAY = ["horse", "car", "bike", "lorry", "truck"]; //[1,2,3,4,5];




// handy for generateArguments functions
function getRandomInteger(min, max) { // min is included, max is not
        return Math.floor(Math.random() * (max - min) + min);
    }

function getRandomTrueFalse() {
    return( Math.random() < 0.5 );
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

        let copySampleCollection = [...sampleCollection];

        //problem: because 'sampleCollection' changes because of methods that alter the array input, the return value doesn't work.
        // try to declare a global thing
    
        (methodName == 'length') ? retVal = copySampleCollection[methodName] : retVal = copySampleCollection[methodName](...argumentList);
    



/*         console.log(methodName.toUpperCase());
        console.log(`returnvalue = ${retVal}`);
        console.log(`collection = ${sampleCollection}`); */

        console.log(typeof argumentList[0]);


    
        return [retVal, copySampleCollection, argumentList];
    
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

        let startArrAsString = '[' + String(START_ARRAY) + ']';

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

        const functionsWithZeroArguments = ["entries", "join", "keys", "length", "pop", "reverse", "shift", "toReversed", "toString", "values"];


        if (functionsWithZeroArguments.includes(methodName)) {

            return(retVal);
            }


        switch(methodName) {

            case "at":            
                const index = Math.floor(getRandomInteger(-sampleLength, sampleLength)); 
                retVal.push(index);
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
                while (b==a) b = getRandomInteger(0,sampleLength-1);
                let c = getRandomInteger(b+1,sampleLength);

                retVal = [a,b,c];
                break;

            case "every":
                let retFunction = getRandomTrueFalse() ? ((c => c>6)) : ((c => c<6))
                retVal.push(retFunction);
                break;   

            case "fill":
                let d = getRandomInteger(0,sampleLength); // value that will replace other values
                let e = getRandomInteger(0,sampleLength-1);
                let f = getRandomInteger(e+1,sampleLength);

                retVal = [d,e,f];
                break;  

            case "filter":
                let retFunction2 = getRandomTrueFalse() ? ((c => c>2)) : ((c => c<3));
                retVal.push(retFunction2);
                break; 

            case "find":
                retVal.push(getRandomTrueFalse() ? ((c => c>2)) : ((c => c<3)));
                break;
                
            case "findIndex":
                retVal.push(getRandomTrueFalse() ? ((c => c>2)) : ((c => c<3)));
                break;
                
            case "findLast":
                retVal.push(getRandomTrueFalse() ? ((c => c>2)) : ((c => c<3)));
                break;

            case "findLastIndex":
                retVal.push(getRandomTrueFalse() ? ((c => c>2)) : ((c => c<3)));
                break;

            case "flat":
                // requires modification of START_ARRAY, it needs nested arrays
                break;

            case "flatMap":
                // slightly more complicated 
                break;

            case "forEach":
                retVal.push(getRandomTrueFalse() ? ((c => c+1)) : ((c => c*2)));
                break;

            case "hasOwnProperty":
                // naar kijken
                break;

            case "includes":
                retVal.push(getRandomInteger(0,11));
                break;

            case "indexOf":
                retVal.push(getRandomInteger(0,9));
                break;

            case "isPrototypeOf":
                retVal.push('object');
                break;

            case "lastIndexOf":
                retVal.push(getRandomInteger(0,9));
                break;

            case "map":
                retVal.push(c => c*2);
                break;

            case "push":
                let randomNumber = getRandomInteger(1,4);
                let counter=1;
                while (counter<randomNumber) {
                    retVal.push(getRandomInteger(1,20));   
                    counter++;      
                }       
                break;

            case "reduce":
                retVal.push((accumulator, p) => accumulator + p);
                break;

            case "reduceRight":
                retVal.push((accumulator, p) => accumulator - p);
                break;

            case "slice":
                let g = getRandomInteger(-sampleLength+1,sampleLength-1);
                let h = g<0 ? getRandomInteger(g+1, 0) : getRandomInteger(g+1,sampleLength);
                retVal = [g,h];
                break;

            case "some":
                // make sure that the getRandomInteger is kept out of the published string
                // this actually works, sending a function with a function nested within
                retVal.push((element) => element * 2 === getRandomInteger(0,11));
                break;

            case "sort":
                // interesting with sort function between parentheses
                retVal.push(((a,b) => b-a));
                break;

            case "splice":
                // items are deleted between place arg 1 and place arg 2, arg 3 comes in their place
                let j = getRandomInteger(0, sampleLength-1);
                let k = getRandomInteger(j+1, sampleLength);
                let l = getRandomInteger(11,30);
                retVal.push(j,k,l);
                break;

            case "toLocaleString":
                // difficult
                break;

            case "toSorted":
                retVal.push(((a,b) => b-a));
                break;

            case "toSpliced":
                // items are deleted between place arg 1 and place arg 2, arg 3 comes in their place
                let m = getRandomInteger(0, sampleLength-1);
                let n = getRandomInteger(m+1, sampleLength);
                let o = getRandomInteger(11,30);
                retVal.push(m,n,o);
                break;

            case "unshift":
                let randomNumber2 = getRandomInteger(1,4);
                let counter2=0;
                while (counter2<randomNumber2) {
                    retVal.push(getRandomInteger(11,30));   
                    counter2++;      
                }     
                break;

            case "valueOf":
                // gaat over type conversion, zit dieper, niet nodig
                break;

            case "with":
                let p = getRandomInteger(0, sampleLength);
                let q = getRandomInteger(20,40);
                retVal.push(p,q);
                break;
            





        }


    return retVal;

    }



    runAll(type, method, startArray) {

        let argumentArray = this.generateArgumentsForArrayType(method,startArray);
        let outcome = this.applyMethod(method, startArray, argumentArray);
        let stringOutcome = this.createTextStringElements(type, method, START_ARRAY, outcome);
        let stringFormatted = this.formatString(stringOutcome, type);
        this.publishString(stringFormatted);
    }

}




