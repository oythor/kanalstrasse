;(function($) {
  var $header_images, $navigation;
  var active_image = 0;
  var tid;

  var rotateHeaderImage = function() {
    tid = setTimeout(rotateHeaderImage, $('#rotating_images').attr('data-delay'));
    $navigation.find('a').removeClass('active').eq(active_image).addClass('active');
    $header_images.hide().css({ 'opacity': 0.1 }).eq(active_image).show().animate({ 'opacity': 1 }, 'slow', function() {
      $('#rotating_images').css({ 'background-image': 'url(' + $(this).find('img').get(0).src + ')' });
    });
    if(++active_image == $header_images.length) active_image = 0;
  };

  $(document).ready(function() {
    $header_images = $('#rotating_images').find('.item');
    $navigation = $('#rotating_images').find('.navigation');
    
    $header_images.each(function(_i) {
      var i = _i;
      var $a = $('<a href="#' + i + '">&bull;</a>');
      $a.click(function(e) {
        e.preventDefault();
        clearTimeout(tid);
        active_image = i;
        rotateHeaderImage();
      });
      $navigation.append($a);
    });

    $(window).resize(function() {
      $('#rotating_images').height($header_images.eq(active_image).height());
    }).resize();

    rotateHeaderImage();
  });
})(jQuery);
