# Hill Cipher Simulator

A simple matrix-based encryption simulator built to demonstrate how the Hill Cipher works. Created as a final project for a Linear Algebra course.

> Live Demo: [alin.arrafif.com](https://alin.arrafif.com)

## What Is This

Hill Cipher is a classical polygraphic substitution cipher that uses matrix multiplication to encrypt plaintext.

This project demonstrates how linear algebra concepts can be applied to cryptography through a simple web application. It is intended for educational purposes and is **not** designed for real-world security.

### Key Features

* Encrypt plaintext using a key matrix
* Decrypt ciphertext back to plaintext
* Step-by-step process log to visualize each stage of the algorithm

## Requirements

This project uses **Bun** as its runtime and package manager.

If you don't have it installed:

```bash
curl -fsSL https://bun.sh/install | bash
```

## Getting Started

```bash
# Clone the repository
git clone https://github.com/rafiarrafif/hill-cipher-simulator.git
cd hill-cipher-simulator

# Install dependencies
bun install

# Start the development server
bun run dev
```

Open the application in your browser.

## Build

```bash
bun run build
```

The production build will be generated in the `dist/` directory.

## Tech Stack

* TypeScript
* Vite
* React
* Tailwind CSS

## License

This project is licensed under the MIT License.

## Contributing

This project was created to fulfill an academic assignment and is not under active development. However, bug reports, suggestions, and pull requests are always welcome.

> *Built for the Linear Algebra course at Universitas Sebelas Maret.*
