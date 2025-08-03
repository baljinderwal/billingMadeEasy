db = db.getSiblingDB('billing_db');

db.createCollection('products');
db.createCollection('categories');
db.createCollection('users');
db.createCollection('carts');
db.createCollection('orders');
db.createCollection('payments');
db.createCollection('reviews');
db.createCollection('coupons');
db.createCollection('vendors');

db.createCollection('campaigns');
db.createCollection('promotions');
db.createCollection('referrals');
db.createCollection('loyaltyprograms');
db.createCollection('analytics');
db.createCollection('notifications');
db.createCollection('templates');
db.createCollection('vendorapplications');
db.createCollection('commissions');
db.createCollection('payouts');

db.products.createIndex({ "sku": 1 }, { unique: true });
db.products.createIndex({ "name": "text", "description": "text" });
db.products.createIndex({ "category": 1 });
db.products.createIndex({ "status": 1 });

db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "phone": 1 }, { unique: true });

db.carts.createIndex({ "userId": 1 });
db.carts.createIndex({ "sessionId": 1 });

db.orders.createIndex({ "userId": 1 });
db.orders.createIndex({ "status": 1 });
db.orders.createIndex({ "createdAt": -1 });

db.payments.createIndex({ "orderId": 1 });
db.payments.createIndex({ "status": 1 });

console.log('Database initialized successfully');
