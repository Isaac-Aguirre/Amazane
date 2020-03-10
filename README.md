# AmaZane

## Online Shop that sells:
* shoes
* t-shirts
* sweatshirts
* bottoms
* accessories

## Will utilize:
* MySQL + Sequelize for database
* Materialize for CSS Framework
* Google authentication as third-party API for login/register
* JS & JQeury
* Node.js & Express
* Will deploy via Heroku & use JawsDB

## Features to be implemented
* Semi-fancy landing page
* Search feature & Pagination of search results
* Shopping cart & Add to cart
* Login/Register (+ Separate route for administrator features)
* Checkout route
* Profile page, "log out", "payment methods"
* Order confirmation & Order confirmation

## Database
```
TABLE `User`:
  userID, googleID, first_name, last_name, nickname, email, address, city, state, isRegistered

TABLE `Item`:
  id(sku), name, price, category, quantity(in stock), img-link 

TABLE `Orders`
  id(unique), order_number(isn't unique), userId, itemId, qty
```



  