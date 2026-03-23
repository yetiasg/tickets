# AGENTS.md

This file defines the working rules for every AI agent operating in this repository, including Codex.
These rules are non-negotiable and must be followed strictly during every analysis, code change, refactor, and feature implementation.

## 0. Stack And Architectural Direction

1. The required technology stack for this project is NestJS, TypeScript, PostgreSQL, Drizzle ORM, Kafka, Redis, OpenTelemetry, Grafana, and Docker.
2. The application architecture must be a deliberate mix of hexagonal architecture, DDD, and clean code.
3. The agent must design solutions so that domain logic is separated as much as possible from the framework, transport layer, and infrastructure details.
4. NestJS is the runtime and integration layer, not the place where all business logic should be mixed together.
5. PostgreSQL is the default relational database for this project.
6. The application uses Drizzle ORM as the standard data access and persistence schema layer.
7. Kafka is the standard messaging and event-handling layer in the application architecture.
8. Redis is the standard technology for caching, short-lived auxiliary storage, and mechanisms that require very fast data access.
9. `class-validator` and `class-transformer` must be used for input validation.
10. The code should deliberately use the builder pattern wherever it simplifies the creation of complex objects or test data.
11. `fp-ts` should be preferred wherever functional programming improves readability and data-flow safety.
12. Entity and domain object identifiers must always use UUID v4.
13. Identifiers must be generated exclusively by `IdGenerator`, never by the database.
14. Dates and timestamps must be provided exclusively by `DateTimeProvider`, never by the database.
15. Environment configuration must be documented and maintained through `.env.example`.
16. The application uses observability and telemetry based on OpenTelemetry, loggers, log levels, and Grafana.
17. `testcontainers` should be preferred for integration and infrastructure tests.
18. Application CI/CD must be implemented with GitHub Actions.
19. The release process must use tags for feature releases, production releases, and Docker image releases.
20. The application must build into a Docker image based on `Dockerfile`.
21. `Dockerfile` and the image build process must include security checks and security best practices for the image, dependencies, and runtime.
22. `.dockerignore` must always limit unnecessary files from being included in the Docker image.
23. A root-level file defining tool versions used by the project must exist, for example for Node.js and other key toolchain components.
24. Local development infrastructure must be defined by `compose.yml`.
25. `package.json` must strictly pin exact package versions, without loose version ranges, so every developer always works with the same dependency versions.
26. TypeScript functions and methods must explicitly declare their return types.
27. ESLint must enforce explicit function and method return types.
28. The project requires `husky` for managing git hooks.
29. The project requires `commitlint`, and the allowed commit types are `feat`, `chore`, `fix`, `docs`, and `wip`.
30. The `pre-commit` hook must run tests.
31. The `pre-push` hook must run tests.
32. The project uses `cspell` to avoid typos and maintain consistent naming.
33. The application must always be run through scripts defined in `package.json`, not by ad hoc direct framework commands.

## 1. Overarching Rules

1. Correctness, security, and readability are more important than delivery speed.
2. The agent must prefer simple, explicit, and maintainable solutions over clever shortcuts.
3. The agent must not guess business requirements. If something is unclear, it must stop the change and clearly state what information is missing.
4. The agent must not introduce changes beyond the scope of the task without explicit justification.
5. The agent must leave the code in a better state than it found it, but without performing broad, unsolicited refactors.

## 2. Application Design Rules

1. The architecture must be modular and based on domain responsibilities, not on accidental file grouping.
2. Every module should have a clearly defined business purpose and a minimal public interface.
3. Controllers must handle the HTTP layer and delegate logic to services. Business logic must not live inside controllers.
4. Services must contain application logic and use-case orchestration. They should not mix transport responsibilities with domain responsibilities.
5. Persistence access must be separated from business logic. Controllers must never communicate directly with the database.
6. Input and output models must be explicit. DTOs or equivalent contracts must be used instead of loose objects.
7. Input validation must happen at the system boundary using `class-validator` and `class-transformer`.
8. Ports and adapters should be separated wherever that provides real separation between domain and infrastructure.
9. Kafka must be used as the event-driven and messaging layer. Event handlers, publishers, and consumers must be designed explicitly, with readable contracts and responsibilities.
10. Redis must be treated as supporting infrastructure. It must not become a hidden source of truth for domain data without an explicit architectural decision.
11. The application must use explicit converters or mappers between system layers.
12. Mapping between DTOs, commands, domain models, database entities, and response models must not happen accidentally or inline inside controllers.
13. Command creation must be a separate, readable step in the application flow.
14. `IdGenerator` is the only source for creating new identifiers in the application.
15. `DateTimeProvider` is the only source of time in the application.
16. The database must not generate identifiers or domain dates when those values belong to application or domain logic.
17. The application must deliberately use event loop mechanisms wherever they reduce main-thread load, shorten response time, or improve throughput.
18. Deferring work to the event loop must not break domain consistency, error handling, or system predictability.
19. Telemetry must be treated as part of the architecture, not as an afterthought. Critical flows should be measurable, loggable, and diagnosable.
20. Domain errors and technical errors must be clearly distinguished. Error handling must be predictable and consistent.
21. Application configuration must be centralized. Environment values and configuration constants must not be scattered throughout the codebase.
22. Solutions must be ready for system growth, but without premature abstraction.

## 2A. Default Module Shape

Every module must follow one consistent folder structure. Random per-feature structures are not allowed.

Default module skeleton:

```text
src/common/
src/core/
src/<module-name>/
  <module-name>-core.module.ts
  core/
    domain/
    adapter/
  <feature-name>/
    domain/
    adapter/
```

