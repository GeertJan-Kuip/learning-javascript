// handy for generateArguments functions
function getRandomInteger(min, max) { // min is included, max is not
    return (Math.floor(Math.random() * (max - min) + min));
}

function getRandomTrueFalse() {
    return( Math.random() < 0.5 );
}

