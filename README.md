# Azure LearnHub - Next.js Learning Platform

A modern learning platform built with Next.js, TypeScript, and Tailwind CSS, inspired by MongoDB University.

## Features

- 🎓 Course catalog with detailed course pages
- 📱 Responsive design for all devices
- 🎨 Modern UI with Tailwind CSS and shadcn/ui components
- ⚡ Fast performance with Next.js App Router
- 🔍 Search functionality
- 📊 Interactive course content
- 🎯 Skills and certifications tracking

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui + Radix UI
- **Icons:** Lucide React
- **Testing:** Vitest + Testing Library

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd nextjs-azure-learnhub
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Deploy to Vercel

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import your repository to Vercel
3. Vercel will automatically detect it's a Next.js project and configure the build settings
4. Deploy!

Your app will be available at `https://your-app-name.vercel.app`

### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:ui` - Run tests with UI

## Project Structure

```
nextjs-azure-learnhub/
├── app/                    # Next.js App Router pages
│   ├── courses/           # Course-related pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── home/             # Home page components
│   └── layout/           # Layout components
├── lib/                  # Utility functions
├── test/                 # Test files
└── public/              # Static assets
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License.# cloud-edu
