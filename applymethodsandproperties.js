

function applyMethod(methodName, sampleCollection, argumentList) {

    let retVal;

    (methodName == 'length') ? retVal = sampleCollection[methodName] : retVal = sampleCollection[methodName](...argumentList);

    console.log(methodName.toUpperCase());
    console.log(`returnvalue = ${retVal}`);
    console.log(`collection = ${sampleCollection}`);

    return [retVal,sampleCollection];

}

function getRandomInteger(min, max) { // min is included, max is not
    return Math.floor(Math.random() * (max - min) + min);
}





applyMethod('push', [1,2,3,4,5], [20,23,'paard']);

applyMethod('pop', [1,2,3,4,5], []);

applyMethod('length', [1,2,3,4,5], []);


function generateArguments(methodName, sampleCollection) {

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
            numberArguments = 1;
            retVal.push([getRandomInteger(-10,20), 3]);                
            break;






    }

console.log(`The returned argument is ${retVal}`);



}

generateArguments('copyWithin', [1,2,3]);

