console.log 'subscribe.js loaded!'

# Get subscribe box
$subscribe = $(".cta-subscribe")
$subscribe_box = $subscribe.find(".cta-subscribe__signup")
$subscribe_error = $subscribe.find(".cta-subscribe__error")

# Get input and button
$subscribe_input = $subscribe_box.find(".cta-subscribe__input")
$subscribe_button = $subscribe_box.find(".cta-subscribe__button")

# Get message
$subscribe_message = $subscribe.find(".cta-subscribe__message")

# Validation
IsEmail = (email) ->
  regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/
  regex.test email

$subscribe_button.on "click", ->
  if IsEmail($subscribe_input.val())
    $subscribe_box.fadeOut('fast')
    $subscribe_message.fadeIn('slow')
    $subscribe_error.hide()
  else
    $subscribe_error.fadeIn('fast')
