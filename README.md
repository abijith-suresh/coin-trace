
# Coin Trace

**Coin Trace** is a modern platform that allows users to track cryptocurrencies with ease. Built using the latest web technologies, it aims to provide an intuitive and stylish interface for crypto enthusiasts to monitor their favorite coins.

---

## Features

- User authentication powered by [Clerk](https://clerk.com/)  
- Real-time cryptocurrency data fetched from the [CoinGecko API](https://www.coingecko.com/en/api)  
- Responsive UI built with [Next.js 15](https://nextjs.org/), [React 19](https://reactjs.org/), and styled with [Tailwind CSS v4](https://tailwindcss.com/)  
- UI components from [shadcn/ui](https://ui.shadcn.com/) for a polished look  
- Dark mode support  
- Future features planned:  
  - Price alerts  
  - Wishlisting and coin tracking  

---

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)  
- npm or yarn  

### Installation

1. Clone the repo:
   
   ```bash
   git clone https://github.com/abijith-suresh/coin-trace.git
   cd coin-trace
   ```
   
2.  Install dependencies:
    
    ```bash
    npm install
    ``` 
    
3.  Create a `.env` file in the root directory and add your Clerk authentication keys (see `.env.example` for reference):
    
    ```ini
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
    CLERK_SECRET_KEY=sk_test_your_secret_key_here
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
    ```
    
4.  Run the development server:
    
    ```bash
    npm run dev 
    ```
    
5.  Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
    

----------

## Authentication

This app uses Clerk for authentication, so users need to sign in or sign up to access protected features like tracking coins.

----------

## API

Coin Trace fetches cryptocurrency data from CoinGecko’s public API. No API key is required for basic queries.

----------

## Roadmap

-   Implement price alert notifications
-   Enable wishlisting and detailed coin tracking
-   Deploy the app to a live environment
    

----------

## Contributing

Since this is a personal project, contributions are welcome but not expected. Feel free to open issues or submit pull requests.

----------

## License

This project is open source under the MIT License.

----------

_Built with ❤️ using Next.js, React, Clerk, Tailwind CSS, and shadcn/ui._