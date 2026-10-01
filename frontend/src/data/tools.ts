import { ToolItem, CategoryMeta, ToolCategory } from '@/types/tool';
export type { ToolCategory, ToolItem, CategoryMeta };

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'pdf',
    name: 'PDF & Document Tools',
    tagline: 'Merge, split, and manipulate PDF documents securely',
    description: 'Lightning-fast client and server processing for all your document tasks without losing quality.',
    iconName: 'FileText',
    gradient: 'from-orange-500 to-amber-600',
    badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20'
  },
  {
    id: 'image',
    name: 'Image & Media Tools',
    tagline: 'Compress, convert, and generate visual assets',
    description: 'Optimize file sizes, convert image formats, and generate QR codes instantly in your browser.',
    iconName: 'Image',
    gradient: 'from-amber-500 to-yellow-600',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
  },
  {
    id: 'text',
    name: 'Text & Content Tools',
    tagline: 'Clean, format, inspect, and analyze written content',
    description: 'Remove duplicates, analyze keyword density, count characters, and change cases effortlessly.',
    iconName: 'Type',
    gradient: 'from-orange-600 to-rose-600',
    badgeColor: 'bg-orange-600/10 text-orange-300 border-orange-600/20'
  },
  {
    id: 'developer',
    name: 'Developer & Code Tools',
    tagline: 'Formatters, converters, encoders, and cryptographic hashes',
    description: 'Essential utilities for programmers, web developers, and sysadmins. High performance & safe.',
    iconName: 'Code2',
    gradient: 'from-amber-600 to-orange-500',
    badgeColor: 'bg-amber-600/10 text-amber-400 border-amber-600/20'
  },
  {
    id: 'calculators',
    name: 'Calculators & Math',
    tagline: 'Fast and accurate financial and percentage calculations',
    description: 'Compute discounts, loan EMIs, percentages, and financial metrics in real time.',
    iconName: 'Calculator',
    gradient: 'from-orange-500 to-red-500',
    badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20'
  },
  {
    id: 'ai',
    name: 'AI Productivity Tools',
    tagline: 'Smart assistants to rewrite, summarize, and enhance text',
    description: 'Harness intelligent text transformation to boost your workflow and polish articles.',
    iconName: 'Sparkles',
    gradient: 'from-amber-500 via-orange-500 to-rose-500',
    badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
  }
];

