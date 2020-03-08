$(document).ready(() => {
  // Initialization
  $('select').formSelect();

  $(".load-database").on('click', function(event) {
    event.preventDefault();
    $.ajax({
      url: '/api/pushInventory',
      method: 'GET'
    }).then(function(data) {
      console.log('cb fired');
      location.reload();
    });
  });

  $(".register-user").on('click', function(event) {
    event.preventDefault();

    const firstname = $("#firstname_input").val().trim();
    const lastname = $("#lastname_input").val().trim();
    const username = $("#username_input").val().trim();
    const password = $("#password_input").val().trim();
    const confirmPassword = $("#confirm_password_input").val().trim();
    const email = $("#email_input").val().trim();
    const address = $("#address_input").val().trim();
    const city = $("city_input").val().trim();
    const state = $("#state_input").val();
    
    //
    // validation
    //
    
    const newUser = {
      first_name: firstname,
      last_name: lastname,
      username: username,
      password: password,
      email: email,
      address: address,
      city: city,
      state: state,
      isRegistered: true
    }

    $.ajax({
      url: '/api/users/' + $(this).data('id'),
      method: 'PUT',
      data: newUser
    }).then(function(response) {
      location.reload();
    }).catch(function(err) {
      if(err) throw err;
    });
  });

});