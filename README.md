# Brahma Account Recovery

A secure account recovery application with multi-method authentication.

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Environment Setup

Create a `.env.local` file:

```bash
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id_here
```

Get your Privy App ID from [https://dashboard.privy.io](https://dashboard.privy.io)

### Development

```bash
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
# Build for production
npm run build

# Start production server
npm run start
```

## Documentation

Detailed documentation is available in the `.context/` directory:

- [Project Structure](./.context/projectStructure.md) - Architecture and file organization
- [Design System](./.context/designSystem.md) - Theme, colors, and styling guidelines
- [Features](./.context/features.md) - Implementation details and features
- [Configuration](./.context/configuration.md) - Setup and customization guide

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Authentication:** Privy
