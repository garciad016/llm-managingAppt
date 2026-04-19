# llm-managingAppt

A learning-sprint project exploring how a local LLM can manage structured healthcare data (patients, doctors, appointments) through **tool calling** against a typed REST API.

The goal was to get hands-on with the full loop: define a clinical-style data model, expose it through a documented API, and let an LLM read/write to it via LangChain tools rather than just prompting over free text.

This repo is exploratory, not production. Data is synthetic and the auth layer is intentionally out of scope.

---

## Architecture

Two services talking over HTTP on `localhost`:

```
┌────────────────────────┐        HTTP          ┌──────────────────────────┐
│  chatbot/  (Python)    │  ───────────────▶    │  backend/  (NestJS)      │
│  LangChain + Ollama    │                      │  Prisma + SQLite         │
│  llama3.2:3b (local)   │  ◀───────────────    │  Swagger at /api         │
└────────────────────────┘      JSON            └──────────────────────────┘
```

- **`backend/`** — NestJS 10 + Prisma 6 + SQLite. Exposes a REST API at `http://localhost:3000/api` with Swagger docs auto-generated at the same path.
- **`chatbot/`** — Python + LangChain + `langchain-ollama`. Runs `llama3.2:3b` locally via Ollama, with three bound tools (`get_current_appointments`, `delete_appointment`, `reschedule_appointment`) that wrap the backend endpoints. LangSmith tracing is wired up for observability.

## Data model

Standard relational shape, SQLite-backed via Prisma:

| Entity | Key fields | Notes |
|---|---|---|
| `Patient` | `id`, `firstName`, `lastName`, `email` (unique), `healthCardNumber` (unique), `history` | One-to-many with `Appointment` |
| `Doctor` | `id`, `firstName`, `lastName`, `email` (unique) | One-to-many with `Appointment` |
| `Appointment` | `id`, `dateTime`, `reason`, `notes`, `appointmentStatus`, `doctorId`, `patientId` | Joins patient ↔ doctor |

Sample fixtures live in `backend/sample_data/` (`patients.json`, `doctors.json`).

## API endpoints

All routes are prefixed with `/api`. Swagger UI is the source of truth, run the backend and visit `http://localhost:3000/api`.

| Method | Path | Purpose |
|---|---|---|
| `GET`    | `/api/appointment` | List all appointments (joined with patient + doctor) |
| `GET`    | `/api/appointment/:id` | Fetch one appointment |
| `POST`   | `/api/appointment` | Create an appointment |
| `DELETE` | `/api/appointment/:id` | Cancel an appointment |
| `PATCH`  | `/api/appointment/reschedule/:id` | Reschedule — body: `{ "newDateTime": "<ISO-8601>" }` |
| `GET / POST / …` | `/api/patient`, `/api/doctor` | Standard CRUD for patients and doctors |

## LLM tool-calling loop

The chatbot binds three tools to the model and lets the LLM decide which to call based on user intent:

1. User types a request (e.g. *"cancel Jane Smith's appointment with Dr. Williams"*).
2. `main.py` sends the conversation to `ChatOllama` with the tools bound.
3. The model returns either a text reply or a `tool_calls` list.
4. `handle_tool_calls` routes the call to the matching Python function, which hits the NestJS backend over HTTP.
5. The tool result is appended back to the conversation as a `ToolMessage`.

`chatbot/main.py` is the interactive CLI. `chatbot/langchain_playground.py` is a separate scratchpad for experimenting with LangChain tool patterns against an in-memory patient dict — useful for isolating LLM behaviour from the backend.

---

## Setup

### 1. Backend (NestJS)

```bash
cd backend
npm install

# point Prisma at a local SQLite file
echo 'DATABASE_URL="file:./dev.db"' > .env

# generate Prisma client + push schema
npm run schema:generate-client
npm run schema:push

# start the API (dev mode with watch)
npm run start:dev
```

API: `http://localhost:3000/api` · Swagger: same URL.

### 2. Chatbot (Python)

Requires a local [Ollama](https://ollama.com) install with `llama3.2:3b` pulled:

```bash
ollama pull llama3.2:3b
```

Then, from `chatbot/`:

```bash
cd chatbot
pip install langchain langchain-ollama langchain-core requests textblob

# create secret.json for LangSmith tracing (optional but referenced in code)
echo '{"langsmith_api_key": "YOUR_KEY_HERE"}' > secret.json

python main.py
```

With the backend running, the CLI will prompt for `check / reschedule / cancel / exit`.

---

## What this sprint was actually for

Concretely, the things I wanted to get reps on:

- **Tool calling as a data-access pattern** — treating the LLM as a router over a typed API rather than a freeform text generator. Closer to how you'd want an LLM to touch clinical data in practice: through schemas, not string parsing.
- **Backend ergonomics** — NestJS + Prisma + Swagger as a fast way to stand up a typed, documented API with very little boilerplate.
- **Observability of LLM behaviour** — LangSmith tracing to actually see tool-call decisions, arguments, and failures, which matters a lot once the model starts making choices you didn't explicitly code.
- **Keeping the domain realistic** — patients/doctors/appointments with health card numbers and joined records, so the shape of the problem resembles what real appointment or trial-management data looks like.

## Known limitations

This is a sprint repo, so:

- No authentication, authorization, or audit logging. Not suitable for any real PHI.
- SQLite + sample JSON only; no migrations strategy beyond `prisma db push`.
- The chatbot matches patients by `(firstName, lastName, healthCardNumber, doctorName)` string equality, fragile, and would need proper identifiers in anything real.
- `manage_appointments` in `appointment_manager.py` is an earlier unified tool that was superseded by the three split tools actually bound in `main.py`; left in for reference.
- `langchain_playground.py` uses a separate in-memory patient dict and is independent of the backend.

## Repo layout

```
llm-managingAppt/
├── backend/                    # NestJS + Prisma API
│   ├── prisma/schema.prisma    # Patient / Doctor / Appointment models
│   ├── sample_data/            # Seed JSON for patients + doctors
│   └── src/
│       ├── appointment/        # Controller, service, DTOs
│       ├── patient/
│       ├── doctor/
│       └── main.ts             # Bootstraps Nest + Swagger on :3000
└── chatbot/
    ├── main.py                 # CLI + tool-call orchestration
    ├── appointment_manager.py  # LangChain @tool functions hitting the API
    └── langchain_playground.py # Standalone LangChain experiments
```
