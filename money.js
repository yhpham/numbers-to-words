// assume input as string
// assume input will include cents (.xx)

var single = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
var teen = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
var double = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

function money_to_string(input) {
    if (input[0] == '-') {
        var neg = true;
        input = input.slice(1);
    }

    var amount = parse(input);
    var dollars = amount[0];
    var cents = amount[1];

    var amount_str = get_billions(dollars) + get_cents(cents);

    if (neg == true) {
        amount_str = 'negative ' + amount_str;
    }

    amount_str = amount_str.replace(/  +/g, ' ');
    amount_str = amount_str.charAt(0).toUpperCase() + amount_str.slice(1);

    console.log(amount_str);
}

function get_amount(dollars, amount_str, amount_min, length_min, next_function) {
    var amount;
    var current = dollars.slice(0, dollars.length - (length_min - 1));
    var next = dollars.slice(dollars.length - (length_min - 1));

    if (dollars.length >= length_min) {
        if (dollars.substring(0, length_min + 2) == '0'.repeat(length_min + 2)) {
            amount = '';
        }
        else {
            if (Number(dollars) >= amount_min) {
                amount = next_function(current) + ' ' + amount_str + ' ' + next_function(next);
            }
            else {
                amount = next_function(next);
            }
        }
    }
    else {
        amount = next_function(dollars);
    }

    return amount;
}

function get_billions(dollars) {
    return get_amount(dollars, 'billion', 1000000000, 10, get_millions);
}

function get_millions(dollars) {
    return get_amount(dollars, 'million', 1000000, 7, get_thousands);
}

function get_thousands(dollars) {
    return get_amount(dollars, 'thousand', 1000, 4, get_hundreds);
}

function get_hundreds(dollars) {
    var amount;
    var tens = dollars.slice(1);

    if (dollars.length >= 3) {
        if (dollars.substring(0, 3) == '000') {
            amount = '';
        }
        else if (dollars.substring(0, 3)[0] != '0') {
            amount = single[Number(dollars[0])] + ' hundred ' + get_tens(tens);
        }
        else {
            amount = get_tens(tens);
        }
    }
    else {
        amount = get_tens(dollars);
    }

    return amount;
}

function get_tens(dollars) {
    var amount;

    if (dollars.length >= 2) {
        if (dollars.substring(0, 2) == '00') {
            amount = '';
        }
        else if (dollars[0] == '0') {
            amount = single[Number(dollars[1])];
        }
        else if (dollars[0] == '1') {
            amount = teen[Number(dollars[1])];
        }
        else {
            if (dollars[1] == '0') {
                amount = double[Number(dollars[0])];
            }
            else {
                amount = double[Number(dollars[0])] + '-' + single[Number(dollars[1])];
            }
        }
    }
    else {
        amount = single[Number(dollars[0])];
    }

    return amount;
}

function get_cents(cents) {
    var amount = ' and ' + cents + '/100 dollars';
    return amount;
}

function parse(input) {
    if (input[0] == "$") {
        input = input.slice(1);
    }

    var dollars = input.slice(0, input.length - 3);
    var cents = input.slice(input.length - 2);

    return [dollars, cents];
}

// test
money_to_string("$0.00");
money_to_string("$1.00");
money_to_string("$10.00");
money_to_string("$100.00");
money_to_string("$1000.00");
money_to_string("$10000.00");
money_to_string("$100000.00");
money_to_string("$1000000.00");
money_to_string("$10000000.00");
money_to_string("$100000000.00");
money_to_string("$1000000000.00");  // One billion and 00/100 dollars
money_to_string("$1100000000.00");
money_to_string("$1010000000.00");
money_to_string("$1001000000.00");
money_to_string("$1000100000.00");
money_to_string("$1000010000.00");
money_to_string("$1000001000.00");
money_to_string("$1000000100.00");
money_to_string("$1000000010.00");
money_to_string("-$1000000001.00");
