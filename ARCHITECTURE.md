# 🏗️ Car Marketplace - System Architecture & Data Flow

## Complete System Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          CUSTOMER EXPERIENCE                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Browser (http://localhost:5174)                                            │
│  ├─ Home Page: Browse all cars                                             │
│  ├─ Car Details: View specific car + payment options                       │
│  ├─ Stripe Checkout: Process payment                                       │
│  └─ Success Page: Confirmation                                             │
│                                                                              │
└──────────────────────────┬───────────────────────────────────────────────────┘
                           │ Axios HTTP Requests
                           ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│                    BACKEND SERVER (http://localhost:5000)                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Express.js Application                                                     │
│  ├─ Middleware:                                                             │
│  │  ├─ CORS (allow frontend)                                              │
│  │  └─ JSON Parser                                                         │
│  │                                                                          │
│  ├─ In-Memory Storage:                                                     │
│  │  └─ cars[] array                                                        │
│  │                                                                          │
│  ├─ Routes:                                                                │
│  │  ├─ GET /api/cars → Return all cars                                    │
│  │  ├─ POST /api/cars → Add new car                                       │
│  │  ├─ GET /api/cars/:id → Get car details                               │
│  │  ├─ POST /api/pay → Create Stripe session                             │
│  │  └─ GET /api/health → Health check                                    │
│  │                                                                          │
│  └─ Business Logic:                                                        │
│     ├─ Deposit Calculation                                                │
│     └─ Stripe Integration                                                 │
│                                                                              │
└──────────────────────────┬──────────────────────────┬───────────────────────┘
                           │ API Calls                │ Stripe API
                           │                          │
                           ↓                          ↓
                    ┌─────────────┐          ┌──────────────────┐
                    │   Database  │          │  Stripe Service  │
                    │  (In-Memory)│          │  (External)      │
                    │             │          │                  │
                    │ cars: [     │          │ - Checkout       │
                    │   {id, ..}  │          │ - Payment        │
                    │   {id, ..}  │          │ - Redirect URLs  │
                    │ ]           │          │                  │
                    └─────────────┘          └──────────────────┘
```

---

## Page Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    START HERE: Home Page                        │
│              http://localhost:5174/                             │
│                                                                 │
│  ┌──────────────────────────────────┐                          │
│  │  Grid of Cars                    │                          │
│  ├──────────────────────────────────┤                          │
│  │ [Car 1]  [Car 2]  [Car 3]        │                          │
│  │ Click    Click    Click          │                          │
│  └──────────────────────────────────┘                          │
│           │           │           │                            │
└───────────┼───────────┼───────────┼────────────────────────────┘
            │           │           │
            └───────────┴───────────┘
                       │
                       ↓
        ┌──────────────────────────────┐
        │   Car Details Page           │
        │   /car/:id                   │
        │                              │
        │ ┌──────────────────────────┐ │
        │ │ Car Image (Large)        │ │
        │ │ Title & Price            │ │
        │ │ Deposit Amount           │ │
        │ │                          │ │
        │ │ [Reserve Deposit] [Buy] │ │
        │ └──────────────────────────┘ │
        └──────┬──────────────┬─────────┘
               │              │
        ┌──────┴─┐      ┌─────┴──────┐
        ↓        ↓      ↓            ↓
    [Deposit] [Full]  Stripe Choice
        │        │     │
        └────┬───┴─────┴──┐
             │            │
             ↓            ↓
    ┌──────────────────────────────┐
    │   Stripe Checkout Page       │
    │                              │
    │  Amount: $1,250 or $25,000   │
    │  [Email Input]               │
    │  [Card Input]                │
    │  [Pay Button]                │
    └───────────┬──────────────────┘
                │
                ↓
    ┌──────────────────────────────┐
    │   Success Page               │
    │   /success                   │
    │                              │
    │   ✓ Payment Successful!      │
    │                              │
    │  [Home] [Sell Car]          │
    └──────────────────────────────┘
```

---

## Admin Workflow

```
┌─────────────────────────────────────────────┐
│   Admin: Click "Sell Car"                   │
│   Navigation → /sell                        │
└──────────────┬──────────────────────────────┘
               │
               ↓
    ┌──────────────────────────────┐
    │   Sell Car Form Page         │
    │   /sell                      │
    │                              │
    │ [Title Input]                │
    │ [Price Input]                │
    │ [Image URL Input]            │
    │ [Image Preview]              │
    │ [List Car Button]            │
    └──────────┬───────────────────┘
               │
               ↓ (API: POST /api/cars)
    ┌──────────────────────────────┐
    │   Backend Processing         │
    │                              │
    │ 1. Validate inputs           │
    │ 2. Create car object         │
    │ 3. Add to cars[] array       │
    │ 4. Return car data           │
    └──────────┬───────────────────┘
               │
               ↓
    ┌──────────────────────────────┐
    │   Instant Result             │
    │   - Success message shown    │
    │   - Redirected to details    │
    │   - Data available to all    │
    └──────────────────────────────┘
               │
               ↓
    ┌──────────────────────────────┐
    │   Car Appears on Home        │
    │   - Visible in grid          │
    │   - Real-time update         │
    │   - Ready for purchase       │
    └──────────────────────────────┘
```

---

## Payment Processing Flow

```
┌─────────────────────────────────────────────────────────┐
│                PAYMENT SELECTION                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Customer Views Car ($25,000)                          │
│  ├─ Full Price: $25,000                               │
│  ├─ Deposit (5%): $1,250                              │
│  │                                                     │
│  │ Button 1: Reserve with Deposit → $1,250            │
│  │ Button 2: Buy Now → $25,000                        │
│  │                                                     │
└──────────────┬────────────────────────┬────────────────┘
               │                        │
           [DEPOSIT]             [FULL PAYMENT]
               │                        │
        ┌──────┴─────┐           ┌─────┴──────┐
        │             │           │            │
        ↓             ↓           ↓            ↓
    Frontend      Frontend    Frontend    Frontend
    sends:        sends:      sends:      sends:
    {             {           {           {
      price:      price:        price:      price:
      25000,      25000,        25000,      25000,
      type:       type:         type:       type:
      "deposit"   "deposit"     "full"      "full"
    }             }             }           }
        │             │           │            │
        └──────┬──────┘           └─────┬──────┘
               │                        │
               ↓ (Both routes similar) ↓
    ┌─────────────────────────────────────┐
    │    Backend: /api/pay                │
    │                                     │
    │  1. Calculate amount:               │
    │     - Deposit: 5% = $1,250          │
    │     - Full: 100% = $25,000          │
    │                                     │
    │  2. Create Stripe session:          │
    │     - line_items array              │
    │     - amount in cents               │
    │     - mode: "payment"               │
    │     - URLs for redirect             │
    │                                     │
    │  3. Return session.url              │
    └─────────────────────────────────────┘
               │
               ↓
    ┌─────────────────────────────────────┐
    │    Frontend Redirects               │
    │    window.location.href =           │
    │    stripe_checkout_url              │
    └────────────────┬────────────────────┘
                     │
                     ↓
    ┌──────────────────────────────────────┐
    │    Stripe Checkout Modal             │
    │    (Secure, PCI Compliant)           │
    │                                      │
    │  Email: _______________              │
    │  Card:  4242 4242...                 │
    │  Exp:   12/25                        │
    │  CVC:   123                          │
    │                                      │
    │  [COMPLETE AUTHENTICATION]           │
    │  [PROCESS PAYMENT]                   │
    └────────────────┬─────────────────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
    [❌ DECLINED]         [✅ SUCCESS]
         │                       │
         ↓                       ↓
    Redirect to:          Redirect to:
    http://localhost:     http://localhost:
    5174/                 5174/success
         │                       │
         ├───────┬───────────────┤
         │       │               │
         ↓       ↓               ↓
    Back to   Success        Customer
    Home      Page           Confirmation
    Page      Shown
```

---

## Data Model

### Car Object
```javascript
{
  id: 1,                              // Auto-increment
  title: "2020 Toyota Camry",        // User input
  price: 25000,                      // User input (number)
  image: "https://...",              // User input (URL)
  createdAt: "2025-03-31T12:00:00Z"  // Auto-generated
}
```

### Payment Request
```javascript
{
  price: 25000,        // From car
  type: "deposit"      // User choice: "deposit" or "full"
}
```

### Stripe Session
```javascript
{
  id: "cs_test_...",
  url: "https://checkout.stripe.com/...",
  payment_method_types: ["card"],
  line_items: [{
    price_data: {
      currency: "usd",
      product_data: {
        name: "Car Deposit",
        description: "..."
      },
      unit_amount: 125000  // Cents: $1,250
    },
    quantity: 1
  }],
  mode: "payment",
  success_url: "http://localhost:5174/success",
  cancel_url: "http://localhost:5174/"
}
```

---

## API Call Examples

### 1. Get All Cars
```
GET /api/cars

Response:
[
  {
    id: 1,
    title: "2020 Toyota",
    price: 25000,
    image: "...",
    createdAt: "..."
  },
  {
    id: 2,
    title: "2019 Honda",
    price: 22000,
    image: "...",
    createdAt: "..."
  }
]
```

### 2. Add Car
```
POST /api/cars

Request Body:
{
  "title": "2020 Toyota Camry",
  "price": 25000,
  "image": "https://..."
}

Response:
{
  "id": 1,
  "title": "2020 Toyota Camry",
  "price": 25000,
  "image": "https://...",
  "createdAt": "2025-03-31T12:00:00Z"
}
```

### 3. Get Car Details
```
GET /api/cars/1

Response:
{
  "id": 1,
  "title": "2020 Toyota Camry",
  "price": 25000,
  "image": "https://...",
  "createdAt": "2025-03-31T12:00:00Z"
}
```

### 4. Create Payment
```
POST /api/pay

Request Body:
{
  "price": 25000,
  "type": "deposit"
}

Response:
{
  "url": "https://checkout.stripe.com/...",
  "sessionId": "cs_test_..."
}
```

---

## Deposit Calculation Logic

```
if (price < 10,000) {
   deposit = price * 0.075      // 7.5%
}
else if (price < 100,000) {
   deposit = price * 0.05       // 5%
}
else {
   deposit = price * 0.01       // 1%
}

Examples:
$5,000   →  $375   (7.5%)
$20,000  →  $1,000 (5%)
$50,000  →  $2,500 (5%)
$100,000 →  $1,000 (1%)
$200,000 →  $2,000 (1%)
```

---

## Component Tree

```
App
├─ Router
│  ├─ Navigation
│  │  └─ Links to pages
│  │
│  └─ Routes
│     ├─ / (Home)
│     │  └─ CarList
│     │     └─ CarCard[] (mapped from API)
│     │
│     ├─ /car/:id (CarDetails)
│     │  ├─ Car Image
│     │  ├─ Car Info
│     │  ├─ Payment Info
│     │  ├─ Deposit Button
│     │  └─ Buy Now Button
│     │
│     ├─ /sell (SellCar)
│     │  ├─ Title Input
│     │  ├─ Price Input
│     │  ├─ Image URL Input
│     │  ├─ Image Preview
│     │  └─ Submit Button
│     │
│     └─ /success (Success)
│        ├─ Success Icon
│        ├─ Success Message
│        └─ Navigation Buttons
```

---

## Environment Variables

```
Backend (.env):
STRIPE_SECRET_KEY=sk_test_...
FRONTEND_URL=http://localhost:5174
PORT=5000

Frontend:
VITE_API_URL=https://car-dealer-mc48.onrender.com/api
(Hardcoded in components)
```

---

## Error Handling Flow

```
User Action
    │
    ↓
Frontend Validation
    │
    ├─ Success → Send API Request
    │   │
    │   ↓
    │   Backend Validation
    │   │
    │   ├─ Success → Process Request
    │   │   │
    │   │   ↓
    │   │   Return Data (200)
    │   │
    │   └─ Fail → Return Error (400/500)
    │       │
    │       ↓
    │       Show Error Message
    │
    └─ Fail → Show Validation Error
        │
        ↓
        User Sees Error Message
```

---

## Security Layers

```
1. Frontend
   ├─ Input validation
   └─ Error messages

2. Backend
   ├─ Input validation
   ├─ Error handling
   └─ CORS protection

3. Payment
   ├─ Stripe PCI compliance
   ├─ HTTPS only
   └─ No card storage locally
```

---

## Performance Optimization

```
Loading Sequence:
1. HTML loads (instant)
2. React mounts (fast)
3. Router initializes
4. Components render
5. API call for cars (parallel)
6. Images load (lazy)
7. Page interactive

Result: < 2 seconds to interactive
```

---

## Deployment Architecture (Future)

```
Domain: yoursite.com
│
├─ Frontend: Vercel
│  └─ http://yoursite.com
│     React SPA (Static + CDN)
│
├─ Backend: Railway/Render
│  └─ http://api.yoursite.com
│     Node.js API Server
│
└─ External Services
   ├─ Stripe (Payments)
   └─ Database (MongoDB/PostgreSQL)
```

---

This completes your car marketplace MVP architecture! 🚗
