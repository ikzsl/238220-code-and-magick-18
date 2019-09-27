'use strict';
var NUMBER_OF_WIZARDS = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

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

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');


var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment);
userDialog.querySelector('.setup-similar').classList.remove('hidden');


