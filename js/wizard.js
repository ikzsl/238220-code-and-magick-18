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

  var wizard = {
    onEyesChange: function () { },
    onCoatChange: function () { }
  };

  var changeValue = function (array, currentValue) {
    var randomValue = selectRandomElement(array);
    while (randomValue === currentValue) {
      randomValue = selectRandomElement(array);
    }
    return randomValue;
  };

  var setupPlayer = document.querySelector('.setup-player');


  // Меняем цвет плаща

  var wizardCoat = setupPlayer.querySelector('.wizard-coat');
  var coatColorInput = setupPlayer.querySelector('input[name=coat-color]');
  wizardCoat.addEventListener('click', function () {
    var newColor = changeValue(WIZARD_COAT_COLORS, coatColorInput.value);
    wizardCoat.style.fill = newColor;
    coatColorInput.value = newColor;
    wizard.onCoatChange(newColor);
  });

  // Меняем цвет глаз

  var wizardEyes = setupPlayer.querySelector('.wizard-eyes');
  var eyesColorInput = setupPlayer.querySelector('input[name=eyes-color]');
  wizardEyes.addEventListener('click', function () {
    var newColor = changeValue(WIZARD_EYES_COLORS, eyesColorInput.value);
    wizardEyes.style.fill = newColor;
    eyesColorInput.value = newColor;
    wizard.onEyesChange(newColor);
  });

  // Меняем цвет фаерболов
  var fireball = setupPlayer.querySelector('.setup-fireball-wrap');
  var fireballColorInput = fireball.querySelector('input[name=fireball-color]');
  fireball.addEventListener('click', function () {
    var randomFireballColor = changeValue(FIREBALL_COLORS, fireballColorInput.value);
    fireball.style.backgroundColor = randomFireballColor;
    fireballColorInput.value = randomFireballColor;
  });
  return (window.wizard = wizard);
})();
