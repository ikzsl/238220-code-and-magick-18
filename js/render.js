'use strict';

(function () {

  var SIMILAR_WIZARDS_NUMBER = 4;

  var wizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = wizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  var similar = document.querySelector('.setup-similar');
  var similarListElement = document.querySelector('.setup-similar-list');


  window.render = function (data) {

    var takeNumber = Math.min(data.length, SIMILAR_WIZARDS_NUMBER);
    similarListElement.innerHTML = '';
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < takeNumber; i++) {
      fragment.append(renderWizard(data[i]));
    }
    similarListElement.appendChild(fragment);
    similar.classList.remove('hidden');
  };

})();
