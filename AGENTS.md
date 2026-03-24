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
10. The builder pattern should be used only for complex object creation or test data setup.
11. `fp-ts` may be used when it clearly improves correctness or composability, and must not reduce readability for the team.
12. Entity and domain object identifiers must always use UUID v4.
13. Identifiers must be generated exclusively by `IdGenerator`, never by the database, except for purely technical tables that are not domain entities.
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
34. The agent must also use `BUSINESS_CONTEXT.md` as the source of truth for the application purpose and business logic.
35. The application exposes Swagger documentation.
36. Swagger documentation must be generated in a way that does not pollute application code.
37. Swagger files must be organized per module and named `<module>.openapi.ts`.
38. The project provides a `/docs` folder where files documenting modules, entities, and business solutions will be generated.
39. `/docs` must contain full descriptions, justifications, and diagrams.
40. `/docs` must also contain a file describing the infrastructure architecture, and that file must be suitable as the source for generating a visual diagram.
41. The agent must regularly update `README.md` whenever introduced changes require it.
42. `README.md` must clearly describe the application, its purpose, the stack, and the full list of requirements and steps needed to run the program locally.
43. The agent must provide and maintain GitHub Actions CI/CD configuration for the project.
44. `/docs` must contain Bruno API collections for the exposed application endpoints.

## 1. Overarching Rules

1. Correctness, security, and readability are more important than delivery speed.
2. The agent must prefer simple, explicit, and maintainable solutions over clever shortcuts.
3. The agent must not guess business requirements. If something is unclear, it must stop the change and clearly state what information is missing.
4. The agent must not introduce changes beyond the scope of the task without explicit justification.
5. The agent must leave the code in a better state than it found it, but without performing broad, unsolicited refactors.
6. Business decisions, domain behavior, and product intent must be aligned with `BUSINESS_CONTEXT.md`.

## 2. Application Design Rules

1. The architecture must be modular and based on domain responsibilities, not on accidental file grouping.
2. Every module should have a clearly defined business purpose and a minimal public interface.
3. Controllers must handle the HTTP layer and delegate logic to query handlers or command handlers. Business logic must not live inside controllers.
4. Use-case handlers must contain application logic and use-case orchestration. They should not mix transport responsibilities with domain responsibilities.
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

## Data Consistency And Transactions

1. Every use-case must explicitly define its transaction boundary.
2. Database transactions must be handled at the application service level, not inside repositories.
3. Distributed consistency must be handled explicitly using patterns such as the Outbox pattern and the Saga pattern.
4. Kafka events must not be published inside open database transactions.
5. Event publication must be idempotent and retry-safe.
6. The system must assume at-least-once delivery for Kafka and handle duplicates.

## Event Design Rules

1. Every event must include a unique event id, event type, version, timestamp, and payload.
2. Events must be immutable.
3. Event schemas must be versioned explicitly.
4. Breaking changes require new event versions.
5. Events must not expose internal domain models directly.
6. Events must be documented in `/docs`.

## Idempotency

1. Every command handler and event handler must be idempotent.
2. Re-processing the same message must not corrupt system state.
3. Deduplication mechanisms or idempotency keys must be used where needed.

## Retry And Failure Handling

1. External calls must use retry strategies with backoff.
2. Retries must be bounded and observable.
3. Kafka consumers must support dead-letter queues.
4. Failures must be traceable via logs and telemetry.

## API Design Rules

1. APIs must be versioned, for example `/v1`.
2. Error responses must follow a consistent structure.
3. Pagination must use a consistent format.
4. APIs must not expose internal domain models.

## Caching Rules

1. Every cache entry must have a defined TTL.
2. Cache invalidation strategy must be explicitly defined.
3. Redis must not be treated as a source of truth.

## Observability Standards

1. Every request must include a trace id.
2. Logs must include correlation id.
3. Critical operations must emit metrics.
4. Distributed tracing must cover HTTP requests, database calls, and Kafka operations.

## Database Migration Rules

1. All schema changes must be implemented via migrations.
2. Migrations should be reversible when possible.
3. Destructive changes require explicit justification.
4. Migrations must be reviewed for data safety.

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
    use-case/
  <feature-name>/
    use-case/
    domain/
    adapter/
