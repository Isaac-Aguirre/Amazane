# ONLINE E COMMERCE SHOP

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
* Search feature & Pagination of search results
* Shopping cart & Add to cart
* Login/Register (+ Separate route for administrator features)
* Checkout route
* "Accounts" : profile (edit address, etc), orders, "log out", "payment methods"

## Database
```
TABLE `User`:
  id, first_name, last_name, username, email, address, (+password?)

TABLE `Item`:
  id(sku), name, price, category, quantity(in stock), img-link 

TABLE `Orders`
  id(unique), order_number(isn't unique), userId, itemId, qty
```



  