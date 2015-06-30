console.log 'lazyloader.js loaded!'

$article_size = $(".card-article__box").size()
x = 3
more = 3
$loadmore = $("#loadMore")
$loadless = $("#showLess")

$(".card-article__box:lt(" + x + ")").show()
$loadless.addClass('disabled')

$loadmore.click ->
  x = (if (x + more <= $article_size) then x + more else $article_size)
  $(".card-article__box:lt(" + x + ")").show('slow', ->
    if ($(".card-article__box:visible").length == $article_size)
      #console.log 'hello'
      $loadmore.addClass('disabled')
    )
  $loadless.removeClass('disabled')


$loadless.click ->
  if ($(".card-article__box:visible").length > more)
    x = (if (x - more < 0) then 3 else x - more)
    $(".card-article__box").not(":lt(" + x + ")").hide('slow', ->
      if ($(".card-article__box:visible").length <= more)
        $loadless.addClass('disabled')
    )
    $loadmore.removeClass('disabled')
