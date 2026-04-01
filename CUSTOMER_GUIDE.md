# 🚗 Car Marketplace - Customer Guide

## What is This?

A simple, fast car marketplace where you can:
- **Browse** available cars
- **View** detailed car information
- **Reserve** a car with a deposit
- **Buy** a car with full payment
- All payments are secure through Stripe

---

## 🏠 Getting Started

1. Open your browser to: **http://localhost:5174**
2. You'll see the Car Marketplace homepage
3. All available cars are displayed as cards

---

## 📋 Homepage - Browse Cars

### What You See
- **Car Image**: Visual preview of the vehicle
- **Car Name**: Make, model, and year (e.g., "2020 Toyota Camry")
- **Price**: Full asking price in USD
- **Listed Date**: When the car was added
- **View Details Button**: Click to see more info and payment options

### What You Can Do
- Scroll through available cars
- Click any car card to view full details
- Click "View Details" button to proceed to purchase

---

## 🔍 Car Details Page

When you click on a car, you'll see:

### Left Side (Desktop)
- Large car image
- Full quality preview
- Placeholder if image fails to load

### Right Side (Desktop)
- **Car Title**: Full name and year
- **Full Price**: The asking price
- **Listed Date**: Publication date
- **Payment Information Section**:
  - Full Payment amount
  - Deposit amount (with percentage)

---

## 💳 Payment Options

### Option 1: Reserve with Deposit

**Perfect for:** When you want to secure a car without paying the full amount

**How it works:**
- Pay a percentage of the car price
- Amount depends on the car price:
  - Cars under $10,000: Pay **7.5%**
  - Cars $10,000-$99,999: Pay **5%**
  - Cars $100,000+: Pay **1%**

**Example:**
- Car price: $25,000
- Deposit (5%): **$1,250**
- After paying, you can arrange the rest with the seller

**To Reserve:**
1. Click "Reserve with Deposit" button
2. You'll be taken to Stripe Checkout
3. Enter your card details
4. Complete payment
5. See success confirmation

### Option 2: Buy Now (Full Payment)

**Perfect for:** When you want to purchase immediately

**How it works:**
- Pay the full car price
- Drive away with the car (arrangement with seller)

**To Buy:**
1. Click "Buy Now" button
2. You'll be taken to Stripe Checkout
3. Enter your card details for the full amount
4. Complete payment
5. See success confirmation

---

## 💰 Payment Example Walkthrough

### Scenario: Buying a $25,000 Car

#### Step 1: Choose Payment Type
On the car details page, you have two options:
- Reserve with Deposit: $1,250 (5%)
- Buy Now: $25,000 (full)

#### Step 2: Click Your Choice
Let's say you choose "Reserve with Deposit"

#### Step 3: Stripe Checkout Opens
- A new window opens with Stripe Checkout
- You'll see a summary:
  - Item: "Car Deposit"
  - Amount: $1,250

#### Step 4: Enter Payment Information
- Email: Your email address
- Card number: 4242 4242 4242 4242 (for testing)
- Expiry: 12/25 or any future date
- CVC: 123 (any 3 digits)

#### Step 5: Payment Confirmation
- After clicking "Pay", you'll see "Payment successful"
- You'll be automatically redirected to the success page

#### Step 6: Success Page
- Green checkmark with "Payment Successful!"
- Message: "Thank you for your payment..."
- Buttons to:
  - Go back to home
  - List another car

---

## 🧪 Testing the Platform

### Test Cards (For Stripe)
Stripe provides test cards you can use:

| Scenario | Card Number | Expiry | CVC |
|----------|-----------|--------|-----|
| Successful Payment | 4242 4242 4242 4242 | 12/25 | 123 |
| Declined Card | 4000 0000 0000 0002 | 12/25 | 123 |
| Requires Auth | 4000 0025 0000 3155 | 12/25 | 123 |

### Test Purchase Flow
1. Go to Home page
2. If no cars exist, go to "Sell Car" (admin) to add one
3. Return to Home and click a car
4. Choose "Reserve with Deposit" or "Buy Now"
5. Use test card 4242 4242 4242 4242
6. Complete payment
7. See success page

---

## ✅ After Payment

### Immediate
- You'll be redirected to the success page
- You'll see "Payment Successful" confirmation
- Check your email for receipt

### Next Steps
- Contact the seller to arrange pickup/delivery
- Confirm financing or remaining payment (if you chose deposit)
- Arrange insurance and registration

---

## 🚨 What If Something Goes Wrong?

### Payment Declined
- Check your card details
- Ensure date is correct (MM/YY format)
- Try a different card
- Or use test card: 4242 4242 4242 4242

### Page Doesn't Load Cars
- Check your internet connection
- Refresh the page
- Make sure the backend is running

### Image Doesn't Show
- The seller may have provided an invalid image URL
- A placeholder image will display instead
- You can still purchase the car

### Payment Timed Out
- Your session expired
- Go back and try again
- Contact the seller if you need help

---

## 🎯 Quick Tips

✓ **Deposit is Safer**: If unsure about a car, reserve with deposit first
✓ **Read Descriptions**: Make sure it's the right car before buying
✓ **Test Payment First**: Use test cards to understand the process
✓ **Save Receipt**: Email receipt arrives after payment
✓ **Contact Seller**: Get contact info from listing page

---

## 📱 Mobile Experience

✓ Mobile-friendly design
✓ Touch-friendly buttons
✓ All features work on phone
✓ Responsive images
✓ Easy navigation

---

## 🆘 Need Help?

### Common Questions

**Q: Can I change my payment after submitting?**
A: No, payment is immediate. You can contact the seller to discuss arrangements.

**Q: What if the car is sold?**
A: The seller removes the listing. Check the homepage for available cars.

**Q: Can I get a refund?**
A: Contact the seller. Refunds depend on payment method and seller policy.

**Q: Is my payment secure?**
A: Yes! All payments are processed through Stripe, a trusted payment processor.

**Q: Can I make an offer lower than the listed price?**
A: Not through this platform. Contact the seller directly to negotiate.

---

## 🔐 Security & Privacy

✓ Payments encrypted with Stripe
✓ No credit card data stored locally
✓ HTTPS for all transactions
✓ Your billing info protected
✓ Email confirmations for tracking

---

## 🎉 Enjoy Shopping!

Happy car hunting! Find your perfect vehicle and complete your purchase securely.

---

**Still Have Questions?** Check the main [SETUP_GUIDE.md](./SETUP_GUIDE.md) for technical details.
