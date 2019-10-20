'use strict';
(function () {
  var WIZARD_COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];
  var WIZARD_EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];
  var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var selectRandomElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {

    window.render(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };


  var successHandler = function (data) {
    wizards = data;
    updateWizards();
  };


  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 5px auto; text-align: center; background-color: red;';
    node.style.position = 'fixed';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  var setup = document.querySelector('.setup');

  var form = document.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      setup.classList.add('hidden');
    }, errorHandler);
    evt.preventDefault();
  });

  var changeValue = function (array, currentValue) {
    var randomValue = selectRandomElement(array);
    while (randomValue === currentValue) {
      randomValue = selectRandomElement(array);
    }
    return randomValue;
  };

  var setupPlayer = document.querySelector('.setup-player');

  // Меняем цвет плаща
  var coatColor;
  var wizardCoat = setupPlayer.querySelector('.wizard-coat');
  var coatColorInput = setupPlayer.querySelector('input[name=coat-color]');
  wizardCoat.addEventListener('click', function () {
    var randomCoatColor = changeValue(WIZARD_COAT_COLORS, coatColorInput.value);
    wizardCoat.style.fill = randomCoatColor;
    coatColorInput.value = randomCoatColor;
    coatColor = randomCoatColor;
    updateWizards();
  });

  // Меняем цвет глаз
  var eyesColor;
  var wizardEyes = setupPlayer.querySelector('.wizard-eyes');
  var eyesColorInput = setupPlayer.querySelector('input[name=eyes-color]');
  wizardEyes.addEventListener('click', function () {
    var randomEyesColor = changeValue(WIZARD_EYES_COLORS, eyesColorInput.value);
    wizardEyes.style.fill = randomEyesColor;
    eyesColorInput.value = randomEyesColor;
    eyesColor = randomEyesColor;
    updateWizards();
  });

  // Меняем цвет фаерболов
  var fireball = setupPlayer.querySelector('.setup-fireball-wrap');
  var fireballColorInput = fireball.querySelector('input[name=fireball-color]');
  fireball.addEventListener('click', function () {
    var randomFireballColor = changeValue(FIREBALL_COLORS, fireballColorInput.value);
    fireball.style.backgroundColor = randomFireballColor;
    fireballColorInput.value = randomFireballColor;
  });
})();
