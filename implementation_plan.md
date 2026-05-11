# AuraTrack: Complete Life Tracker (AuraTrack 2.0) Implementation Plan

Pivot the platform from a digital productivity tracker to a comprehensive life management system.

## Proposed Changes

### Backend (SQLModels)

#### [NEW] [finance.py](file:///d:/My_Projects/AuraTrack/backend/app/models/finance.py)

- `Transaction`: Tracking income and expenses.
- `Debt`: Tracking outstanding debts and payments.
- `Budget`: Setting monthly limits.

#### [NEW] [health.py](file:///d:/My_Projects/AuraTrack/backend/app/models/health.py)

- `WorkoutLog`: Tracking gym sessions and exercises.
- `DietLog`: Tracking meals and caloric intake.
- `HealthStatus`: Tracking illnesses or general well-being logs.

#### [NEW] [gaming.py](file:///d:/My_Projects/AuraTrack/backend/app/models/gaming.py)

- `GamingSession`: Tracking time spent on online/offline games.
- `Game`: Managing a library of games and their progress.

#### [NEW] [media.py](file:///d:/My_Projects/AuraTrack/backend/app/models/media.py)

- `MediaProgress`: Tracking progress in Movies, Anime, Manga, and TV Shows.

#### [NEW] [goals.py](file:///d:/My_Projects/AuraTrack/backend/app/models/goals.py)

- `Goal`: A unified model for setting milestones across all trackers.

### Frontend (React Pages)

#### [MODIFY] [Sidebar.tsx](file:///d:/My_Projects/AuraTrack/frontend/src/components/Sidebar.tsx)

- Update navigation to include: Dashboard, Finance, Health, Gaming, Media, Goals.

#### [NEW] Pages

- `Finance.tsx`: Financial management dashboard.
- `Health.tsx`: Health and fitness tracker.
- `Gaming.tsx`: Game library and session tracker.
- `Media.tsx`: Media progress tracker.

#### [MODIFY] [Dashboard.tsx](file:///d:/My_Projects/AuraTrack/frontend/src/pages/Dashboard.tsx)

- Transform into a "Life Hub" showing top-level summaries from all modules using the Bento-grid layout.

## Verification Plan

### Manual Verification

- Ensure the premium "glassmorphism" aesthetic is maintained across all new pages.
- Verify that the navigation between modules is seamless.
