'use strict';
(function () {
  var NUMBER_OF_WIZARDS = 4;
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var selectRandomElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };


  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  };


  var setup = document.querySelector('.setup');

  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
      fragment.append(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
    setup.querySelector('.setup-similar').classList.remove('hidden');
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

  var form = document.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      setup.classList.add('hidden');
    }, errorHandler);
    evt.preventDefault();
  });


  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');


  var setupPlayer = document.querySelector('.setup-player');
  var wizardCoat = setupPlayer.querySelector('.wizard-coat');
  var wizardEyes = setupPlayer.querySelector('.wizard-eyes');
  var fireball = setupPlayer.querySelector('.setup-fireball-wrap');
  var coatColorInput = setupPlayer.querySelector('input[name=coat-color]');
  var eyesColorInput = setupPlayer.querySelector('input[name=eyes-color]');
  var fireballColorInput = fireball.querySelector('input[name=fireball-color]');

  var changeValue = function (array, currentValue) {
    var randomValue = selectRandomElement(array);
    while (randomValue === currentValue) {
      randomValue = selectRandomElement(array);
    }
    return randomValue;
  };

  // Меняем цвет плаща
  wizardCoat.addEventListener('click', function () {
    var randomCoatColor = changeValue(WIZARD_COAT_COLORS, coatColorInput.value);
    wizardCoat.style.fill = randomCoatColor;
    coatColorInput.value = randomCoatColor;
  });

  // Меняем цвет глаз
  wizardEyes.addEventListener('click', function () {
    var randomEyesColor = changeValue(WIZARD_EYES_COLORS, eyesColorInput.value);
    wizardEyes.style.fill = randomEyesColor;
    eyesColorInput.value = randomEyesColor;
  });

  // Меняем цвет фаерболов
  fireball.addEventListener('click', function () {
    var randomFireballColor = changeValue(FIREBALL_COLORS, fireballColorInput.value);
    fireball.style.backgroundColor = randomFireballColor;
    fireballColorInput.value = randomFireballColor;
  });


})();
