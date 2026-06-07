# Hill Cipher Simulator

Another fucking matrix encryption toy. Because my linear algebra professor demanded a "final project."

This is a half-assed but working Hill Cipher implementation. Encrypt text, decrypt text, watch numbers do their thing. Nothing more, nothing less. Don't expect updates, maintenance, or me giving a shit after submission.

> Live Demo: [alin.arrafif.com](https://alin.arrafif.com)

## What The Hell Is This

Hill Cipher is a polygraphic substitution cipher that uses matrix multiplication to encrypt plaintext. If you don't know what that means, maybe take a linear algebra class first.

This project was built as a final assignment for a Linear Algebra course demonstrating how matrices actually get applied in the real world (cryptography, in this case). Don't expect this to be production-grade encryption software. It's not. Don't use it to secure your secrets.

### Key features:

- Encrypt plaintext using a key matrix
- Decrypt ciphertext back to plaintext
- Step-by-step process log so you can actually see what's happening under the hood

## Requirements

You need Bun. Not npm. Not yarn. Bun.

If you don't have it:

```bash
curl -fsSL https://bun.sh/install | bash
```

## Getting Started

```bash
# Clone it
git clone https://github.com/rafiarrafif/hill-cipher-simulator.git
cd hill-cipher-simulator

# Install dependencies
bun install

# Run dev server
bun run dev
```

Open your browser. You know what to do.

## Build

```bash
bun run build
```

Output goes to `dist/`.

## Tech Stack

- TypeScript
- Vite
- React (UI)
- Tailwind CSS (styling)

## License

MIT. Do whatever you want with it. Just don't blame me if something breaks.

## Contributing

This project is done. It fulfilled its academic purpose. That said, if you find a bug that genuinely bothers you, pull requests are open. No promises on response time.

> _Built for Linear Algebra Universitas Sebelas Maret · Not maintained beyond submission day._
