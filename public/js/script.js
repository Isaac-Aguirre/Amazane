$(document).ready(() => {
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
});