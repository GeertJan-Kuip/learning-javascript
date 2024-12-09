const ARRAY_NUMBER =  [1,2,3,4,5];
const ARRAY_NUMBER_NESTED = [[1,2,3,[4,5]], [1,[2,3],4,5], [1,[2,[3,4]],5], [[1,2],[3,4],[[5]]], [[[1,2],[3,4]],[[5]]]];
const ARRAY_STRING = ["horse", "car", "bike", "lorry", "truck"];
const ARRAY_STRING_NESTEDa = [["horse","car","bike",["lorry","truck"]],["horse",["car", "bike"],"lorry","truck"],[["horse",["car", "bike","lorry"]],"truck"] ];     
const ARRAY_STRING_NESTEDb = [[["horse"],"car",["bike",["lorry","truck"]]],["horse",["car", "bike"],[["lorry"],"truck"]],[["horse",["car", "bike","lorry"]],"truck"] ];     
const ARRAY_STRING_NESTED = ARRAY_STRING_NESTEDa.concat(ARRAY_STRING_NESTEDb);

const ARRAYFUNCTIONS_01a = [(c => c>6), (c => c<=5), (c => c>0), (c => (c % 2 == 0)), (c => c==3), (c => typeof c=='number')];
const ARRAYFUNCTIONS_01b = [(c => c>4), (c => c<=1), (c => (c % 2 == 1)), (c => (c^2 >= 1)), (c => c==0), (c => typeof c=='string')];
const ARRAYFUNCTIONS_01 = ARRAYFUNCTIONS_01a.concat(ARRAYFUNCTIONS_01b);
const ARRAYFUNCTIONS_02 = [(c => console.log(c + 'is a number')), (element => console.log(String(element)))];
const ARRAYFUNCTIONS_03 = [(c => c*2), (c => c%3==2), (c => c%2), (c => -c), (c => (Math.sqrt(c)).toFixed(2)), (c => Math.pow(c,2))];
const ARRAYFUNCTIONS_04 = [((accumulator, p) => accumulator + p),((total, z) => total * z),((nOdd, z) => nOdd + z%2) ];
const ARRAYFUNCTIONS_05 = [(((a,b) => b-a)), ((a,b) => (b%2) - 1), ((a,b) => a*b-7)];
const ARRAYFUNCTIONS_06 = [((num) => (num === 2 ? [2, 2] : num*num)),((r) => (r < 4 ? [r+3, 2] : 0)),((s) => (s % 2 == 0 ? [0,0,0] : s))];
   
const ARRAYSEPARATORS = ["", "..", " : ", "--", "-", ";", "_", ".", "###"];

const METHODSWITHZEROARGUMENTS = ["entries", "keys", "length", "pop", "reverse", "shift", "toReversed", "toString", "values"];