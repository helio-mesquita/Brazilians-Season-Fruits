function sortCards () {
    var order = []
    for (var i = 0; i < 24; i++) {
        do{
            var cardRandom = Math.ceil(Math.random()*24);
        } while(order.lastIndexOf(cardRandom) != -1);
        order.push(cardRandom);
    }
    alert(order.join(","));
}

sortCards();

function cardPosition () {
    for(i = 1; i =< 24; i++)
    fruit[i].order = order[i];
}

function createCards () {
}