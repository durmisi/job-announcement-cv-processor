# Copilot Instructions for Job Announcement CV Processor

## Architecture Overview

- **Frontend**: Next.js 16 app in `src/frontend/`, uses shadcn/ui components for UI.
- **Backend**: FastAPI app in `src/backend/`, routes organized in `routes/` folder using APIRouter.
- **Communication**: Frontend API routes (`app/api/`) proxy requests to backend via `NEXT_PUBLIC_BACKEND_URL` env var.
- **Data Flow**: User provides job URL/content and CV file; backend fetches job HTML with Playwright, analyzes CV (currently mock).

## Key Workflows

- **Start Services**: Run `start.bat` to launch both frontend (pnpm dev) and backend (uvicorn main:app --reload).
- **Install Backend**: Run `install-backend.bat` to install Python deps in `.venv`.
- **Backend Dev**: Use virtual env `.venv` for all Python commands.
- **Frontend Dev**: Use `pnpm` for package management in `src/frontend/`.

## Conventions

- **Backend Routes**: Use APIRouter in separate files under `routes/`, include in `main.py`.
- **Frontend Components**: Use shadcn/ui from `components/ui/`, follow `components.json` config.
- **API Proxy**: Frontend API routes handle CORS and proxy to backend, e.g., `app/api/analyze/route.ts` forwards to `/analyze`.
- **Error Handling**: Backend raises HTTPException; frontend returns JSON errors.

## Examples

- Add new route: Create `routes/new.py` with APIRouter, import in `main.py`.
- UI Component: Import from `components/ui/button.tsx`, use `cn()` for class merging.

Reference: `start.bat`, `src/backend/main.py`, `src/frontend/app/api/analyze/route.ts`.
