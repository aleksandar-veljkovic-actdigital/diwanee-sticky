
;// STICKY MPU
(function () {

  
  var stEnd = 0 || 
          $('.page-homepage .hp-social__wrapper')[0] /*||
          $('.tpl-ingredient-listing .w-pagination--center')[0] || 
          $('.tpl-ingredient-detail .w-pagination--center')[0]; */
  
  var offsetTop = 35;
  var offsetBot = 0;
  
  if (!!$('.tpl-ingredient-listing').length){
    offsetTop = -20;
    offsetBot = 25;
  }
  if (!!$('.tpl-ingredient-detail').length){
    offsetBot = 25;
  }  
  
  $('.desktop #ad-above-fold-MPU-holder, .desktop #gpt-ad-atf-mpu').dwSticky({offsetBot: offsetBot, offsetTop: offsetTop, $stEnd: $(stEnd)});
  
})();
// eof sticky mpu
