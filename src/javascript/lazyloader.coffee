console.log 'lazyloader.js loaded!'

$article_size = $(".card-article__box").size()
x = 3
more = 3
$(".card-article__box:lt(" + x + ")").show()

$("#loadMore").click ->
  x = (if (x + more <= $article_size) then x + more else $article_size)
  $(".card-article__box:lt(" + x + ")").show('slow')

$("#showLess").click ->
  x = (if (x - more < 0) then 3 else x - more)
  $(".card-article__box").not(":lt(" + x + ")").hide('slow')
