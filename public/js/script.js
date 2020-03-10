$(document).ready(() => {
  // Initialization
  $('select').formSelect();
  $(".dropdown-trigger").dropdown();
  
  $(document).on('keypress',function(event) {
    if(event.which == 13 && $("#search_input").val().trim() != "") {
      event.preventDefault();
      location.replace(`/${$("#search_input").val().trim()}`);
    }
});

  $('#cart-page-button').on('click', async function(event) {
    event.preventDefault();
    let cart = JSON.parse(localStorage.getItem('cart'));
    if(cart === null) {
      let cart = [];
    }

    console.log("cart:")
    console.log(cart);

    $.get({
      url: '/updateCart',
      data: {
        'cart': cart
      }
    })
    .then(function(data) {
      location.replace('/cart');
    })
    .catch(function(err) {
      if(err) throw err;
    });
  })


  $(".add-to-cart").on("click", function(event) {
    itemID = $(this).data('id');
    var cart = [];
    if(localStorage.cart){
      cart = JSON.parse(localStorage.getItem('cart'));
      cart.push(itemID);
      localStorage.cart = JSON.stringify(cart);
    }
    else{
      cart.push(itemID);
      localStorage.setItem('cart', JSON.stringify(cart));
    }

  })

  $(".search-button").on('click', function(event) {
    event.preventDefault();
    location.replace(`/${$("#search_input").val().trim()}`);
  });

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

  $(".register-button").on('click', function(event) {
    event.preventDefault();

    const firstname = $("#firstname_input").val().trim();
    const lastname = $("#lastname_input").val().trim();
    const nickname = $("#nickname_input").val().trim();
    const email = $("#email_input").val().trim();
    const address = $("#address_input").val().trim();
    const city = $("#city_input").val().trim();
    const state = $("#state_input").val();
    
    //
    // validation
    //
   
    const newUser = {
      first_name: firstname,
      last_name: lastname,
      nickname: nickname,
      email: email,
      address: address,
      city: city,
      state: state,
      isRegistered: true
    }

    console.log(newUser);

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




