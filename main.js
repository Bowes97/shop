let total = 0;
let shop = (function () {
    let bank = 1000;
    let price = 50;
    let beerCount = 100;
    let wineCount = 50;
    let pepsiCount = 80;
    let plusAtBank = 0;
    function balance() {
        return `${bank} грн`
    }
    function getBeerCount() {
        return `${beerCount} шт.`
    }
    function getWineCount() {
        return `${wineCount} шт. `
    }
    function getPepsiCount() {
        return `${pepsiCount} шт. `
    }
    function sellBeer(count) {
        let total = count * price;
        bank += total;
        beerCount -= count;
        plusAtBank += total;
        return `Пиво: ${count} шт.`

    }
    function sellWine(count) {
        let total = count * price;
        bank += total;
        wineCount -= count;
        plusAtBank += total;
        return `Вино: ${count} шт. `
    }
    function sellPepsi(count) {
        let total = count * price;
        bank += total;
        pepsiCount -= count;
        plusAtBank += total;
        return `Пепсі: ${count} шт. `
    }
    function sum(total) {
        total += plusAtBank;
        plusAtBank = 0;
        return `<p style="margin: 5px 0 0 5px;">Всього: ${total} гривень</p>`
    }
    return {
        balance: balance,
        sellPepsi: getPepsiCount,
        sellWine: getWineCount,
        sellBeer: getBeerCount,
        countBeer: sellBeer,
        countWine: sellWine,
        countPepsi: sellPepsi,
        sum: sum
    }
})();

const BALANCE = document.querySelector('.bank')
const BEER = document.querySelector('.beer')
const WINE = document.querySelector('.wine')
const PEPSI = document.querySelector('.pepsi')
const COUNT = document.getElementById('count')
const TEXT = document.getElementById('text')
const RADIO_BEER = document.getElementById('radio_beer')


function render() {
    BALANCE.value = shop.balance();
    BEER.value = shop.sellBeer();
    WINE.value = shop.sellWine();
    PEPSI.value = shop.sellPepsi();
    COUNT.value = "";
}
render();

let add = document.getElementById('add')
add.addEventListener('click', function () {
    if ($('#count').val() === '') {
        alert('Виберіть кількість товару')
    }
    else {
        if ($('#radio_beer').prop('checked') && $('#count').val() <= 100) {
            let count = COUNT.value;
            shop.countBeer(count);
            $('#text').append(`<p class="howMuch" style="margin: 5px 0 0 5px; font-size: 16px;"> Пиво: ${count} шт.</p>`)
        }
        if ($('#radio_wine').prop('checked') && $('#count').val() <= 50) {
            let count = COUNT.value;
            shop.countWine(count);
            $('#text').append(`<p class="howMuch" style="margin: 5px 0 0 5px; font-size: 16px;"> Вино: ${count} шт.</p>`)
        }
        if ($('#radio_pepsi').prop('checked') && $('#count').val() <= 80) {
            let count = COUNT.value;
            shop.countPepsi(count);
            $('#text').append(`<p class="howMuch" style="margin: 5px 0 0 5px; font-size: 16px;"> Пепсі: ${count} шт.</p>`)
        }
    }
});
$('#buy').click(function () {

    if ($('#text').html() === '') {
        alert('Виберіть товар')
    }
    else {
        render();
        $('.result p').remove()
        $('.result').append($('.howMuch'));
        $('.result').append(shop.sum(total))
    }


});