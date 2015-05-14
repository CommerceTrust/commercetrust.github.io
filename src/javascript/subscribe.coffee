console.log 'subscribe.js loaded!'

$subscribe = $(".cta-subscribe")
$subscribe_box = $subscribe.find(".cta-subscribe__signup")

$subscribe_input = $subscribe_box.find(".cta-subscribe__input")
$subscribe_button = $subscribe_box.find(".cta-subscribe__button")

$subscribe_message = $subscribe.find(".cta-subscribe__message")

validate = ->


# <div class="cta-subscribe">
#   <div class="cta-subscribe__signup">
#     <h2 class="cta-subscribe__heading">Subscribe to Our Latest Insights</h2>
#     <div class="cta-subscribe__box">
#       <div class="cta-subscribe__input-add-on col-8-12">
#         <input type="email" name="subscribe-newsletter" class="cta-subscribe__input">
#       </div>
#       <div class="cta-subscribe__input-add-on col-4-12">
#         <input type="submit" value="Sign Up" class="cta-subscribe__button">
#       </div>
#     </div>
#   </div>
#   <div id="cta-subscribe__message">
#     <h2 class="cta-subscribe__heading">Thank you for subscribing!
#       <p>Check your email to confirm your subscription.</p>
#     </h2>
#   </div>
# </div>

$subscribe_button.on "click", ->
  $subscribe_box.fadeOut('fast')
  # if $(".cd-primary-nav").hasClass("nav-is-visible")
  #   closeNav()
  #   $(".cd-overlay").removeClass "is-visible"
