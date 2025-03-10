# TypeSafe Blog

A fully type-validated static React blog with Auth0 authentication, Stripe payments, and markdown+math rendering capabilities.

## Project Structure

```
/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── layout/       # Layout components like Header, Footer
│   │   ├── blog/         # Blog-specific components
│   │   ├── auth/         # Auth0-related components
│   │   └── payments/     # Stripe payment components
│   ├── content/          # Blog content
│   │   ├── simple/       # Free blog posts
│   │   └── premium/      # Premium (paid) blog posts
│   ├── hooks/            # Custom React hooks
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── pages/            # Page components
│   ├── context/          # React contexts
│   ├── App.tsx           # Main App component
│   └── main.tsx          # Entry point
├── public/               # Static assets
├── index.html            # HTML template
├── tsconfig.json         # TypeScript configuration
├── package.json          # Dependencies and scripts
├── vite.config.ts        # Vite configuration
└── README.md             # Project documentation
```

## Features

- 🔒 Secure authentication with Auth0
- 💰 Payment processing with Stripe
- 📝 Markdown blog posts with MDX
- 🧮 Math equation rendering with KaTeX
- 📱 Responsive design
- 🔐 Premium content behind a paywall
- 🚀 Fast, static deployment on CloudFront


## Deps Needed
```
npm install react-helmet-async
npm install --save-dev vite-plugin-mdx
```