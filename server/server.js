import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5174';

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage
let cars = [];
let carIdCounter = 1;

// ===== ROUTES =====

// GET all cars
app.get('/api/cars', (req, res) => {
  res.json(cars);
});

// POST new car
app.post('/api/cars', (req, res) => {
  const { title, price, image } = req.body;

  if (!title || !price || !image) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newCar = {
    id: carIdCounter++,
    title,
    price: parseFloat(price),
    image,
    createdAt: new Date(),
  };

  cars.push(newCar);
  res.status(201).json(newCar);
});

// GET single car by ID
app.get('/api/cars/:id', (req, res) => {
  const car = cars.find((c) => c.id === parseInt(req.params.id));
  if (!car) {
    return res.status(404).json({ error: 'Car not found' });
  }
  res.json(car);
});

// POST payment handler
app.post('/api/pay', async (req, res) => {
  try {
    const { price, type } = req.body;

    if (!price || !type) {
      return res.status(400).json({ error: 'Missing price or type' });
    }

    let amountToPay = price;

    // Calculate deposit based on price
    if (type === 'deposit') {
      if (price < 10000) {
        amountToPay = price * 0.075; // 7.5%
      } else if (price < 100000) {
        amountToPay = price * 0.05; // 5%
      } else {
        amountToPay = price * 0.01; // 1%
      }
    }

    // Convert to cents for Stripe
    const amountInCents = Math.round(amountToPay * 100);

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Car ${type === 'deposit' ? 'Deposit' : 'Purchase'}`,
              description: `${type === 'deposit' ? 'Deposit' : 'Full Payment'} for car`,
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${FRONTEND_URL}/success`,
      cancel_url: `${FRONTEND_URL}/`,
    });

    res.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server running', cars: cars.length });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚗 Car Marketplace Backend running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});
