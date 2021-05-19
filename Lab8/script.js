(function start() {

    var names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];
    names.forEach(n => {
        if (n.toLocaleLowerCase()[0] === "j") {
            sayHello()(n);
        } else {
            sayGoodBye()(n);
        }
    })

    names.forEach(n => {
        var asciiSum = 0;

        [...n].forEach(nn => {
            asciiSum += nn.charCodeAt(0);
        })

        console.log(`Ascii sum for name ${n}: ${asciiSum}`);

        if (asciiSum > 429) {
            sayGoodBye()(n);
        } else {
            sayHello()(n);
        }
    })
}())
