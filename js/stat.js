'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 20;
var SPACE_BETWEEN = 40;

var BAR_WIDTH = 50;
var BAR_HEIGHT = 150;


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  if (arr.length) {
    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
  }
  return maxElement;
};

var getBarColor = function (ctx, barName) {
  ctx.fillStyle = barName === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'hsl(' + 240 + ',' + Math.floor(100 * (Math.random())) + '%,' + 50 + '%)';
};

var renderBars = function (ctx, barNames, barTimes) {
  for (var i = 0; i < barNames.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(barNames[i], CLOUD_X + BAR_WIDTH + (SPACE_BETWEEN + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_GAP);
    ctx.fillText(Math.floor(barTimes[i]), BAR_WIDTH + CLOUD_X + (SPACE_BETWEEN + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - 2 * GAP - 2 * FONT_GAP + (BAR_HEIGHT - (BAR_HEIGHT * barTimes[i])) / getMaxElement(barTimes));
    getBarColor(ctx, barNames[i]);
    ctx.fillRect(BAR_WIDTH + CLOUD_X + (SPACE_BETWEEN + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - 2 * GAP - FONT_GAP, BAR_WIDTH, (BAR_HEIGHT - (BAR_HEIGHT * barTimes[i])) / getMaxElement(barTimes));
  }
};

var renderText = function (ctx, text, color, font, baseline, x, y) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textBaseline = baseline;
  ctx.fillText(text, x, y);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  renderText(ctx, 'Ура вы победили!', '#000', '16px PT Mono', 'hanging', CLOUD_X + GAP, CLOUD_Y + FONT_GAP);
  renderText(ctx, 'Список результатов:', '#000', '16px PT Mono', 'hanging', CLOUD_X + GAP, CLOUD_Y + 2 * FONT_GAP);

  renderBars(ctx, names, times);
};

