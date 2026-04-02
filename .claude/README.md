# .claude/ Folder

This folder contains configuration, documentation, and templates to facilitate development of the TASA website using Claude or other AI assistants.

## Folder Structure

```
.claude/
├── README.md                    # This file
├── docs/                        # Development documentation
│   ├── PROJECT_STRUCTURE.md     # Project structure overview
│   ├── ARCHITECTURE.md          # System architecture
│   ├── API_SPEC.md              # API specifications
│   ├── DATABASE_SCHEMA.md       # Database structure
│   └── DEPLOYMENT.md            # Deployment guide
├── scripts/                     # Build and automation scripts
│   ├── setup.sh                 # Initial setup script
│   ├── build.sh                 # Build script
│   └── deploy.sh                # Deployment script
├── templates/                   # Code templates
│   ├── PAGE_TEMPLATE.tsx        # React page template
│   ├── COMPONENT_TEMPLATE.tsx   # React component template
│   ├── API_ROUTE_TEMPLATE.ts    # API route template
│   └── DATABASE_MODEL.ts        # Database model template
└── config/                      # Configuration files
    ├── .env.example             # Environment variables template
    ├── next.config.example.ts   # Next.js config example
    └── build-info.json          # Build information
```

## Quick Start

1. **Setup Project**
   ```bash
   bash .claude/scripts/setup.sh
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Development**
   ```bash
   npm run dev
   ```

4. **Build**
   ```bash
   bash .claude/scripts/build.sh
   ```

## Using This Folder

- **Developers**: Reference `docs/` for architecture and API specs
- **AI Assistants**: Review these files to understand the project context
- **DevOps**: Use `scripts/` for automation and `config/` for configuration
- **Code Generation**: Use `templates/` as reference for new components/pages

## Key Documentation Files

- 📐 **ARCHITECTURE.md** - System design and component organization
- 🗄️ **DATABASE_SCHEMA.md** - Data models and relationships
- 🔌 **API_SPEC.md** - Backend API endpoints and contracts
- 📦 **PROJECT_STRUCTURE.md** - Project layout and file organization

## Development Guidelines

See [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) for:
- Code style and conventions
- Component structure
- Testing approach
- Git workflow

## Support

For questions about the project structure or development process, refer to the relevant documentation file in the `docs/` folder.
