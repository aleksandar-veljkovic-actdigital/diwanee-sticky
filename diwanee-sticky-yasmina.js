

;// STICKY MPU
window.stickyMPU = function($el, stEndlist) {
  
  $el = $el || $('.desktop #gpt-ad-atf-mpu');
  stEndList = stEndlist || [];
  stEndList = stEndList.concat( $('.cc-article .article-footer').toArray() );
  stEndList = stEndList.concat( $('#spec-exec-wrap').toArray() );
  stEndList = stEndList.concat( $('.weekly-pick-wrapper').parent().toArray() );
  $stEnd = $(stEndList).eq(0);
  
  
  //var offsetTop = ($('.article-video-wrapper').length > 0) ? 185 : 35;
  var offsetTop = 35;
  $el.dwSticky({offsetTop: offsetTop, $stEnd: $stEnd});
};
window.stickyMPU();
// eof sticky mpu


// STICKY LB/TOP
(function () {
  var stickyKickStart = function ($target, $stEnd, offsetBot) {
    offsetBot = offsetBot || 0;
    var jobLB = function () {
      if ($target.hasClass('observed')){
        $target.parent().css({height:""});
        $target.data('dwSticky').destroy();
        return;
      }
      $target.addClass('observed');
      $target.parent().css({height: $target.parent().outerHeight()});
      $target.dwSticky({$stEnd: $stEnd.eq(0), offsetBot: offsetBot});
    };
    if ($target.find('iframe').length > 0) {
      jobLB();
    }
    else {
      observeDOM($target[0], function () {
        //console.log('obzerved');
        if ($target.find('iframe').length > 0) {
          jobLB();
        }
      });
    }
  };
  var stEndList = [];
  //stEndList = stEndList.concat($(".cc-video article.video figure.video-player").toArray());
  stEndList = stEndList.concat($('.tpl-homepage .full-wrapper .hp-hero-slider-wrapper').toArray());
  stEndList = stEndList.concat($('.tpl-topic-fashion-landing .full-wrapper .fashion-promoted-slider').toArray());
  stEndList = stEndList.concat($(".cc-video article.video:eq(0)").toArray());
  stEndList = stEndList.concat($(".cc-article article .w__desk--right").toArray());
  stEndList = stEndList.concat($(".cc-event article .w__desk--right").toArray());
  stEndList = stEndList.concat($(".cc-slideshow article .w__desk--right").toArray());
  stEndList = stEndList.concat($(".tpl-personalityTest-detail article .w__desk--right").toArray());
  stEndList = stEndList.concat($(".tpl-homepage .b__hero--hp").toArray());
  stEndList = stEndList.concat($("body:not('.tpl-videos')  > .page-wrapper-holder").toArray());
  var $stEndList = $(stEndList);
  // lb
  stickyKickStart($('.desktop #gpt-ad-atf-lb'), $($stEndList).eq(0));
  // top
  stickyKickStart($('.desktop #gpt-ad-atf-top'), $($stEndList).eq(0));
})();
// eof sticky lb/top


// VIDEO
(function () {
  //selectors
  var $el = $('.article-video-wrapper .video-player');
  var $container = $el.parent();
  var playerSelectorStr = '.ytplayer, video';
  //event handlers
  var onPlay = function () {
    $container.css({height: $el.parent().outerHeight(false)});
    if (!$container.hasClass('video-sticky-initialized')) {
      $container.addClass('video-sticky-initialized');
      $container.on('horizons', function (event, horizon) {
        if (horizon.b === "north") {
          $el.addClass('sticky-video');
          $el.addClass('ux-trigger');
          setTimeout(function () {
            $el.removeClass('ux-trigger');
          }, 0);
        } else {
          $el.removeClass('sticky-video');
        }
      });
    }
  };
  var onEnded = function(){
    $container.off('horizons');
    $container.removeClass('video-sticky-initialized');
    $el.removeClass('sticky-video');
  };
  var $player = $();
  observeDOM($container[0], function(){
    $player.off('play playing ended');
    $player = $el.find(playerSelectorStr);
    $player.on('play playing', onPlay);
    $player.on('ended', onEnded);
  });
  // dynamic Ad banner positioning
  var dynamicAdHandler = function(ev){
    if (!$el.hasClass('sticky-video')) {
      $el.css({bottom: ""});
      return;
    }
    var bot = $('.ad--roadblock-inner').outerHeight(true);
    if (bot!==0) {
      $el.css({bottom: bot});
    }
  }
  //$(document).on('ready', dynamicAdHandler);
  //$(window).on('load resize', dynamicAdHandler);
  setInterval(dynamicAdHandler, 500);
})();
// eof video
