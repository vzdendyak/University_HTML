const Values = {
    LEG: 'leg',
    HYPOTENUSE: 'hypotenuse',
    ADJACENT_ANGLE: 'adjacent angle',
    OPPOSITE_ANGLE: 'opposite angle',
    ANGLE: 'angle'
};

const ValuesBit = {
    'leg': 1,
    'hypotenuse': 2,
    'adjacent angle': 4,
    'opposite angle': 8,
    'angle': 16
};

const getOppositeAngle = (leg, c) => Math.asin(leg / c) * 180 / Math.PI;

/**
 * Get bit value of entered type
 * @param val - type
 * @returns bit value
 */
function getValueBit(val) {
    const prop = Object.keys(ValuesBit).find(prop => {
        return prop === val;
    });
    return ValuesBit[prop];
}

function validateValues(val1, val2) {
    if (!val1) {
        console.log('Incorrect first value; Set default = 1')
        val1 = 1;
    }
    if (!val1) {
        console.log('Incorrect second value; Set default = 1')
        val2 = 1;
    }
}

function parseToParam(value, type) {
    return {
        value: value,
        type: type
    }
}

function logValues(a, b, c, alpha, beta) {
    console.log("a = " + a + "\nb = " + b + "\nc = " + c + "\nAlpha = " + alpha + "\nBeta = " + beta + "\n");
    document.getElementById('leg-a-span').innerText = `Leg a: ${a}`;
    document.getElementById('leg-b-span').innerText = `Leg b: ${b}`;
    document.getElementById('hypotenuse-span').innerText = `Hypotenuse: ${c}`;
    document.getElementById('adjacent-angle-span').innerText = `Alpha: ${alpha}`;
    document.getElementById('opposite-angle-span').innerText = `Beta: ${beta}`;
    console.log('Success')
}

function calculate() {
    const value1 = Number.parseFloat(document.getElementById('v1').value);
    const value2 = Number.parseFloat(document.getElementById('v2').value);
    const type1 = document.getElementById('t1').value;
    const type2 = document.getElementById('t2').value;

    triangle(value1, type1, value2, type2);
}

function triangle(val1, type1, val2, type2) {
    // Check if the values are not equal to 0
    validateValues(val1, val2);
    // create array of the objects with value and type properties
    const valuesArray = [parseToParam(val1, type1), parseToParam(val2, type2)];
    // get bit flag of the entered types
    let state = getValueBit(type1) | getValueBit(type2);

    // type 1 = leg, type 2 = leg
    if (state === (ValuesBit['leg'] | ValuesBit['leg'])) {
        calculateLegLeg(valuesArray[0].value, valuesArray[1].value);
    }
    // type 1 = leg, type 2 = hypotenuse
    else if (state === (ValuesBit['leg'] | ValuesBit['hypotenuse'])) {
        // get param with type leg
        let leg = valuesArray.find(value => value.type === Values.LEG).value;
        // get param with type hypotenuse
        let hypotenuse = valuesArray.find(value => value.type === Values.HYPOTENUSE).value;
        calculateLegHypotenuse(leg, hypotenuse);
    }
    // type 1 = leg, type 2 = adjacent angle
    else if (state === (ValuesBit['leg'] | ValuesBit['adjacent angle'])) {
        // get param with type leg
        let leg = valuesArray.find(value => value.type === Values.LEG).value;
        // get param with type adjacent angle
        let adjacent = valuesArray.find(value => value.type === Values.ADJACENT_ANGLE).value;
        calculateLegAdjacent(leg, adjacent);
    }
    // type 1 = leg, type 2 = opposite angle
    else if (state === (ValuesBit['leg'] | ValuesBit['opposite angle'])) {
        // get param with type adjacent angle
        let leg = valuesArray.find(value => value.type === Values.LEG).value;
        // get param with type opposite angle
        let opposite = valuesArray.find(value => value.type === Values.OPPOSITE_ANGLE).value;
        calculateLegOpposite(leg, opposite);
    }
    // type 1 = angle, type 2 = hypotenuse
    else if (state === (ValuesBit['angle'] | ValuesBit['hypotenuse'])) {
        // get param with type angle
        let hypotenuse = valuesArray.find(value => value.type === Values.HYPOTENUSE).value;
        // get param with type hypotenuse
        let angle = valuesArray.find(value => value.type === Values.ANGLE).value;
        calculateAngleHypotenuse(angle, hypotenuse);
    } else {
        console.log('Incorrect values or types. Please check it and try again.')
    }
}

function calculateLegLeg(param1, param2) {
    console.log(`leg ${param1} + leg ${param2}`)
    const a = param1;
    const b = param2;
    const c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    const alpha = getOppositeAngle(a, c);
    const beta = getOppositeAngle(b, c);
    logValues(a, b, c, alpha, beta)
}

function calculateLegHypotenuse(leg, hypotenuse) {
    console.log(`leg ${leg} + hypotenuse ${hypotenuse}`);
    if (leg > hypotenuse) {
        console.log('Leg can\'t be greater than hypotenuse');
        console.log('FAIL');
        return;
    }
    const a = leg;
    const c = hypotenuse;
    const b = Math.sqrt(Math.pow(c, 2) - Math.pow(a, 2));
    const alpha = getOppositeAngle(a, c);
    const beta = getOppositeAngle(b, c);
    logValues(a, b, c, alpha, beta)
}

function calculateLegAdjacent(leg, adjacent) {
    console.log(`leg ${leg} + adjacent ${adjacent}`)
    if (adjacent > 90) {
        console.log('Angle should be acute');
        console.log('FAIL');
        return;
    }
    const a = leg;
    const beta = adjacent;
    const c = a / Math.cos(beta * Math.PI / 180);
    const b = a * Math.tan(beta * Math.PI / 180);
    const alpha = getOppositeAngle(a, c);
    logValues(a, b, c, alpha, beta)
}

function calculateLegOpposite(leg, opposite) {
    console.log(`leg ${leg}  + opposite ${opposite}`)
    if (opposite > 90) {
        console.log('Angle should be acute');
        console.log('FAIL');
        return;
    }
    const a = leg;
    const alpha = opposite;
    const c = a / Math.sin(alpha * Math.PI / 180);
    const b = Math.sqrt(Math.pow(c, 2) - Math.pow(a, 2));
    const beta = getOppositeAngle(b, c);
    logValues(a, b, c, alpha, beta)
}

function calculateAngleHypotenuse(angle, hypotenuse) {
    console.log(`angle ${angle} + hypotenuse ${hypotenuse}`)
    const c = hypotenuse;
    const alpha = angle;
    const beta = 90 - alpha;
    const a = c * Math.sin(alpha * Math.PI / 180);
    const b = c * Math.sin(beta * Math.PI / 180);
    logValues(a, b, c, alpha, beta)
}

triangle(3, Values.LEG, 4, Values.LEG);
triangle(5, Values.LEG, 3, Values.HYPOTENUSE);
triangle(3, Values.LEG, 53.13010235415598, Values.ADJACENT_ANGLE);
triangle(36.86989764584402, Values.OPPOSITE_ANGLE, 3, Values.LEG);
triangle(5, Values.HYPOTENUSE, 36.86989764584402, Values.ANGLE);
