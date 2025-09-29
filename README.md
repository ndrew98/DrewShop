# GoCart - Modern E-commerce Platform

A full-stack e-commerce application built with Next.js 13+, TypeScript, Prisma, and Clerk authentication.

## 🚀 Features

- **Modern Stack**: Built with Next.js 13+ App Router, TypeScript, and Tailwind CSS
- **Authentication**: Secure user authentication with Clerk
- **Database**: PostgreSQL with Prisma ORM
- **User Management**: Support for buyers and sellers with role-based access
- **Shopping Cart**: Real-time cart management with persistent state
- **Responsive Design**: Mobile-first responsive UI
- **Type Safety**: Full TypeScript implementation
- **Error Handling**: Comprehensive error handling and user feedback

## 🛠️ Tech Stack

- **Frontend**: Next.js 13+, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **State Management**: React Context API

## 📁 Project Structure

```
gocart/
├── app/                    # Next.js 13+ App Router
│   ├── api/               # API routes
│   │   └── user/         # User-related endpoints
│   ├── globals.css       # Global styles
│   └── layout.tsx        # Root layout
├── context/              # React Context providers
│   ├── AppContext.tsx    # Main application context
│   └── types.ts          # TypeScript type definitions
├── prisma/               # Database schema and client
│   └── client.ts         # Prisma client configuration
├── assets/               # Static assets and dummy data
└── components/           # Reusable React components
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Clerk account for authentication

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd gocart
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/gocart"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Application
NEXT_PUBLIC_CURRENCY=$
```

4. **Set up the database**
```bash
npx prisma generate
npx prisma db push
```

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🔧 API Endpoints

### User Management
- `GET /api/user/data` - Fetch authenticated user data and cart items

## 🎯 Key Features Explained

### Authentication Flow
- Uses Clerk for secure authentication
- Supports role-based access (buyer/seller)
- JWT tokens for API authorization

### Shopping Cart
- Real-time cart updates
- Persistent cart state in database
- Calculate totals and item counts

### User Roles
- **Buyer**: Can browse products and manage cart
- **Seller**: Additional access to seller-specific features

## 🧪 Development

### Running Tests
```bash
npm test
```

### Building for Production
```bash
npm run build
```

### Database Operations
```bash
# Generate Prisma client
npx prisma generate

# Push schema changes
npx prisma db push

# View database
npx prisma studio
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🔒 Security

- All API routes are protected with Clerk authentication
- Input validation and sanitization
- Secure database queries with Prisma
- Environment variables for sensitive data

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



## 🚀 Deployment

This application can be deployed on:
- **Vercel** (recommended for Next.js)
- **Railway**
- **Clerk**


Make sure to set up your environment variables in your deployment platform.

---

Built with ❤️ using Next.js and TypeScript -- Andrew