class FormulaArray extends Formula {

    constructor(method) {
        super(method);
        

    }

    // apply array method and set this.returnvalue
    applyMethod() {

        (this.method == 'length') ? this.returnValue = this.sampleMutable[this.method] : this.returnValue = this.sampleMutable[this.method](...this.argumentList);
 
    }

    // create substrings
    createTextStringElements() {

        let startElement = (JSON.stringify(this.sampleFixed)).replaceAll(', ', ',');

        let methodIncludingArguments = this.method + '(' + this.argumentList.toString() + ')';
        let returnValue  = Array.isArray(this.returnValue) ? ((JSON.stringify(this.returnValue)).replaceAll(', ', ',')) : String(this.returnValue);
        if (['join', 'toString'].includes(this.method)) returnValue = ('"'+returnValue+'"');
        let alteredSTartElement = (JSON.stringify(this.sampleMutable)).replaceAll(', ', ',');

        this.textStringElements = [startElement, methodIncludingArguments, returnValue, alteredSTartElement];
    }

    // piece strings together
    formatString() {

        let startArrAsString = this.textStringElements[0];

        let firstLine = this.textStringElements[0] + '.' + this.textStringElements[1] + ' = ' + this.textStringElements[2];

        let lastLine = this.textStringElements[3]==startArrAsString ? ("The original array remains intact.") : ("The original array is modified to " + this.textStringElements[3] + ".");

        //this.formattedText = `${startArrAsString}.${this.textStringElements[1]} = ${this.textStringElements[2]}<br/>${lastLine}`;

        this.formattedText = `${firstLine}<br/>${lastLine}`;


    }


    // generate random arguments for methods. long function body, for every method I need to write a custom algorithm that calculates adequate arguments
    generateArguments() {

        // as switch statement is long and has one namespace, I declare some variables beforehand
        let retVal = [];
        let retFunction;
        let a,b,c;
        let counter;
        let sampleLength = this.sampleFixed.length;

        if (METHODSWITHZEROARGUMENTS.includes(this.method)) {
            this.argumentList = retVal;
            return(retVal); // return value to break out of function if function requires 0 arguments
            }


        switch(this.method) {

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
                retFunction = ARRAYFUNCTIONS_01[getRandomInteger(0,ARRAYFUNCTIONS_01.length)];
                retVal.push(retFunction);
                break;   

            case "fill":
                a  = getRandomInteger(0,sampleLength); 
                b = getRandomInteger(0,sampleLength-1);
                c = getRandomInteger(b+1,sampleLength);

                retVal = [a,b,c];
                break;  

            case "filter":
                retFunction = ARRAYFUNCTIONS_01[getRandomInteger(0,ARRAYFUNCTIONS_01.length)];
                retVal.push(retFunction);
                break; 

            case "find":
                retFunction = ARRAYFUNCTIONS_01[getRandomInteger(0,ARRAYFUNCTIONS_01.length)];
                retVal.push(retFunction);
                break;
                
            case "findIndex":
                retFunction = ARRAYFUNCTIONS_01[getRandomInteger(0,ARRAYFUNCTIONS_01.length)];
                retVal.push(retFunction);
                break;
                
            case "findLast":
                retFunction = ARRAYFUNCTIONS_01[getRandomInteger(0,ARRAYFUNCTIONS_01.length)];
                retVal.push(retFunction);
                break;

            case "findLastIndex":
                retFunction = ARRAYFUNCTIONS_01[getRandomInteger(0,ARRAYFUNCTIONS_01.length)];
                retVal.push(retFunction);
                break;

            case "flat":
                retVal.push(getRandomInteger(1,2));
                break;

            case "flatMap":
                retFunction = ARRAYFUNCTIONS_06[getRandomInteger(0,ARRAYFUNCTIONS_06.length)];
                retVal.push(retFunction);
                break;

            case "forEach":
                retFunction = ARRAYFUNCTIONS_02[getRandomInteger(0,ARRAYFUNCTIONS_02.length)];
                retVal.push(retFunction);
                break;

            case "hasOwnProperty":
                // special one, needs own assesment
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
                retFunction = ARRAYSEPARATORS[getRandomInteger(0,ARRAYSEPARATORS.length)];
                retVal.push(retFunction);
                break;

            case "lastIndexOf":
                retVal.push(getRandomInteger(0,9));
                break;

            case "map":
                retFunction = ARRAYFUNCTIONS_03[getRandomInteger(0,ARRAYFUNCTIONS_03.length)];
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
                retFunction = ARRAYFUNCTIONS_04[getRandomInteger(0,ARRAYFUNCTIONS_04.length)];
                retVal.push(retFunction);
                break;

            case "reduceRight":
                retFunction = ARRAYFUNCTIONS_04[getRandomInteger(0,ARRAYFUNCTIONS_04.length)];
                retVal.push(retFunction);
                break;

            case "slice":
                a = getRandomInteger(-sampleLength+1,sampleLength-1);
                b = a<0 ? getRandomInteger(a+1, 0) : getRandomInteger(a+1,sampleLength);
                retVal = [a,b];
                break;

            case "some":
                retFunction = ARRAYFUNCTIONS_01[getRandomInteger(0,ARRAYFUNCTIONS_01.length)];
                retVal.push(retFunction);
                break;

            case "sort":
                retFunction = ARRAYFUNCTIONS_05[getRandomInteger(0,ARRAYFUNCTIONS_05.length)];
                retVal.push(retFunction);
                break;

            case "splice": // items are deleted between place arg 1 and place arg 2, arg 3 comes in their place
                a = getRandomInteger(0, sampleLength-1);
                b = getRandomInteger(a+1, sampleLength);
                c = getRandomInteger(11,30);
                retVal.push(a,b,c);
                break;

            case "toLocaleString":
                // skip this one, don't know the specifics of Date objects
                break;

            case "toSorted":
                retFunction = ARRAYFUNCTIONS_05[getRandomInteger(0,ARRAYFUNCTIONS_05.length)];
                retVal.push(retFunction);
                break;

            case "toSpliced":  // items are deleted between place arg 1 and place arg 2, arg 3 comes in their place
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

            case "valueOf": // deals with type conversion, seems to be non-essential
                break;

            case "with":
                a = getRandomInteger(0, sampleLength);
                b = getRandomInteger(20,40);
                retVal.push(a,b);
                break;            
        }
    
        this.argumentList = retVal;
    }

    chooseStartCollection( ) {

        let retVal = []; // idea: let retVal contain both an immutable and a mutable variant of the collection. Immutable to be used in string generation for result.
        this.numberOrString = Math.random()<1.1 ? 'number' : 'string';
        let whichNestedValue = getRandomInteger(0,4);

        if (this.numberOrString == 'number') {            

            ['flat'].includes(this.method) ? retVal.push(ARRAY_NUMBER_NESTED[whichNestedValue], [...ARRAY_NUMBER_NESTED[whichNestedValue]]) : retVal.push(ARRAY_NUMBER, [...ARRAY_NUMBER]);
        }
        if (this.numberOrString == 'string') {

            ['flat'].includes(this.method) ? retVal.push(ARRAY_STRING_NESTED[whichNestedValue], [...ARRAY_STRING_NESTED[whichNestedValue]]) : retVal.push(ARRAY_STRING, [...ARRAY_STRING]);
        }

        [this.sampleFixed, this.sampleMutable] = retVal;

    }

    runAll() {

        this.chooseStartCollection();
        this.generateArguments();
        this.applyMethod();
        this.createTextStringElements();
        this.formatString();
        this.publishString();
    }

}




