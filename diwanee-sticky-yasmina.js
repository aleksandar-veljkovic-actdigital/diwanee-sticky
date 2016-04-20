

;// STICKY MPU
(function () {
  var offsetTop = ($('.article-video-wrapper').length > 0) ? 185 : 35;
  $('.desktop #ad-above-fold-MPU-holder').dwSticky({offsetTop: offsetTop, $stEnd: $('#ad-SE-holder')});
})();
// eof sticky mpu
