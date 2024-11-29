

// solve: object methods like assign, entries etc don't work. Function works for arrays and objects.
// is it lack of enumerability? Or iterability?

function getAllPropertyAndMethodNames(mapOrArray) {

    let PropertyAndMethodNames = [];
  
    do {
      Object.getOwnPropertyNames(mapOrArray).forEach(function (prop) {
        if (PropertyAndMethodNames.indexOf(prop) === -1) {
            PropertyAndMethodNames.push(prop);
        }
      });
  
      mapOrArray = Object.getPrototypeOf(mapOrArray);
    } while (mapOrArray);
  
    return PropertyAndMethodNames;
  }





 