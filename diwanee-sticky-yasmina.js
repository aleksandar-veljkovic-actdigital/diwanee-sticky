

;// STICKY MPU
(function () {
  //var offsetTop = ($('.article-video-wrapper').length > 0) ? 185 : 35;
  var offsetTop = 35;
  $('.desktop #ad-above-fold-MPU-holder').dwSticky({offsetTop: offsetTop, $stEnd: $('#ad-SE-holder')});
})();
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
  stEndList = stEndList.concat($(".cc-video .ad--subnavigation").toArray());
  stEndList = stEndList.concat($(".cc-article article .w__desk--right").toArray());
  stEndList = stEndList.concat($(".cc-event article .w__desk--right").toArray());
  stEndList = stEndList.concat($(".cc-slideshow article .w__desk--right").toArray());
  stEndList = stEndList.concat($(".tpl-personalityTest-detail article .w__desk--right").toArray());
  stEndList = stEndList.concat($(".tpl-homepage .b__hero--hp").toArray());
  stEndList = stEndList.concat($("body  > .page-wrapper-holder").toArray());
  var $stEndList = $(stEndList);
  // lb
  stickyKickStart($('.desktop #ad-above-fold-LB-holder'), $($stEndList).eq(0));
  // top
  stickyKickStart($('.desktop #ad-top-holder'), $($stEndList).eq(0));
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