```

Rules for this structure:

1. `domain/` contains domain concerns: domain models, value objects, ports, contracts, domain exceptions, and domain logic.
2. `adapter/` contains implementation concerns: controllers, repositories, integrations, infrastructure mappers, port implementations, database entities, external system clients, publishers, and consumers.
3. `core/` contains concerns shared across the whole module, not just a single feature.
4. `core/domain/` contains shared domain elements of the module.
5. `core/adapter/` contains shared implementation elements of the module.
6. `core/use-case/` contains module-level use-case handlers, commands, queries, and shared use-case contracts.
7. Every individual feature in a module should have its own `use-case/`, `domain/`, and `adapter/` folders when those concerns exist for that feature.
8. `use-case/` contains application-level orchestration, commands, queries, command handlers, query handlers, and feature-specific use-case contracts.
9. Write or state-changing flows must be implemented as `*CommandHandler`.
10. Read-only flows must be implemented as `*QueryHandler`.
11. The `Service` suffix must not be used for feature-level use-case classes.
12. Domain concerns must not be placed in `adapter/`, implementation concerns must not be placed in `domain/`, and use-case handlers must not be placed in `domain/`.
13. Additional folder layers must not be created just because they "might be useful one day."
14. Folder and file names must reflect business or technical responsibility, not generic categories such as `helpers`, `utils`, or `misc`.
15. If something is shared only within a module, it belongs in `core/`, not in global application folders.
16. `src/common/` contains utilities, helpers, and similar elements available to the entire application.
17. `src/core/` contains global core services and application contracts, such as `IdGenerator`, `DateTimeProvider`, and other fundamental mechanisms shared across multiple modules.
18. `src/core/` is not a place for random helpers. Only truly central application elements belong there.
19. `<module-name>/core/` means module-specific core, that is, elements shared only inside that module.
20. Module names in code must always use the singular form.
21. Folder names, module class names, and module file names must use the same singular module name consistently.
22. `<module-name>/core/domain/` must always contain an explicit domain object class for the main business object of the module, for example `TicketProduct`.
23. `<module-name>/core/adapter/` must always contain an explicit entity class named `<DomainObjectName>Entity` that directly represents the persistence schema handled by that adapter layer.
24. Domain object classes and entity classes must be separate types and must not be merged into a single class.

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
19. Decorators must always be named with an uppercase initial letter.
20. Imports must be sorted consistently in every file.
21. Unused imports must be removed immediately and must not remain in the codebase.
22. ESLint must enforce import sorting and removal of unused imports.
23. Import sorting and removal of unused imports must run automatically on file save in the local editor workspace.
24. Domain classes must consistently use the same builder-pattern approach as `TicketProduct`.
25. Every class that uses this pattern must expose only `static build(props?: Partial<ClassName>): IBuilder<ClassName>` and an instance `toBuilder(): IBuilder<ClassName>`.
26. `static build(...)` must return `Builder(ClassName, props)` directly.
27. `toBuilder()` must return a builder created from `structuredClone(this)`.
28. This builder-pattern approach must use `builder-pattern` directly on the class itself, without introducing separate wrapper builder classes.
29. Classes using this builder-pattern approach must not introduce additional `Props` types or `Builder` types such as `TicketProductProps` or `TicketProductBuilder`, unless explicitly requested.
30. Classes using this builder-pattern approach must not introduce any additional builder-related elements beyond imports, class properties, `static build(...)`, and `toBuilder()`, unless explicitly requested.
31. Response DTO classes must consistently use the same builder-pattern approach as `TicketProduct`.
32. Command builder classes must consistently use the same builder-pattern approach as `TicketProduct`.
33. Outside the class that defines the builder, values must never be passed directly into `build(...)` or `builder(...)` as a full object.
34. Outside the class that defines the builder, builders must be used fluently by setting fields explicitly, or by calling `toBuilder()` on an existing instance.
35. Class properties must not be separated by blank lines. Empty lines between consecutive properties in a class are forbidden, except for classes whose properties use decorators.
36. In classes whose properties use decorators, there must be exactly one empty line between consecutive decorated properties.
37. Request DTO naming must follow the pattern `CreateTicketProductDto` and must not use names such as `CreateTicketProductRequestDto`.
38. Request DTO classes must not use builders.
39. Validation and transformation rules belong only in request DTO classes and must not be duplicated in domain DTOs, commands, response DTOs, or other classes.
40. Converters must implement a generic converter interface and must not define ad hoc converter contracts per class.

## 4. Quality And Security

1. Every change must protect data integrity and predictable system behavior.
2. Input data must be validated, and output data must be controlled.
3. Secrets, tokens, passwords, and sensitive data must never be logged.
4. Secrets, keys, and environment data must never be hardcoded.
5. Error handling must not hide failures. Exceptions must be logged and mapped deliberately.
6. Every external dependency must have clear justification. Libraries must not be added for minor problems that can be solved natively.
7. Rate limiting must be applied to public endpoints.
8. Sensitive operations must be auditable.

## 5. Tests And Verification

1. In this project, integration tests should be preferred over unit tests whenever they better protect real application behavior.
2. `testcontainers` should be preferred in tests that require real infrastructure dependencies.
3. Business logic should be tested at the level that provides the highest protective value at a reasonable maintenance cost.
4. Changes affecting HTTP contracts, integrations, or critical flows should have integration or e2e tests.
5. The agent must not claim that a change is safe without performing adequate verification or clearly stating what could not be verified.
6. If a change affects application behavior, the agent must update or add tests.
7. Code that only works by accident and is not protected by tests does not meet this repository's quality standard.
8. API contracts must be verified using contract tests where applicable.
9. Tests must be deterministic and must not depend on real time or randomness.
10. `DateTimeProvider` must be mockable in tests.
11. The project must provide `/test/test-lib` as the place for global tools and context used by the test suite.
12. `/test/test-lib` must contain only test-side tools, bootstrap code, resource loaders, and context factories, and must not contain production code or scenario-specific test logic.
13. `/test/test-lib/test.module.ts` must exist and must be the standard entry point for creating the integration context of the application.
14. Integration tests must use `/test/test-lib/test.module.ts` to bootstrap the application unless a test has an explicit technical reason to use a narrower setup.
15. Reusable global test tools and shared integration context must be defined in `/test/test-lib`, not duplicated across module helpers.
16. Assertions must not be chained directly onto the request or response expression.
17. The HTTP response must first be assigned to a variable, and every `expect(...)` assertion must be written in a separate line.
18. Every integration test must follow a strict `given`, `when`, `then` code structure without using `given`, `when`, or `then` comments.
19. Variable names and code order inside the test must make the `given`, `when`, `then` structure obvious without comments.
20. The `given` block must appear first and must prepare the full input data, fixtures, builders, headers, and preconditions required by the test.
21. The `when` block must appear second and must execute exactly one tested operation and capture its result.
22. The `then` block must appear third and must contain assertions only.
23. Every integration test file must use the `*.integration-spec.ts` naming convention.
24. The `*.e2e-spec.ts` naming convention is forbidden.
25. The agent must evaluate integration test structure strictly and enforce a real three-block split of `given`, `when`, and `then`.
26. Mixing preparation, execution, and assertions inside the same block is forbidden.
27. In integration tests, the top-level `describe` name must follow the format `<ControllerName> [Integration]`.
28. In integration tests, the `it(...)` name must follow the format `<testingMethod> <HTTP_METHOD> <path>`.
29. In integration tests, `HTTP_METHOD` in the `it(...)` name must be uppercase.
30. In integration tests, `path` in the `it(...)` name must match the real HTTP path being tested.
31. In integration tests, the Nest application context variable must be named `ctx`.
32. In integration tests, the HTTP server variable must be named `server`.
33. `ctx` must always be created in `beforeEach` by calling `createIntegrationContext()` from `/test/test-lib/test.module.ts`.
34. `server` must always be created in `beforeEach` from `ctx` using `ctx.getHttpServer() as App`.
35. The test must close `ctx` in `afterEach`.
36. Integration tests must not call `ctx.getHttpServer()` inline inside the `when` block.
37. The required integration test bootstrap is:
38. `beforeEach(async (): Promise<void> => {`
39. `  ctx = await createIntegrationContext();`
40. `  server = ctx.getHttpServer() as App;`
41. `});`
42. Integration tests must not create custom names such as `application`, `app`, `httpServer`, or `integrationHttpServer` for the main application context or its HTTP server.

## 6. Rules For Introducing Changes

1. Before editing, the agent must understand the existing code and align with the repository architecture.
2. Changes must be as small, intentional, and cohesive as possible.
3. Unrelated code must not be modified without explicit need.
4. If a change affects how the system is used, configuration, or API behavior, the agent must update the documentation, including `.env.example` when environment variables are involved.
5. If a change affects tool versions or project runtime requirements, the agent must update the root tool-version file.
6. If a change adds or updates a dependency, the agent must keep the exact pinned package version in `package.json`.
7. If the project requires hooks, commit linting, or spell checking, the agent must keep `husky`, `commitlint`, and `cspell` configurations in a consistent state.
8. Refactoring is allowed only when it genuinely improves security, readability, testability, or maintainability.
9. If a change affects API contracts, module behavior, entities, or important business flows, the agent should update the relevant files in `/docs`.
10. If a change affects local setup, stack, workflow, or how the application should be used, the agent must update `README.md`.
11. If a change affects API endpoints or contracts, the agent must update the Bruno collection in `/docs`.

## 7. Agent Behavior

1. The agent must treat this document as the operating contract for work in this repository.
2. If a user request conflicts with these rules, the agent must stop, point out the conflict, and propose a safe alternative.
3. If the agent must make an assumption, it must name that assumption explicitly.
4. The agent must not pretend to be certain. It must communicate risks, gaps, and limitations directly.
5. The agent must prefer production-ready, predictable, and team-maintainable solutions.
6. The agent may independently execute command-line commands when they help complete the task safely.
7. The agent may independently run tests, lint, build, and other verification commands needed to assess change correctness.
8. If a change requires removing files or directories, the agent may do so independently and must use `rm -rf`.
9. Before making domain-level decisions, the agent must consult `BUSINESS_CONTEXT.md` and keep implementation aligned with it.
10. When working on APIs and module contracts, the agent must keep Swagger and `/docs` documentation aligned with the implementation.
11. When a project requires CI/CD, the agent should keep GitHub Actions configuration aligned with the current workflow and technical requirements.
12. The agent must not introduce new architectural patterns without justification.
13. The agent must prefer consistency with existing code over theoretical improvements.
14. The agent must explicitly state trade-offs when making design decisions.

## 8. Definition Of Done

A change may be considered complete only when:

1. it satisfies the user's requirement,
2. it complies with the architecture and rules in this document,
3. it preserves readability and security,
4. it has been verified adequately for the risk level of the change,
5. it does not introduce deliberate technical debt without explicitly stating that fact.
