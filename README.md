# Mini-React16.8

A minimal React-like library built from scratch, demonstrating the core concepts of React 16.8, including hooks, reconciliation, and a simple component system. This project is designed for learning and experimentation, providing a foundation for understanding how React works under the hood.

## Features

- **Custom React Core**: Implements a basic version of React's core API in `src/core/React.js` and `src/core/ReactDOM.js`.
- **Hooks System**: Includes a simple hooks implementation (`useState`, etc.) in `src/core/hooks.js`.
- **Reconciliation**: Demonstrates a basic reconciliation algorithm in `src/core/reconciler.js`.
- **Component System**: Supports functional components, with examples in `src/components/`.
- **Examples**: Contains example usage and tests in `src/example/` (e.g., `stateTest.js`, `reconciliationTest.js`).
- **Vite Setup**: Uses Vite for fast development and hot module replacement.

## Project Structure

```
Mini-React16.8/
├── index.html                # Entry HTML file
├── package.json              # Project metadata and scripts
├── public/
│   └── vite.svg              # Static assets
├── src/
│   ├── main.js               # App entry point
│   ├── style.css             # Global styles
│   ├── components/
│   │   ├── index.js          # Component exports
│   │   └── src/
│   │       └── counter.js    # Example component
│   ├── core/
│   │   ├── hooks.js          # Custom hooks implementation
│   │   ├── index.js          # Core exports
│   │   ├── React.js          # React-like API
│   │   ├── ReactDOM.js       # DOM rendering logic
│   │   └── reconciler.js     # Reconciliation logic
│   └── example/
│       ├── reconciliationTest.js # Reconciliation test/demo
│       └── stateTest.js          # State management test/demo
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Run the development server**:
   ```bash
   npm run dev
   ```
3. **Open** `http://localhost:5173` in your browser to view the app.

## How It Works

- The core logic mimics React's rendering and update cycle.
- Hooks like `useState` are implemented to manage state in functional components.
- The reconciliation algorithm updates the DOM efficiently when state changes.
- Example components and tests show how to use the custom API.

## Roadmap / Future Plans

- Add more hooks: `useEffect`, `useContext`, and others.
- Improve reconciliation to support more complex scenarios.
- Add support for context and side effects.
- Expand example components and documentation.
- Add unit tests and benchmarks.

## Contributing

Pull requests and suggestions are welcome! This project is for educational purposes, so feel free to experiment and extend it.

## License

MIT
