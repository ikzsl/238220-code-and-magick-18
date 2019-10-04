'use strict';
var NUMBER_OF_WIZARDS = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var selectRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var generateWizards = function (names, surnames, coatColors, eyesColors, number) {
  var wizardsArr = [];
  for (var i = 0; i < number; i++) {
    wizardsArr[i] = {
      name: selectRandomElement(names) + ' ' + selectRandomElement(surnames),
      coatColor: selectRandomElement(coatColors),
      eyesColor: selectRandomElement(eyesColors)
    };
  }
  return wizardsArr;
};

var wizards = generateWizards(WIZARD_NAMES, WIZARD_SURNAMES, WIZARD_COAT_COLORS, WIZARD_EYES_COLORS, NUMBER_OF_WIZARDS);

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};


var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupUserName = setup.querySelector('.setup-user-name');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupUserName.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupEscPress);
});

setupUserName.addEventListener('blur', function () {
  document.addEventListener('keydown', onPopupEscPress);
});

setupClose.addEventListener('click', closePopup);

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

setupOpen.addEventListener('click', openPopup);

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});


var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');


var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment);
setup.querySelector('.setup-similar').classList.remove('hidden');

var userNameInput = setup.querySelector('.setup-user-name');
userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});


var setupPlayer = document.querySelector('.setup-player');
var wizardCoat = setupPlayer.querySelector('.wizard-coat');
var wizardEyes = setupPlayer.querySelector('.wizard-eyes');
var fireball = setupPlayer.querySelector('.setup-fireball-wrap');
var coatColorInput = setupPlayer.querySelector('input[name=coat-color]');
var eyesColorInput = setupPlayer.querySelector('input[name=eyes-color]');
var fireballColorInput = fireball.querySelector('input[name=fireball-color]');

// Меняем цвет плаща
wizardCoat.addEventListener('click', function () {
  var randomCoatColor = selectRandomElement(WIZARD_COAT_COLORS);
  wizardCoat.style.fill = randomCoatColor;
  coatColorInput.value = randomCoatColor;
});

// Меняем цвет глаз
wizardEyes.addEventListener('click', function () {
  var randomEyesColor = selectRandomElement(WIZARD_EYES_COLORS);
  wizardEyes.style.fill = randomEyesColor;
  eyesColorInput.value = randomEyesColor;
});

// Меняем цвет фаерболов
fireball.addEventListener('click', function () {
  var randomFireballColor = selectRandomElement(FIREBALL_COLORS);
  fireball.style.background = randomFireballColor;
  fireballColorInput.value = randomFireballColor;
});

