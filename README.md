# Lean Canvas UI

[![CI](https://github.com/CluEleSsUK/lean-canvas-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/CluEleSsUK/lean-canvas-ui/actions/workflows/ci.yml)

An interactive web application for creating and exporting Lean Canvas business plans.

## What is Lean Canvas?

[Lean Canvas](https://leanstack.com/lean-canvas) is a 1-page business plan template created by [Ash Maurya](https://ashmaurya.com/), adapted from Alex Osterwalder's [Business Model Canvas](https://www.strategyzer.com/canvas/business-model-canvas). It helps entrepreneurs deconstruct their ideas into key assumptions and focus on what matters most.

The canvas consists of 9 blocks:

- **Problem** - Top 3 problems your customers face
- **Customer Segments** - Who are your target customers?
- **Unique Value Proposition** - Single, clear message that states why you are different
- **Solution** - Top 3 features that solve the problems
- **Channels** - Path to reach customers
- **Revenue Streams** - How you will make money
- **Cost Structure** - List of all operational costs
- **Key Metrics** - Key activities you measure
- **Unfair Advantage** - Something that cannot easily be copied

Learn more: [Why Lean Canvas vs Business Model Canvas?](https://blog.leanstack.com/why-lean-canvas-vs-business-model-canvas/)

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (comes with Node.js)

## Quickstart

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd lean-canvas-ui
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm start
    ```

4. Open http://localhost:8080 in your browser

## Scripts

| Command                | Description                   |
| ---------------------- | ----------------------------- |
| `npm start`            | Start dev server on port 8080 |
| `npm run build`        | Bundle for production         |
| `npm run typecheck`    | Run TypeScript type checking  |
| `npm run format:fix`   | Format code with Prettier     |
| `npm run format:check` | Check code formatting         |

## Features

- Interactive canvas with editable text areas
- Export canvas as PNG image
- Clean, responsive design
- No server required - runs entirely in the browser

## License

This project is licensed under the [Creative Commons Attribution-Share Alike 3.0 Unported License](LICENSE).

Lean Canvas is adapted from The Business Model Canvas by Alexander Osterwalder and licensed under CC BY-SA 3.0. Lean Canvas is a trademark of Spark59, Inc.