export const TOOLS: ToolItem[] = [
  // 1. PDF Tools
  {
    id: 'merge-pdf',
    slug: 'merge-pdf',
    name: 'Merge PDF',
    shortDescription: 'Combine multiple PDF files into one clean document with instant drag-and-drop.',
    description: 'Easily merge two or more PDF files into a single consolidated document. Reorder pages, upload with drag and drop, and download instantly without watermarks.',
    category: 'pdf',
    categoryName: 'PDF & Document Tools',
    iconName: 'Files',
    badge: 'Popular',
    featured: true,
    tags: ['pdf', 'merge', 'combine', 'documents', 'join pdf'],
    features: [
      'Multi-file drag and drop support',
      'Drag to reorder uploaded files',
      'Instant client & server hybrid processing',
      '100% private - files not stored',
      'Preserves original quality and bookmarks'
    ],
    faq: [
      {
        question: 'Is there a file size limit for merging PDFs?',
        answer: 'You can merge PDFs up to 50MB in total size completely free with zero restrictions.'
      },
      {
        question: 'Are my uploaded PDF files safe and private?',
        answer: 'Yes, all processing is done either directly inside your browser or securely in temporary memory and immediately purged.'
      }
    ]
  },
  {
    id: 'split-pdf',
    slug: 'split-pdf',
    name: 'Split PDF',
    shortDescription: 'Extract pages or split a PDF file into separate single-page documents.',
    description: 'Separate single or multiple pages from your PDF file. Download individual pages or split specific page ranges with instant client-side rendering.',
    category: 'pdf',
    categoryName: 'PDF & Document Tools',
    iconName: 'Scissors',
    badge: 'Updated',
    featured: true,
    tags: ['pdf', 'split', 'extract pages', 'cut pdf'],
    features: [
      'Extract every page into individual PDFs',
      'Extract custom page ranges (e.g., 1-5, 8, 11-14)',
      'Instant in-browser split with zero server upload',
      'Live page count and preview'
    ],
    faq: [
      {
        question: 'Can I select which pages to extract?',
        answer: 'Yes, you can split all pages at once or specify exact ranges to extract only what you need.'
      }
    ]
  },

  // 2. Image Tools
  {
    id: 'compress-image',
    slug: 'compress-image',
    name: 'Compress Image',
    shortDescription: 'Reduce image file size up to 90% while retaining high visual quality.',
    description: 'Powerful image compressor supporting JPEG, PNG, and WebP formats. Fine-tune quality sliders, see before/after file sizes, and optimize for web performance.',
    category: 'image',
    categoryName: 'Image & Media Tools',
    iconName: 'Minimize2',
    badge: 'Popular',
    featured: true,
    tags: ['compress', 'image', 'optimize', 'jpg', 'png', 'webp', 'reduce size'],
    features: [
      'Adjustable compression quality slider (1-100%)',
      'Side-by-side file size savings comparison',
      'Support for JPG, PNG, and WebP formats',
      'Rotation and resizing controls',
      'Fast client-side canvas compression'
    ],
    faq: [
      {
        question: 'Does compression ruin image quality?',
        answer: 'No, our smart compression removes invisible metadata and optimizes pixel density while preserving crisp visual fidelity.'
      }
    ]
  },
  {
    id: 'image-converter',
    slug: 'image-converter',
    name: 'Image Format Converter',
    shortDescription: 'Convert images between JPG, PNG, WebP, SVG, and GIF formats instantly.',
    description: 'Transform images between multiple popular formats seamlessly. High speed, no loss of transparency for PNG/WebP, and instant download.',
    category: 'image',
    categoryName: 'Image & Media Tools',
    iconName: 'RefreshCw',
    badge: 'New',
    featured: true,
    tags: ['convert', 'image format', 'png to jpg', 'webp converter', 'jpg to png'],
    features: [
      'Convert to JPG, PNG, WebP, or SVG',
      'Batch image conversion',
      'Preserve transparency channel',
      'Instant download without queue'
    ],
    faq: [
      {
        question: 'Can I convert transparent PNGs to JPG?',
        answer: 'Yes! When converting PNG to JPG, transparent areas are cleanly filled with a white background.'
      }
    ]
  },
  {
    id: 'qr-code-generator',
    slug: 'qr-code-generator',
    name: 'QR Code Generator',
    shortDescription: 'Generate custom high-resolution QR codes for URLs, WiFi, text, and vCards.',
    description: 'Create customizable QR codes with custom colors, sizing, error correction levels, and instant PNG/SVG download.',
    category: 'image',
    categoryName: 'Image & Media Tools',
    iconName: 'QrCode',
    badge: 'Popular',
    featured: true,
    tags: ['qr', 'qr code', 'generator', 'barcode', 'wifi qr', 'url qr'],
    features: [
      'Custom foreground and background colors',
      'Support for URLs, Plain Text, WiFi credentials, Email, and Phone',
      'Selectable resolution up to 1024px',
      'High error correction options',
      'Download as PNG or SVG vector'
    ],
    faq: [
      {
        question: 'Do the generated QR codes expire?',
        answer: 'Never! These are static QR codes that point directly to your content and will work forever.'
      }
    ]
  },
  {
    id: 'color-converter',
    slug: 'color-converter',
    name: 'Color Converter & Palette',
    shortDescription: 'Convert between HEX, RGB, HSL, and CMYK with color palette generator.',
    description: 'Professional color conversion tool with interactive color picker, luminance contrast checker, complementary color harmonic generator, and CSS code copy.',
    category: 'image',
    categoryName: 'Image & Media Tools',
    iconName: 'Palette',
    badge: 'New',
    tags: ['color', 'hex to rgb', 'hsl', 'cmyk', 'palette', 'designer'],
    features: [
      'Instant multi-format sync (HEX, RGB, HSL, HSV, CMYK)',
      'Visual interactive color picker & slider',
      'Harmonic palette generation (Triadic, Complementary, Analogous)',
      'WCAG 2.1 Contrast ratio analysis',
      'One-click CSS variable copy'
    ],
    faq: [
      {
        question: 'Is this suitable for web accessibility testing?',
        answer: 'Yes, it provides exact WCAG contrast ratios against dark and light text backgrounds.'
      }
    ]
  },
  {
    id: 'background-remover',
    slug: 'background-remover',
    name: 'Image Background Remover',
    shortDescription: 'Remove backgrounds from photos instantly with AI-powered edge detection.',
    description: 'Automatically remove backgrounds from portraits, product photos, and graphics. Uses intelligent edge detection for precise cutouts with transparent PNG output.',
    category: 'image',
    categoryName: 'Image & Media Tools',
    iconName: 'Eraser',
    badge: 'New',
    featured: true,
    tags: ['background remover', 'remove bg', 'transparent', 'cutout', 'png', 'image editing'],
    features: [
      'AI-powered automatic background detection',
      'Clean edge detection for precise cutouts',
      'Transparent PNG output download',
      'Works with portraits, products, logos, and graphics',
      'Adjustable tolerance and brush refine tools'
    ],
    faq: [
      {
        question: 'What types of images work best?',
        answer: 'Images with clear contrast between the subject and background work best. Portraits, product photos, and logos produce the cleanest results.'
      },
      {
        question: 'What format is the output?',
        answer: 'The output is always a transparent PNG file, perfect for use in presentations, websites, and design projects.'
      }
    ]
  },

  // 3. Text & Content Tools
  {
    id: 'remove-duplicate-lines',
    slug: 'remove-duplicate-lines',
    name: 'Remove Duplicate Lines',
    shortDescription: 'Clean lists and text by stripping out repeated lines with advanced sorting.',
    description: 'Instantly remove redundant duplicate entries from text files, email lists, URLs, or data dumps. Offers case sensitivity toggles, whitespace trimming, and alphabetical sorting.',
    category: 'text',
    categoryName: 'Text & Content Tools',
    iconName: 'ListFilter',
    badge: 'Popular',
    featured: true,
    tags: ['text', 'duplicate', 'dedupe', 'clean list', 'remove duplicates', 'unique lines'],
    features: [
      'Real-time line counter & duplicate removal metric',
      'Case-sensitive or case-insensitive matching',
      'Auto-trim leading and trailing whitespaces',
      'Sort alphabetically (A-Z or Z-A) or maintain original order',
      'One-click copy and clean text export'
    ],
    faq: [
      {
        question: 'Can I handle lists with thousands of lines?',
        answer: 'Yes, our client-side engine easily processes lists of 50,000+ lines in milliseconds.'
      }
    ]
  },
  {
    id: 'keyword-density-checker',
    slug: 'keyword-density-checker',
    name: 'Keyword Density Checker',
    shortDescription: 'Analyze word count, frequency, and 1/2/3-word phrase density for SEO.',
    description: 'Comprehensive SEO text analysis tool. Identify top recurring keywords, calculate exact percentages, detect over-optimization, and filter out common stop words.',
    category: 'text',
    categoryName: 'Text & Content Tools',
    iconName: 'BarChart3',
    badge: 'Updated',
    featured: true,
    tags: ['seo', 'keyword', 'density', 'word count', 'frequency', 'content analysis'],
    features: [
      'Top 1-word, 2-word, and 3-word n-gram analysis',
      'Ignore common stop words (the, is, at, which, etc.) toggle',
      'Total words, unique words, and density percentage breakdown',
      'Interactive visual distribution charts',
      'SEO over-optimization warnings'
    ],
    faq: [
      {
        question: 'What is an ideal keyword density for SEO?',
        answer: 'Most SEO specialists recommend keeping your main target keyword density between 1% and 2.5% to avoid keyword stuffing penalties.'
      }
    ]
  },
  {
    id: 'word-counter',
    slug: 'word-counter',
    name: 'Word & Character Counter',
    shortDescription: 'Count words, characters, sentences, paragraphs, and estimate reading time.',
    description: 'Advanced real-time word counter with metrics for character count (with & without spaces), reading time, speaking duration, reading level, and social media character limits.',
    category: 'text',
    categoryName: 'Text & Content Tools',
    iconName: 'FileSpreadsheet',
    badge: 'New',
    tags: ['word counter', 'character count', 'reading time', 'content length'],
    features: [
      'Real-time live metric cards (Words, Chars, Sentences, Paragraphs)',
      'Estimated reading & speaking time computation',
      'Social media counters (Twitter/X, Facebook, LinkedIn, Instagram)',
      'Average word length and sentence complexity analysis'
    ],
    faq: [
      {
        question: 'How is reading time estimated?',
        answer: 'We calculate reading time based on the standard average adult reading speed of 225 words per minute.'
      }
    ]
  },
  {
    id: 'case-converter',
    slug: 'case-converter',
    name: 'Case Converter',
    shortDescription: 'Switch text between UPPERCASE, lowercase, Title Case, camelCase, snake_case.',
    description: 'Easily transform your text strings into any format: Sentence case, lower case, UPPER CASE, Capitalized Case, camelCase, PascalCase, snake_case, and kebab-case.',
    category: 'text',
    categoryName: 'Text & Content Tools',
    iconName: 'CaseSensitive',
    badge: 'New',
    tags: ['case converter', 'uppercase', 'camelcase', 'snake_case', 'title case'],
    features: [
      '8+ conversion modes at the click of a button',
      'Sentence case and AP style Title Case support',
      'Developer casings: camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE',
      'Instant copy to clipboard with animation'
    ],
    faq: [
      {
        question: 'Does this work with code variables?',
        answer: 'Yes! It effortlessly parses spaced text or existing camelCase into snake_case and kebab-case.'
      }
    ]
  },
  {
    id: 'password-strength-checker',
    slug: 'password-strength-checker',
    name: 'Password Strength & Generator',
    shortDescription: 'Evaluate password entropy, time-to-crack, and generate ultra-secure passwords.',
    description: 'Inspect password vulnerabilities, calculate theoretical brute-force crack time, test against common patterns, and generate high-entropy randomized passwords.',
    category: 'text',
    categoryName: 'Text & Content Tools',
    iconName: 'ShieldCheck',
    badge: 'Popular',
    featured: true,
    tags: ['password', 'security', 'strength', 'entropy', 'generator', 'crack time'],
    features: [
      'Zxcvbn-style entropy scoring & brute-force time calculation',
      'Checklist for uppercase, lowercase, numbers, symbols, length',
      'Secure customizable password generator with symbol toggles',
      '100% private client evaluation (passwords never leave your computer)'
    ],
    faq: [
      {
        question: 'Is it safe to test my password here?',
        answer: 'Yes! All calculations run purely inside your browser JavaScript. Nothing is ever transmitted over the network.'
      }
    ]
  },

  // 4. Developer & Code Tools
  {
    id: 'json-csv-converter',
    slug: 'json-csv-converter',
    name: 'JSON ⟷ CSV Converter',
    shortDescription: 'Convert JSON to CSV and CSV to JSON with table preview and validation.',
    description: 'Seamless two-way converter for structured data. Parse JSON arrays into clean CSV spreadsheets or transform raw CSV/TSV data into formatted JSON with syntax highlighting.',
    category: 'developer',
    categoryName: 'Developer & Code Tools',
    iconName: 'ArrowLeftRight',
    badge: 'Popular',
    featured: true,
    tags: ['json', 'csv', 'converter', 'developer', 'table', 'json to csv', 'csv to json'],
    features: [
      'Bi-directional conversion (JSON to CSV & CSV to JSON)',
      'Live interactive data table viewer',
      'Auto-detect delimiters (comma, semicolon, tab)',
      'JSON schema validation with descriptive error hints',
      'Export and download as .csv or .json file'
    ],
    faq: [
      {
        question: 'Does it support nested JSON objects?',
        answer: 'Yes, nested properties are automatically flattened into dot notation headers (e.g. user.address.city).'
      }
    ]
  },
  {
    id: 'html-minifier',
    slug: 'html-minifier',
    name: 'HTML Minifier & Beautifier',
    shortDescription: 'Minify HTML code to reduce file size or beautify with clean indentations.',
    description: 'Optimize HTML source code for faster web performance by stripping redundant whitespace, comments, and empty attributes, or beautify messy HTML for readability.',
    category: 'developer',
    categoryName: 'Developer & Code Tools',
    iconName: 'Code',
    badge: 'Updated',
    tags: ['html', 'minify', 'beautify', 'format', 'compress html', 'developer'],
    features: [
      'Minification and Beautification modes',
      'Strip HTML/JS comments toggle',
      'Remove blank lines and redundant spaces',
      'Savings metric calculator with byte reduction',
      'One-click copy formatted code'
    ],
    faq: [
      {
        question: 'Will minifying HTML break inline JavaScript or CSS?',
        answer: 'No, our parser safely preserves inline script and style tags while compressing the surrounding markup.'
      }
    ]
  },
  {
    id: 'hash-generator',
    slug: 'hash-generator',
    name: 'Hash Generator (Crypto)',
    shortDescription: 'Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes in real-time.',
    description: 'Instant cryptographic hash generator powered by the Web Cryptography API. Compute secure checksums for passwords, verification tokens, and text payloads.',
    category: 'developer',
    categoryName: 'Developer & Code Tools',
    iconName: 'Binary',
    badge: 'Popular',
    featured: true,
    tags: ['hash', 'crypto', 'sha256', 'sha512', 'md5', 'checksum', 'security'],
    features: [
      'Calculates SHA-256, SHA-384, SHA-512, and SHA-1 simultaneously',
      'HMAC secret key hashing option',
      'Uppercase & Lowercase Hex formatting',
      'Fast client-side Web Crypto API execution'
    ],
    faq: [
      {
        question: 'Which hash algorithm is most secure?',
        answer: 'SHA-256 and SHA-512 are currently the industry gold standard for cryptographic integrity and password verification.'
      }
    ]
  },
  {
    id: 'base64-encoder-decoder',
    slug: 'base64-encoder-decoder',
    name: 'Base64 Encoder & Decoder',
    shortDescription: 'Encode and decode plain text, UTF-8 strings, and files to Base64.',
    description: 'Quickly convert strings and binary files to Base64 format or decode Base64 data back to plain text, with instant preview for Base64 encoded images.',
    category: 'developer',
    categoryName: 'Developer & Code Tools',
    iconName: 'KeyRound',
    badge: 'New',
    tags: ['base64', 'encode', 'decode', 'binary', 'utf8', 'developer'],
    features: [
      'Encode Text to Base64 & Decode Base64 to Text',
      'Full UTF-8 and special emoji support',
      'Live image preview for Data URL Base64 strings',
      'URL-safe Base64 toggle'
    ],
    faq: [
      {
        question: 'Does this support non-English UTF-8 characters?',
        answer: 'Yes, full UTF-8 encoding and decoding is supported without corrupting accented characters or emojis.'
      }
    ]
  },
  {
    id: 'url-encoder-decoder',
    slug: 'url-encoder-decoder',
    name: 'URL Encoder & Decoder',
    shortDescription: 'Encode special characters for URLs or decode percent-encoded URLs.',
    description: 'Transform URLs into standard RFC-3986 percent-encoded format or decode query strings. Includes an interactive URL query parameter inspector and builder.',
    category: 'developer',
    categoryName: 'Developer & Code Tools',
    iconName: 'Link2',
    badge: 'New',
    tags: ['url', 'encode', 'decode', 'uri', 'query params', 'percent encode'],
    features: [
      'Encode URI Component & Standard URI encoding modes',
      'Interactive query parameter key-value table builder',
      'Decode nested percent-encoded URLs',
      'Live URL validity validator'
    ],
    faq: [
      {
        question: 'What is the difference between encodeURI and encodeURIComponent?',
        answer: 'encodeURI preserves URL structure characters like / and ?, whereas encodeURIComponent encodes every special character for safe use inside query parameters.'
      }
    ]
  },
  {
    id: 'uuid-generator',
    slug: 'uuid-generator',
    name: 'UUID / GUID Generator',
    shortDescription: 'Generate random UUID v4 and v1 identifiers in bulk with custom formats.',
    description: 'Create cryptographically strong UUIDs (Universally Unique Identifiers). Generate single or bulk batches up to 500 at once with uppercase/lowercase and bracket options.',
    category: 'developer',
    categoryName: 'Developer & Code Tools',
    iconName: 'Fingerprint',
    badge: 'New',
    tags: ['uuid', 'guid', 'generator', 'random id', 'developer', 'v4'],
    features: [
      'Cryptographically secure UUID v4 generation',
      'Bulk generation (1 to 500 UUIDs)',
      'Format options: with/without hyphens, braces {}, uppercase/lowercase',
      'One-click copy all or download as text file'
    ],
    faq: [
      {
        question: 'Are these UUIDs cryptographically random?',
        answer: 'Yes, we utilize window.crypto.randomUUID() ensuring full RFC 4122 compliance.'
      }
    ]
  },

  // 5. Calculators & Math
  {
    id: 'percentage-calculator',
    slug: 'percentage-calculator',
    name: 'Percentage Calculator',
    shortDescription: 'Calculate percentage of a number, percentage increase/decrease, and ratios.',
    description: 'Multi-purpose percentage calculator for daily math, business, and school. Solves what is X% of Y, X is what % of Y, percentage increase/decrease, and margin/markup.',
    category: 'calculators',
    categoryName: 'Calculators & Math',
    iconName: 'Percent',
    badge: 'Popular',
    featured: true,
    tags: ['percentage', 'calculator', 'increase', 'decrease', 'math', 'ratio'],
    features: [
      '4 essential calculation modes in one clean tabbed view',
      'Percentage increase and decrease with visual indicators',
      'What is X% of Y & X is what % of Y calculation',
      'Step-by-step mathematical formula explanations'
    ],
    faq: [
      {
        question: 'How do you calculate percentage increase?',
        answer: 'Percentage Increase = [(New Value - Original Value) / Original Value] * 100.'
      }
    ]
  },
  {
    id: 'discount-calculator',
    slug: 'discount-calculator',
    name: 'Discount & Sales Calculator',
    shortDescription: 'Calculate final sale price, amount saved, and additional tax rates.',
    description: 'Quickly find out how much you save on shopping discounts. Input original price, discount percentage, double-discount coupons, and sales tax to see exact final price.',
    category: 'calculators',
    categoryName: 'Calculators & Math',
    iconName: 'Tag',
    badge: 'Updated',
    tags: ['discount', 'sale', 'save', 'price', 'shopping', 'tax calculator'],
    features: [
      'Original price vs final price calculation',
      'Additional extra discount / promo code field',
      'Optional sales tax / VAT inclusion',
      'Summary savings card with percentage breakdown'
    ],
    faq: [
      {
        question: 'Can I apply two stacked discounts?',
        answer: 'Yes, activate the Extra Coupon field to calculate sequential compound discounts.'
      }
    ]
  },
  {
    id: 'loan-calculator',
    slug: 'loan-calculator',
    name: 'Loan & EMI Calculator',
    shortDescription: 'Calculate monthly loan payments (EMI), total interest, and loan schedule.',
    description: 'Plan mortgages, car loans, and personal financing. Calculate monthly payments, total interest payable, total cost of loan, and full annual amortization schedule.',
    category: 'calculators',
    categoryName: 'Calculators & Math',
    iconName: 'BadgeDollarSign',
    badge: 'Popular',
    featured: true,
    tags: ['loan', 'emi', 'mortgage', 'interest', 'finance', 'calculator'],
    features: [
      'Monthly EMI payment computation',
      'Total interest vs principal breakdown pie indicator',
      'Customizable loan duration in years or months',
      'Detailed year-by-year amortization breakdown table'
    ],
    faq: [
      {
        question: 'What formula is used for EMI calculation?',
        answer: 'EMI = [P x R x (1+R)^N]/[(1+R)^N-1], where P is Principal, R is monthly interest rate, and N is number of monthly installments.'
      }
    ]
  },

  // 6. AI Productivity Tools
  {
    id: 'ai-text-rewriter',
    slug: 'ai-text-rewriter',
    name: 'AI Text Rewriter & Paraphraser',
    shortDescription: 'Paraphrase and rewrite articles, emails, and sentences in multiple tones.',
    description: 'Intelligently rewrite your sentences to improve fluency, engagement, clarity, and tone. Select from Professional, Creative, Concise, Casual, or Academic styles with diff highlight.',
    category: 'ai',
    categoryName: 'AI Productivity Tools',
    iconName: 'Wand2',
    badge: 'AI Powered',
    featured: true,
    tags: ['ai', 'rewriter', 'paraphrase', 'content', 'grammar', 'writing assistant'],
    features: [
      '5 versatile tone presets (Professional, Creative, Concise, Casual, Academic)',
      'Side-by-side text comparison with word change counter',
      'Preserve original meaning while enhancing vocabulary',
      'One-click copy and export'
    ],
    faq: [
      {
        question: 'Is the rewritten text unique?',
        answer: 'Yes, our paraphrasing algorithms rephrase sentence structure while maintaining your core message.'
      }
    ]
  },
  {
    id: 'ai-summarizer',
    slug: 'ai-summarizer',
    name: 'AI Article Summarizer',
    shortDescription: 'Distill lengthy articles, research papers, and notes into key bullet points.',
    description: 'Transform long articles, essays, reports, and meeting transcripts into concise bullet points or executive summaries with adjustable summary length.',
    category: 'ai',
    categoryName: 'AI Productivity Tools',
    iconName: 'Sparkle',
    badge: 'AI Powered',
    featured: true,
    tags: ['ai', 'summarize', 'summary', 'tldr', 'bullet points', 'notes'],
    features: [
      'Three summary formats: Key Bullet Points, Executive TL;DR, and Concise Paragraph',
      'Adjustable summary depth (Short, Medium, In-depth)',
      'Estimated reading time saved calculator',
      'Export summary as Markdown or Text'
    ],
    faq: [
      {
        question: 'What kinds of documents can I summarize?',
        answer: 'You can summarize blog posts, news stories, technical documentation, meeting notes, essays, and reports.'
      }
    ]
  }
];

export function getToolBySlug(slug: string): ToolItem | undefined {
  return TOOLS.find(tool => tool.slug === slug);
}

export function getToolsByCategory(category: string): ToolItem[] {
  return TOOLS.filter(tool => tool.category === category);
}

export function getFeaturedTools(): ToolItem[] {
  return TOOLS.filter(tool => tool.featured);
}
