# Travel Agency Platform

# Website Feature:
```

First, log in with a Customer account.( Peter or Alexa) 
Then select a trip and continue. In the next window you can specify the number of reservations and then your address and payment method. 
You can pay with Paypal Sandbox account, then the status will change from "not Paid" to "paid on "Date" ".

Now log out and login as admin with the admin email. 
As admin you can see which users there exist. 
Which Tours there are and update these Tours, or delete them. 
And the orders that have been placed by the users. You can also check the payment status.

```



## Usage


### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```



### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import


```

```
Sample User Logins

admin@example.com (Admin)
123456

peter@example.com (Customer)
123456

alexa@example.com (Customer)
123456
```
