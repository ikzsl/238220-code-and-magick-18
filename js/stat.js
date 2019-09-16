'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 20;
var SPACE_BETWEEN = 40;

var BAR_WIDTH = 50;
var barHeight = 150;


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  if (arr.length) {
    var maxElement = arr[0];
    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16pt PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP, CLOUD_Y + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + 2 * FONT_GAP);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], CLOUD_X + BAR_WIDTH + (SPACE_BETWEEN + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_GAP);
    ctx.fillText(Math.floor(times[i]), BAR_WIDTH + CLOUD_X + (SPACE_BETWEEN + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - 2 * GAP - 2 * FONT_GAP + (barHeight - (barHeight * times[i])) / maxTime);
    ctx.fillStyle = names[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'hsl(' + 240 + ',' + Math.floor(100 * (Math.random())) + '%,' + 50 + '%)';
    ctx.fillRect(BAR_WIDTH + CLOUD_X + (SPACE_BETWEEN + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - 2 * GAP - FONT_GAP, BAR_WIDTH, (barHeight - (barHeight * times[i])) / maxTime);

  }
};

