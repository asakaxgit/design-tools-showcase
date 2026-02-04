# Design Tools Showcase

A showcase project to evaluate graphics libraries and paid solutions for informed product decision-making.

🔗 **Live Demo**: [https://asakaxgit.github.io/design-tools-showcase/](https://asakaxgit.github.io/design-tools-showcase/)

## Purpose

This repository demonstrates and evaluates various graphics libraries to help make informed decisions about which technology to use in production.

## Libraries Under Evaluation

### Open Source Libraries
- **Konva (react-konva)** - Canvas-based 2D graphics library
- **Fabric.js** - Powerful canvas library with interactive object model
- **Paper.js** - Vector graphics scripting framework

### Paid Solutions (Future Evaluation)
- Zakeke
- Customily
- Pacdora

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the showcase.

### Build

```bash
npm run build
npm start
```

### Static Export (for GitHub Pages)

```bash
npm run build
```

The static site will be generated in the `out/` directory.

## Deployment

This project is automatically deployed to GitHub Pages when changes are pushed to the `main` branch. The deployment workflow:

1. Builds the Next.js app as a static export
2. Uploads the build artifacts
3. Deploys to GitHub Pages

View the live showcase at: [https://asakaxgit.github.io/design-tools-showcase/](https://asakaxgit.github.io/design-tools-showcase/)

## Project Structure

```
├── app/              # Next.js app directory
├── components/       # React components
├── lib/             # Library-specific implementations
└── public/          # Static assets
```

## Evaluation Criteria

Each library will be evaluated based on:
- **Usability**: API design, learning curve, documentation quality
- **Performance**: Rendering speed, memory usage, scalability
- **Features**: Built-in capabilities, extensibility
- **Integration**: Compatibility with React/TypeScript ecosystem

## Status

✅ **Konva Showcase Complete** - Interactive examples implemented  
🚧 **Fabric.js & Paper.js** - Coming soon  
🚀 **Deployed to GitHub Pages** - Auto-deployment enabled

## License

This is a private evaluation project.
