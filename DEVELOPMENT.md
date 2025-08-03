# Development Guide

## Quick Start (Frontend Only)

For simple frontend development without microservices:

```bash
# Install frontend dependencies
npm run install:frontend

# Start just the frontend
npm run dev:simple
```

The frontend will be available at http://localhost:3000

## Alternative Frontend Commands

You can also use:
```bash
npm run dev:frontend-only
```

Both commands do the same thing - start only the frontend application.

## Full Microservices Development

For full-stack development with all services:

```bash
# Install all dependencies
npm run install:all

# Start all services (requires Docker and service setup)
npm run dev
```

## Notes

- The frontend runs independently with mock data when backend services are unavailable
- API calls gracefully degrade when services are offline
- Use `npm run dev:simple` for UI development and testing
- Use the full `npm run dev` only when you need to test backend integration
- The frontend displays a complete e-commerce interface with product listings, cart functionality, and user authentication UI
- All API errors are handled gracefully with user-friendly messages

## Troubleshooting

If you encounter issues with the full microservices setup:
1. Try the simplified frontend-only approach first: `npm run dev:simple`
2. Check that Docker is running if using the full setup
3. Ensure all dependencies are installed with `npm run install:all`
4. The frontend will work without backend services for UI development and testing
