orders.load();
let order = orders.getLast();

$(function() {
    let $nameSpan = $("#name");
    let $orderNb = $("#confirmation-number");

    $nameSpan.text(order.name + " " + order.surname);
    $orderNb.text(String(order.number));
});