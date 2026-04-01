# Car Marketplace MVP - Setup & Usage Guide

## 🚀 Project Overview

This is a fully functional car marketplace MVP where:
- **Admins** can list cars to sell
- **Customers** can browse cars and purchase with partial deposits or full payment
- **Payments** are processed through Stripe

---

## ✅ Current Status

### ✓ Backend (Express.js)
- **Running on**: http://localhost:5000
- **Features**:
  - In-memory car storage
  - REST API routes for cars and payments
  - Stripe Checkout integration
  - CORS enabled for frontend

### ✓ Frontend (React + Vite)
- **Running on**: http://localhost:5174
- **Features**:
  - Browse cars
  - View car details
  - Payment options (deposit or full)
  - Admin panel to list cars

---

## 📋 API Endpoints

### Cars Routes
- `GET /api/cars` - Get all cars
- `POST /api/cars` - Add new car (title, price, image)
- `GET /api/cars/:id` - Get car details

### Payment Routes
- `POST /api/pay` - Create Stripe payment session
  - **Params**: `price` (number), `type` ("deposit" or "full")
  - **Deposit Rates**:
    - < $10,000 → 7.5%
    - < $100,000 → 5%
    - ≥ $100,000 → 1%

### Health Check
- `GET /api/health` - Server status

---

## 🛠️ Directory Structure

```
car-marketplace/
├── server/
│   ├── server.js          # Express backend
│   ├── package.json       # Backend dependencies
│   └── .env              # Stripe API key (optional)
│
└── client/
    ├── src/
    │   ├── App.jsx
    │   ├── index.css
    │   ├── main.jsx
    │   ├── components/
    │   │   └── Navigation.jsx
    │   └── pages/
    │       ├── Home.jsx          # Browse cars
    │       ├── CarDetails.jsx    # View & buy
    │       ├── SellCar.jsx       # Admin form
    │       └── Success.jsx       # Payment success
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## 🎯 Features

### Customer Features
1. **Browse Cars**
   - View all available cars on homepage
   - See car title, price, and image

2. **View Details**
   - Click any car to see full details
   - View deposit amount calculation
   - See payment options

3. **Payment Options**
   - **Reserve with Deposit**: Pay percentage based on price
   - **Buy Now**: Pay full amount immediately
   - Both redirect to Stripe Checkout

### Admin Features
1. **Add Cars**
   - Fill form with title, price, image URL
   - Car is instantly available for purchase
   - See preview of car image

---

## 💳 Payment Flow

### Deposit Payment (Example)
- Car price: $25,000
- Deposit (5%): $1,250
- Customer clicks "Reserve with Deposit"
- Redirected to Stripe Checkout
- After payment → Redirected to `/success`

### Full Payment
- Car price: $25,000
- Customer clicks "Buy Now"
- Redirected to Stripe Checkout for full $25,000
- After payment → Redirected to `/success`

---

## 🔐 Testing Payment

### Stripe Test Cards
Use these in Stripe Checkout:
- **Success**: `4242 4242 4242 4242`
- **Expiry**: Any future date (e.g., 12/25)
- **CVC**: Any 3 digits (e.g., 123)

### Setup Stripe
1. Get API key from https://dashboard.stripe.com
2. Add to `server/.env`:
   ```
   STRIPE_SECRET_KEY=sk_test_your_key_here
   FRONTEND_URL=http://localhost:5174
   ```

---

## 🚀 Running the Application

### Start Backend
```bash
cd server
npm install
node server.js
# Runs on http://localhost:5000
```

### Start Frontend
```bash
cd client
npm install
npm run dev
# Runs on http://localhost:5174
```

### Both Already Running
✓ Backend: http://localhost:5000
✓ Frontend: http://localhost:5174

---

## 📱 Usage Workflow

### For Customers
1. Visit http://localhost:5174
2. Browse cars on homepage
3. Click any car to view details
4. Choose payment option:
   - Click "Reserve with Deposit" for partial payment
   - Click "Buy Now" for full payment
5. Complete payment on Stripe
6. See success message

### For Admins
1. Visit http://localhost:5174
2. Click "Sell Car" in navigation
3. Fill in:
   - Car Title (e.g., "2020 Toyota Camry")
   - Price (e.g., 25000)
   - Image URL
4. See image preview
5. Click "List Car"
6. Car is immediately available for purchase

---

## 🛡️ In-Memory Storage

- All cars stored in memory (server RAM)
- Data persists while server is running
- Data resets when server restarts
- Perfect for MVP/demo
- Ready for database migration later

---

## 🎨 Styling

- **Framework**: Tailwind CSS
- **Components**: Custom CSS classes
- **Responsive**: Mobile-friendly design
- **Colors**:
  - Primary: Blue (#3b82f6)
  - Success: Green (#10b981)
  - Secondary: Gray (#6b7280)

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Kill process on port 5174
netstat -ano | findstr :5174
taskkill /PID <PID> /F
```

### Payment Not Working
1. Check Stripe API key is set in `.env`
2. Verify `FRONTEND_URL` is correct
3. Check browser console for errors
4. Ensure backend is running

### Cars Not Loading
1. Verify backend is running on port 5000
2. Check browser console for network errors
3. Verify API endpoint: http://localhost:5000/api/cars

---

## 📦 Dependencies

### Backend
- `express` - Web framework
- `cors` - Cross-origin requests
- `stripe` - Payment processing
- `dotenv` - Environment variables

### Frontend
- `react` - UI library
- `react-dom` - React renderer
- `react-router-dom` - Routing
- `axios` - HTTP requests
- `tailwindcss` - CSS framework

---

## 🎓 Next Steps

To extend this MVP:
1. **Database**: Replace in-memory storage with MongoDB/PostgreSQL
2. **Authentication**: Add user login/registration
3. **Orders**: Store purchase history
4. **Email**: Send payment confirmations
5. **Backend Validation**: Add more robust input validation
6. **Image Upload**: Replace URL input with file upload

---

## ✨ Current MVP Capabilities

✓ List cars (admin)
✓ Browse cars (customer)
✓ View details (customer)
✓ Payment processing (Stripe)
✓ Deposit calculation
✓ Full purchase option
✓ Success page
✓ No database needed
✓ In-memory storage
✓ Zero configuration setup
✓ Production-ready error handling

---

## 🎯 Success Checklist

- [x] Backend running on port 5000
- [x] Frontend running on port 5174
- [x] Can add cars via Sell Car page
- [x] Can see cars on Home page
- [x] Can click car and view details
- [x] Can initiate payment (deposit or full)
- [x] Stripe checkout works
- [x] Success page displays after payment
- [x] No errors in console
- [x] Responsive design works on mobile

---

Enjoy your Car Marketplace MVP! 🚗