Rules for this structure:

1. `domain/` contains domain concerns: domain models, value objects, ports, contracts, domain exceptions, domain logic, and use-case elements that belong to the domain.
2. `adapter/` contains implementation concerns: controllers, repositories, integrations, infrastructure mappers, port implementations, database entities, external system clients, publishers, and consumers.
3. `core/` contains concerns shared across the whole module, not just a single feature.
4. `core/domain/` contains shared domain elements of the module.
5. `core/adapter/` contains shared implementation elements of the module.
6. Every individual feature in a module should have its own `domain/` and `adapter/` folders if it contains both domain logic and technical implementation.
7. Domain concerns must not be placed in `adapter/`, and implementation concerns must not be placed in `domain/`.
8. Additional folder layers must not be created just because they "might be useful one day."
9. Folder and file names must reflect business or technical responsibility, not generic categories such as `helpers`, `utils`, or `misc`.
10. If something is shared only within a module, it belongs in `core/`, not in global application folders.
11. `src/common/` contains utilities, helpers, and similar elements available to the entire application.
12. `src/core/` contains global core services and application contracts, such as `IdGenerator`, `DateTimeProvider`, and other fundamental mechanisms shared across multiple modules.
13. `src/core/` is not a place for random helpers. Only truly central application elements belong there.
14. `<module-name>/core/` means module-specific core, that is, elements shared only inside that module.

## 3. Code Writing Rules

1. Code must be readable without requiring comments to explain it.
2. Class, method, function, and variable names must clearly describe intent.
3. One unit of code should have one primary responsibility.
4. Functions, classes, and files should be small, cohesive, and easy to test.
5. Avoid mental shortcuts, abbreviated names, and overly clever code.
6. Avoid nesting when earlier exits and simpler control flow can be used instead.
7. Folder structure must stay shallow and pragmatic. Deeply nested files and folders should be avoided.
8. Duplication should be removed, but not at the cost of artificial abstraction.
9. `any` must be avoided extremely rigorously in TypeScript. `any` is allowed only in truly exceptional situations and must have very strong justification.
10. Problems must not be hidden through excessive casting, `!`, or bypassing the type system.
11. Magic numbers, strings, and hidden assumptions are forbidden. Such values must have names and context.
12. Asynchronous code must be explicit, without hidden side effects and without ignored errors.
13. Use of event loop mechanisms must be intentional, justified, and readable to the team.
14. Telemetry, logging, and log levels must be designed deliberately, without excessive noise and without hiding important events.
15. Comments may only be added when they explain a decision or context, not when they merely restate the code.
16. Converters between layers must be small, deterministic, and easy to test.
17. Models from different layers must not be mixed. A DTO is not a domain model, a database entity is not a response model, and a response model is not a command.
18. Functions and methods must explicitly declare their return type, even if TypeScript could infer it.

## 4. Quality And Security

1. Every change must protect data integrity and predictable system behavior.
2. Input data must be validated, and output data must be controlled.
3. Secrets, tokens, passwords, and sensitive data must never be logged.
4. Secrets, keys, and environment data must never be hardcoded.
5. Error handling must not hide failures. Exceptions must be logged and mapped deliberately.
6. Every external dependency must have clear justification. Libraries must not be added for minor problems that can be solved natively.

## 5. Tests And Verification

1. In this project, integration tests should be preferred over unit tests whenever they better protect real application behavior.
2. `testcontainers` should be preferred in tests that require real infrastructure dependencies.
3. Business logic should be tested at the level that provides the highest protective value at a reasonable maintenance cost.
4. Changes affecting HTTP contracts, integrations, or critical flows should have integration or e2e tests.
5. The agent must not claim that a change is safe without performing adequate verification or clearly stating what could not be verified.
6. If a change affects application behavior, the agent must update or add tests.
7. Code that only works by accident and is not protected by tests does not meet this repository's quality standard.

## 6. Rules For Introducing Changes

1. Before editing, the agent must understand the existing code and align with the repository architecture.
2. Changes must be as small, intentional, and cohesive as possible.
3. Unrelated code must not be modified without explicit need.
4. If a change affects how the system is used, configuration, or API behavior, the agent must update the documentation, including `.env.example` when environment variables are involved.
5. If a change affects tool versions or project runtime requirements, the agent must update the root tool-version file.
6. If a change adds or updates a dependency, the agent must keep the exact pinned package version in `package.json`.
7. If the project requires hooks, commit linting, or spell checking, the agent must keep `husky`, `commitlint`, and `cspell` configurations in a consistent state.
8. Refactoring is allowed only when it genuinely improves security, readability, testability, or maintainability.

## 7. Agent Behavior

1. The agent must treat this document as the operating contract for work in this repository.
2. If a user request conflicts with these rules, the agent must stop, point out the conflict, and propose a safe alternative.
3. If the agent must make an assumption, it must name that assumption explicitly.
4. The agent must not pretend to be certain. It must communicate risks, gaps, and limitations directly.
5. The agent must prefer production-ready, predictable, and team-maintainable solutions.
6. The agent may independently execute command-line commands when they help complete the task safely.
7. The agent may independently run tests, lint, build, and other verification commands needed to assess change correctness.
8. If a change requires removing files or directories, the agent may do so independently and must use `rm -rf`.

## 8. Definition Of Done

A change may be considered complete only when:

1. it satisfies the user's requirement,
2. it complies with the architecture and rules in this document,
3. it preserves readability and security,
4. it has been verified adequately for the risk level of the change,
5. it does not introduce deliberate technical debt without explicitly stating that fact.
