# Re-Study Guide (Beginner React Path)

This guide is for you if you started learning React only recently and want to use this portfolio project to level up.

Goal: understand the project deeply enough to rebuild key parts without copying.

---

## 0) How To Use This Guide

- Do not read everything in one pass.
- Learn in loops:
  - Read small part
  - Run app
  - Change one thing
  - Explain what changed (in your own words)
- Keep a notebook:
  - "What I understand"
  - "What confuses me"
  - "Questions to ask later"

---

## 1) First 2 Days: React Basics Inside This Project

### Day 1: Project entry and routing

Read in this order:

1. `src/main.tsx`
2. `src/app/App.tsx`
3. `src/app/routes/router.tsx`
4. `src/components/layout/PublicLayout.tsx`

What to learn:

- How React starts (`ReactDOM.createRoot`)
- What a component is
- How routes map URL -> page component
- How layout uses `<Outlet />` for nested pages

Practice:

- Change app title text in one page and verify hot reload.
- Add a temporary route `/test` and render simple text.

### Day 2: Components and props

Read:

1. `src/components/ui/Button.tsx`
2. `src/components/ui/Card.tsx`
3. `src/components/ui/Container.tsx`
4. `src/pages/public/HomePage.tsx`

What to learn:

- Reusable components
- Props and default props
- Composing UI from smaller building blocks

Practice:

- Add a new `Button` variant (example: `success`) and use it in one page.
- Change `Card` padding and observe all affected places.

---

## 2) Days 3-4: State, Forms, and Validation

### Day 3: Forms with React Hook Form + Zod

Read:

1. `src/features/contact/schemas/contactSchema.ts`
2. `src/features/contact/components/ContactForm.tsx`
3. `src/features/auth/schemas/loginSchema.ts`
4. `src/features/auth/components/LoginForm.tsx`

What to learn:

- Controlled form handling via `react-hook-form`
- Schema validation with Zod
- How form errors are displayed

Practice:

- Add a new field to contact form: `company` (optional).
- Add validation rule: message must be at least 20 chars.
- Show custom error text when submission fails.

### Day 4: Component state and events

Read:

1. `src/features/projects/components/ProjectForm.tsx`
2. `src/features/blog/components/BlogForm.tsx`

What to learn:

- `useState` for preview images
- Input file event handling
- Submission flow with async functions

Practice:

- Show selected file size below file input.
- Disable submit button when slug contains spaces.

---

## 3) Days 5-6: Data Fetching and Supabase

### Day 5: API layer + query hooks

Read:

1. `src/lib/supabase.ts`
2. `src/features/projects/api/projectsApi.ts`
3. `src/features/projects/hooks/useProjects.ts`
4. `src/features/blog/api/blogApi.ts`
5. `src/features/blog/hooks/useBlog.ts`

What to learn:

- Why API logic is separate from UI
- How TanStack Query handles loading/error/cache
- Mutation + invalidation flow

Practice:

- Add console logs for query state transitions (`isLoading`, `error`, `data`).
- Change projects order (oldest first), then switch back.

### Day 6: Authentication and protected routes

Read:

1. `src/features/auth/api/authApi.ts`
2. `src/features/auth/hooks/useAuth.ts`
3. `src/features/auth/components/ProtectedAdminRoute.tsx`
4. `src/pages/admin/AdminLayoutPage.tsx`

What to learn:

- Session fetching and auth state updates
- Admin check logic
- Redirect patterns in protected routes

Practice:

- Temporarily show current user email in admin header.
- Log out and verify redirect behavior.

---

## 4) Days 7-8: Page Composition and UX

### Day 7: Public pages and reusable sections

Read:

1. `src/pages/public/HomePage.tsx`
2. `src/pages/public/ProjectsPage.tsx`
3. `src/pages/public/BlogPage.tsx`
4. `src/components/layout/Section.tsx`

What to learn:

- How page sections are structured
- Rendering lists from fetched data
- Empty/loading/error UI patterns

Practice:

- Add a new section to Home page: "Now Learning".
- Create one new skeleton layout variant.

### Day 8: Detail pages + markdown

Read:

1. `src/pages/public/ProjectDetailPage.tsx`
2. `src/pages/public/BlogDetailPage.tsx`
3. `src/services/markdown.tsx`

What to learn:

- URL params (`useParams`)
- Detail fetch by `slug`
- Markdown rendering customization

Practice:

- Add styling for blockquotes in markdown renderer.
- Add a "Copy link" button on blog detail page.

---

## 5) Days 9-10: Admin CRUD Understanding

Read:

1. `src/pages/admin/AdminProjectsPage.tsx`
2. `src/pages/admin/AdminProjectNewPage.tsx`
3. `src/pages/admin/AdminProjectEditPage.tsx`
4. `src/pages/admin/AdminBlogPage.tsx`
5. `src/pages/admin/AdminBlogNewPage.tsx`
6. `src/pages/admin/AdminBlogEditPage.tsx`
7. `src/pages/admin/AdminMessagesPage.tsx`

What to learn:

- Full create/edit/delete lifecycle
- Shared forms for new/edit pages
- Toast feedback and navigation after mutation

Practice:

- Add confirm modal before delete.
- Add optimistic UI (optional advanced).

---

## 6) Supabase + SQL (Must Read)

Read:

1. `supabase/migrations/001_init.sql`
2. `src/types/database.ts`

What to learn:

- Tables and columns
- RLS policies and access rules
- Why admin logic is duplicated in DB policies and UI route checks

Practice:

- Explain each policy in plain English.
- Draw simple diagram:
  - Public user permissions
  - Authenticated admin permissions

---

## 7) Weekly Review Loop (Repeat 3-4 Times)

Each week:

1. Pick one feature (auth/projects/blog/contact).
2. Rebuild it in a tiny sandbox app from memory.
3. Compare with this project.
4. Write what you missed.

Rule:

- If you cannot explain a file in simple words, re-read and re-practice.

---

## 8) Skills Checklist

You should be able to do these without looking:

- Create a page and route.
- Create reusable UI component with props.
- Build form with Zod + React Hook Form.
- Fetch list + render loading/error/empty states.
- Create mutation and invalidate query.
- Protect route based on auth + role.
- Upload file to Supabase storage.
- Write simple RLS policy logic explanation.

---

## 9) Beginner Mistakes To Avoid

- Reading too much without running code.
- Copying without understanding data flow.
- Skipping error states and only coding happy path.
- Ignoring TypeScript errors instead of learning them.
- Editing many files at once without testing each step.

---

## 10) Final Challenge (After 2-3 Weeks)

Build a second mini-portfolio from scratch with:

- Home + Projects + Blog + Contact
- One protected admin section
- Same stack, but your own folder names and UI design

Constraint:

- Do not copy/paste large chunks.
- Only use this project for reference when stuck.

If you can finish this challenge, your React foundation is becoming strong.

