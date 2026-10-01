# ⚡ ToolsHub — High-Performance Online Developer & Media Utility Suite

![ToolsHub Banner](https://img.shields.io/badge/ToolsHub-v1.0-orange?style=for-the-badge&logo=next.js)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?style=for-the-badge&logo=typescript)

**ToolsHub** is a state-of-the-art, 100% free online developer, media, and productivity toolkit. Designed with a sleek dark aesthetic and vibrant orange/amber gradients, ToolsHub delivers client-side speed, privacy, and precision for over **20+ essential utilities**.

---

## ✨ Features & Highlights

- 🔒 **100% Private & Browser-First**: Sensitive calculations, cryptographic hashing, PDF manipulation, and AI background removal run locally in WebAssembly/Web Crypto without uploading your private files to third-party servers.
- ⚡ **Blazing Fast Performance**: Instant client-side processing with zero server queues.
- 🎨 **Modern Dark UI**: Carefully crafted design system featuring glassmorphism, fluid micro-interactions, responsive category dropdowns, and keyboard-friendly quick search.
- 🤖 **Client-Side AI Machine Learning**: In-browser background removal using `@imgly/background-removal` (ONNX WASM execution).
- 📱 **Fully Responsive**: Seamless performance on desktop, tablet, and mobile browsers.

---

## 🛠️ Tool Catalog

ToolsHub is organized into 6 focused categories:

### 📄 1. PDF & Document Tools
- **Merge PDF**: Combine multiple PDF files into one clean document with instant drag-and-drop ordering.
- **Split PDF**: Extract specific page ranges or split entire documents into single-page PDFs.

### 🖼️ 2. Image & Media Tools
- **Image Background Remover (AI)**: Remove backgrounds from photos automatically using browser WASM neural networks with an interactive before/after slider.
- **Compress Image**: Reduce image sizes up to 90% (JPG, PNG, WebP) with live visual quality and file size controls.
- **Image Format Converter**: Convert images between JPG, PNG, WebP, and SVG with transparency retention.
- **QR Code Generator**: Create customizable vector & PNG QR codes for URLs, WiFi credentials, plain text, and emails.
- **Color Converter & Palette**: Convert between HEX, RGB, HSL, HSV, and CMYK with WCAG 2.1 contrast ratio analysis.

### 📝 3. Text & Content Tools
- **Remove Duplicate Lines**: Deduplicate email lists, URLs, or text dumps with case sensitivity toggles and alphabetical sorting.
- **Keyword Density Checker**: Analyze word frequencies, 1/2/3-word n-gram density, and SEO stop words.
- **Word & Character Counter**: Real-time counter with character counts, reading/speaking time, and social media limits (X/Twitter, LinkedIn, IG).
- **Case Converter**: Convert text strings into UPPERCASE, lowercase, Title Case, camelCase, snake_case, and kebab-case.
- **Password Strength & Generator**: Analyze password entropy, estimate brute-force time-to-crack, and generate secure random passwords.

### 💻 4. Developer & Code Tools
- **JSON ⟷ CSV Converter**: Two-way structured data parser with live interactive table preview and JSON schema validation.
- **HTML Minifier & Beautifier**: Compress markup by removing blank lines and comments, or format messy HTML into clean code.
- **Crypto Hash Generator**: Generate SHA-256, SHA-512, SHA-384, SHA-1, and MD5 hashes using the native Web Cryptography API.
- **Base64 Encoder & Decoder**: Encode and decode UTF-8 strings, data URLs, and images to/from Base64.
- **URL Encoder & Decoder**: RFC-3986 percent encoding/decoding with interactive query string builder.
- **UUID / GUID Generator**: Bulk generate cryptographically random UUID v4 identifiers (up to 500 at once).

### 🧮 5. Calculators & Math
- **Percentage Calculator**: Compute percentages of numbers, percentage change, and ratios.
- **Discount & Sales Calculator**: Calculate final prices, savings, extra coupons, and sales tax.
- **Loan & EMI Calculator**: Compute monthly mortgage/loan payments (EMI), total interest, and annual amortization schedules.

### 🔮 6. AI Productivity Tools
- **AI Text Rewriter & Paraphraser**: Rephrase sentences into Professional, Creative, Concise, Casual, or Academic tones.
- **AI Article Summarizer**: Distill long articles, notes, or papers into key bullet points or executive TL;DRs.

---

## 🏗️ Architecture & Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Components & Dynamic Client Imports)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + Custom HSL Design Tokens
- **Icons**: [Lucide React](https://lucide.dev/)
- **AI Machine Learning**: `@imgly/background-removal` (ONNX WASM) & `onnxruntime-web`
- **PDF Engine**: `pdf-lib`
- **Celebrations**: `canvas-confetti`

```
ToolsHub/
├── frontend/                  # Next.js 14 Web Application
│   ├── src/
│   │   ├── app/               # App Router pages and API routes
│   │   │   ├── tools/         # Interactive tool pages & client components
│   │   │   ├── globals.css    # Custom dark color tokens & animations
│   │   │   └── layout.tsx     # Root layout with Navbar & Footer
│   │   ├── components/        # ToolLayout, Navbar, Footer, CategoryCards
│   │   ├── data/              # Tools metadata catalog & categories
│   │   ├── lib/               # Utility functions & formatters
│   │   └── types/             # TypeScript definitions
│   ├── public/                # Static assets & icons
│   └── next.config.mjs        # WASM Webpack configuration
└── backend/                   # Optional backend services / APIs
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/imzainmalik/ToolsHub.git
   cd ToolsHub/frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to view ToolsHub in action!

---

## 🔒 Security & Privacy

Privacy is a core design principle of ToolsHub. All client-side tools run strictly inside the user's browser runtime. Uploaded files, generated hashes, passwords, and PDF documents are **never stored** or saved to any external disk.

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ for developers, creators, and digital professionals worldwide.
</p>
