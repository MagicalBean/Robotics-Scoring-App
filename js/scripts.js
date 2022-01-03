var counterValues = {};
var checkboxes = {};
var multipliers = [];

var templatePins = document.getElementById('template-pins').innerHTML;
var templateBullseye = document.getElementById('template-bullseye').innerHTML;

loadJSON(
    'https://api.npoint.io/e73f0e42f66d55498c6b',
    (data) => {
        data.fields.forEach((field) => {
            if (Array.isArray(field)) {
                field.forEach((value, i) => {
                    checkboxes[i + '_' + value] = false;
                    var temp = templateBullseye.replace('[VALUE]', value).replaceAll('[ID]', i + '_' + value);
                    if (i <= 1) temp = temp.replace('[PADDING]', 17);
                    if (i >= 2 && i <= 5) temp = temp.replace('[PADDING]', 13);
                    if (i >= 6 && i <= 11) temp = temp.replace('[PADDING]', 11.5);
                    if (i >= 11) temp = temp.replace('[PADDING]', 6);
                    if (i <= 5) document.getElementById('1-6').insertAdjacentHTML('beforeend', temp);
                    if (i >= 6 && i <= 11) document.getElementById('7-12').insertAdjacentHTML('beforeend', temp);
                    if (i >= 12) document.getElementById('13-17').insertAdjacentHTML('beforeend', temp);
                });
            } else {
                counterValues[field.name] = 0;
                multipliers.push(field.multiplier);
                var temp = templatePins
                    .replace('[DISPLAY_NAME]', field.displayName + ':')
                    .replaceAll('[VARIABLE_NAME]', field.name);
                if (Array.isArray(field.multiplier)) {
                    temp = temp
                        .replace(
                            '[VALUE]',
                            `(${field.multiplier[1]},&nbsp${field.multiplier[2]},\n${field.multiplier[3]},&nbsp${field.multiplier[4]})`
                        )
                        .replace('[HELPER_TOP_MARGIN]', '-4.6px');
                } else
                    temp = temp.replace('[VALUE]', '(' + field.multiplier + ')').replace('[HELPER_TOP_MARGIN]', '4px');
                document.getElementById('fields').insertAdjacentHTML('beforeend', temp);
            }
        });
        console.log(counterValues);
    },
    (xhr) => console.error(xhr)
);

// Helper Functions

var buttonWait = false;

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {});
});

function checkbox(i) {
    console.log('Check');
    checkboxes[i] = !checkboxes[i];
    update();
    //document.getElementById('checkbox' + i).checked = checkboxes[i];
}

function resetField(name) {
    counterValues[name] = 0;
    update();
}

function decrementField(name) {
    if (buttonWait) return;
    counterValues[name] -= 1;
    if (counterValues[name] <= 0) counterValues[name] = 0;
    update();
}

function incrementField(name) {
    if (buttonWait) return;
    counterValues[name] += 1;
    update();
}

function update() {
    buttonWait = true;
    for (let [key, value] of Object.entries(counterValues)) {
        document.getElementById(key).innerHTML = value;
    }
    setTimeout(() => {
        buttonWait = false;
    }, 100);
    evaluateTotal();
}

function updateCheckboxes() {
    for (let [key, value] of Object.entries(checkboxes)) {
        document.getElementById('checkbox' + key).checked = value;
    }
}

function evaluateTotal() {
    var total = 0;
    var i = 0;
    for (let [key, value] of Object.entries(counterValues)) {
        // Loop over pins
        if (Array.isArray(multipliers[i])) {
            if (value >= multipliers[i].length) value = multipliers[i].length - 1;
            total += multipliers[i++][value];
        } else total += value * multipliers[i++];
        console.log(total);
    }

    i = 0;
    for (let [key, value] of Object.entries(checkboxes)) {
        if (value) {
            total += parseInt(key.split('_')[1]);
        }
    }
    document.getElementById('total').innerHTML = total;
}

function resetFields() {
    for (let [key, value] of Object.entries(counterValues)) {
        counterValues[key] = 0;
    }
    for (let [key, value] of Object.entries(checkboxes)) {
        checkboxes[key] = false;
    }
    update();
    updateCheckboxes();
}

function loadJSON(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success) success(JSON.parse(xhr.responseText));
            } else {
                if (error) error(xhr);
            }
        }
    };
    xhr.open('GET', path, true);
    xhr.send();
}
