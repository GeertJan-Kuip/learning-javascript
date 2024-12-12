class Formula {

    constructor(method) {

        this.method = method;
        this.numberOrString = 0;
        this.sampleFixed = 0;
        this.sampleMutable = 0;
        this.nestedSample = 0;
        this.argumentList = 0;
        this.returnValue = 0;
        this.textStringElements = 0;
        this.formattedText = 0;
    }


    publishString() {

        document.getElementById("formulaField").innerHTML = this.formattedText;
    }

}