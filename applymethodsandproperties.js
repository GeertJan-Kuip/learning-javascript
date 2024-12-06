// handy for generateArguments functions
function getRandomInteger(min, max) { // min is included, max is not
    return (Math.floor(Math.random() * (max - min) + min));
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

        // sampleCollection heeft de vorm [immutable, mutable(copy of immutable)]

        let retVal;
    
        (methodName == 'length') ? retVal = sampleCollection[1][methodName] : retVal = sampleCollection[1][methodName](...argumentList);
    
        return [retVal, sampleCollection[1], argumentList];    
    }

    createTextStringElements(collectionType, methodName, theStartCollection, retValAndAlteredStartCollection) {

        let retVal = retValAndAlteredStartCollection[0];
        let alterCollection = retValAndAlteredStartCollection[1];
        let argumentArray = retValAndAlteredStartCollection[2];

        // applying 'toString' on nested array flattens it. Need function to create string-representation of nested array
        
        //let startElement = (theStartCollection[0].toString()).replaceAll(', ', ',');

        let startElement = (JSON.stringify(theStartCollection[0])).replaceAll(', ', ',');

        let methodIncludingArguments = methodName + '(' + argumentArray.toString() + ')';
        let returnValue  = Array.isArray(retVal) ? ((JSON.stringify(retVal)).replaceAll(', ', ',')) : String(retVal);
        if (['join', 'toString'].includes(methodName)) returnValue = ('"'+returnValue+'"');
        let alteredSTartElement = (JSON.stringify(alterCollection)).replaceAll(', ', ',');

        return([startElement, methodIncludingArguments, returnValue, alteredSTartElement, collectionType]);
    }


    formatString(arrayStringElements) {

        let a = arrayStringElements;



        let startArrAsString = String(a[0]);

        let lastLine = a[3]==startArrAsString ? ("The original " + arrayStringElements[4].toLowerCase() + " remains intact.") : ("The original " +  arrayStringElements[4].toLowerCase() + " is modified to " + a[3] + ".");


        let formattedSTring = `${startArrAsString}.${a[1]} = ${a[2]}<br/>${lastLine}`;

        return formattedSTring;
    }


    publishString(formattedSTring) {

        document.getElementById("formulaField").innerHTML = formattedSTring;
    }




    // Arrays only - long function body, for every method I need to write a custom algorithm that calculates adequate arguments
    generateArgumentsForArrayType(methodName, sampleCollection, numberOrString) {

        //the switch statement is long and has one namespace, therefore I declare its variables beforehand
        let retVal = [];
        let retFunction;
        let a,b,c;
        let counter;
        let sampleLength = sampleCollection[0].length;

        let arrayFunctions_01a = [(c => c>6), (c => c<=5), (c => c>0), (c => (c % 2 == 0)), (c => c==3), (c => typeof c=='number')];
        let arrayFunctions_01b = [(c => c>4), (c => c<=1), (c => (c % 2 == 1)), (c => (c^2 >= 1)), (c => c==0), (c => typeof c=='string')];
        let arrayFunctions_01 = arrayFunctions_01a.concat(arrayFunctions_01b);
        let arrayFunctions_02 = [(c => console.log(c + 'is a number')), (element => console.log(String(element)))];
        let arrayFunctions_03 = [(c => c*2), (c => c%3==2), (c => c%2), (c => -c), (c => (Math.sqrt(c)).toFixed(2)), (c => Math.pow(c,2))];
        let arrayFunctions_04 = [((accumulator, p) => accumulator + p),((total, z) => total * z),((nOdd, z) => nOdd + z%2) ];
        let arrayFunctions_05 = [(((a,b) => b-a)), ((a,b) => (b%2) - 1), ((a,b) => a*b-7)];
        let arrayFunctions_06 = [((num) => (num === 2 ? [2, 2] : num*num)),((r) => (r < 4 ? [r+3, 2] : 0)),((s) => (s % 2 == 0 ? [0,0,0] : s))];
           
        let arraySeparators = ["", "..", " : ", "--", "-", ";", "_", ".", "###"];

        const functionsWithZeroArguments = ["entries", "keys", "length", "pop", "reverse", "shift", "toReversed", "toString", "values"];


        if (functionsWithZeroArguments.includes(methodName)) {

            return(retVal);
            }


        switch(methodName) {

            case "at":            
                const index = Math.floor(getRandomInteger(-sampleLength, sampleLength + 2)); 
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
                a = getRandomInteger(0,sampleLength);
                b = getRandomInteger(0,sampleLength-1);
                while (b==a) b = getRandomInteger(0,sampleLength-1);
                c = getRandomInteger(b+1,sampleLength);

                retVal = [a,b,c];
                break;

            case "every":                
                retFunction = arrayFunctions_01[getRandomInteger(0,arrayFunctions_01.length)];
                retVal.push(retFunction);
                break;   

            case "fill":
                a  = getRandomInteger(0,sampleLength); // value that will replace other values
                b = getRandomInteger(0,sampleLength-1);
                c = getRandomInteger(b+1,sampleLength);

                retVal = [a,b,c];
                break;  

            case "filter":
                retFunction = arrayFunctions_01[getRandomInteger(0,arrayFunctions_01.length)];
                retVal.push(retFunction);
                break; 

            case "find":
                retFunction = arrayFunctions_01[getRandomInteger(0,arrayFunctions_01.length)];
                retVal.push(retFunction);
                break;
                
            case "findIndex":
                retFunction = arrayFunctions_01[getRandomInteger(0,arrayFunctions_01.length)];
                retVal.push(retFunction);
                break;
                
            case "findLast":
                retFunction = arrayFunctions_01[getRandomInteger(0,arrayFunctions_01.length)];
                retVal.push(retFunction);
                break;

            case "findLastIndex":
                retFunction = arrayFunctions_01[getRandomInteger(0,arrayFunctions_01.length)];
                retVal.push(retFunction);
                break;

            case "flat":
                retVal.push(getRandomInteger(0,2));
                break;


            case "flatMap":
                retFunction = arrayFunctions_06[getRandomInteger(0,arrayFunctions_06.length)];
                retVal.push(retFunction);
                break;

            case "forEach":
                retFunction = arrayFunctions_02[getRandomInteger(0,arrayFunctions_02.length)];
                retVal.push(retFunction);
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
               
            case "join":    
                retFunction = arraySeparators[getRandomInteger(0,arraySeparators.length)];
                retVal.push(retFunction);
                break;

            case "lastIndexOf":
                retVal.push(getRandomInteger(0,9));
                break;

            case "map":
                retFunction = arrayFunctions_03[getRandomInteger(0,arrayFunctions_03.length)];
                retVal.push(retFunction);
                break;

            case "push":
                a = getRandomInteger(1,4);
                counter=0;
                while (counter<a) {
                    retVal.push(getRandomInteger(1,20));   
                    counter++;      
                }       
                break;

            case "reduce":
                retFunction = arrayFunctions_04[getRandomInteger(0,arrayFunctions_04.length)];
                retVal.push(retFunction);
                break;

            case "reduceRight":
                retFunction = arrayFunctions_04[getRandomInteger(0,arrayFunctions_04.length)];
                retVal.push(retFunction);
                break;

            case "slice":
                a = getRandomInteger(-sampleLength+1,sampleLength-1);
                b = a<0 ? getRandomInteger(a+1, 0) : getRandomInteger(a+1,sampleLength);
                retVal = [a,b];
                break;

            case "some":
                retFunction = arrayFunctions_01[getRandomInteger(0,arrayFunctions_01.length)];
                retVal.push(retFunction);
                break;

            case "sort":
                retFunction = arrayFunctions_05[getRandomInteger(0,arrayFunctions_05.length)];
                retVal.push(retFunction);
                break;

            case "splice":
                // items are deleted between place arg 1 and place arg 2, arg 3 comes in their place
                a = getRandomInteger(0, sampleLength-1);
                b = getRandomInteger(a+1, sampleLength);
                c = getRandomInteger(11,30);
                retVal.push(a,b,c);
                break;

            case "toLocaleString":
                // difficult
                break;

            case "toSorted":
                retFunction = arrayFunctions_05[getRandomInteger(0,arrayFunctions_05.length)];
                retVal.push(retFunction);
                break;

            case "toSpliced":
                // items are deleted between place arg 1 and place arg 2, arg 3 comes in their place
                a = getRandomInteger(0, sampleLength-1);
                b = getRandomInteger(a+1, sampleLength);
                c = getRandomInteger(11,30);
                retVal.push(a,b,c);
                break;

            case "unshift":
                a = getRandomInteger(1,4);
                counter=0;
                while (counter<a) {
                    retVal.push(getRandomInteger(11,30));   
                    counter++;      
                }     
                break;

            case "valueOf":
                // gaat over type conversion, zit dieper, niet nodig
                break;

            case "with":
                a = getRandomInteger(0, sampleLength);
                b = getRandomInteger(20,40);
                retVal.push(a,b);
                break;
            
        }

    return retVal;

    }

    chooseStartCollection(collectionType, method, numberOrString) {

        const START_ARRAY_NUMBER =  [1,2,3,4,5];   //
        const START_ARRAY_NUMBER_NESTED = [[1,2,3,[4,5]], [1,[2,3],4,5], [1,[2,[3,4]],5], [[1,2],[3,4],[[5]]]];
        const START_ARRAY_STRING = ["horse", "car", "bike", "lorry", "truck"];
        const START_ARRAY_STRING_NESTED = [["horse","car","bike",["lorry","truck"]],["horse",["car", "bike"],"lorry","truck"],[["horse",["car", "bike","lorry"]],"truck"] ];     

        let retVal = []; // idea: let retVal contain both an immutable and a mutable variant of the collection. Immutable to be used in string generation for result.

        if ((collectionType == 'Array') && (numberOrString == 'number')) {

            let whichNested = getRandomInteger(0,4);

            ['flat'].includes(method) ? retVal.push(START_ARRAY_NUMBER_NESTED[whichNested], [...START_ARRAY_NUMBER_NESTED[whichNested]]) : retVal.push(START_ARRAY_NUMBER, [...START_ARRAY_NUMBER]);

        }
        if ((collectionType == 'Array') && (numberOrString == 'string')) {

            ['flat'].includes(method) ? retVal.push(START_ARRAY_STRING_NESTED[whichNested], [...START_ARRAY_STRING_NESTED[whichNested]]) : retVal.push(START_ARRAY_STRING, [...START_ARRAY_STRING]);
 
        }



        return(retVal);

    }



    runAll(collectionType, method, numberOrString = 'number') {

        let theStartCollection = this.chooseStartCollection(collectionType, method, numberOrString);

        let argumentArray = this.generateArgumentsForArrayType(method, theStartCollection);
        let outcome = this.applyMethod(method, theStartCollection, argumentArray);
        let stringOutcome = this.createTextStringElements(collectionType, method, theStartCollection, outcome);
        let stringFormatted = this.formatString(stringOutcome, collectionType);
        this.publishString(stringFormatted);
    }

}




