# BUSINESS_CONTEXT.md

This document is the source of truth for the application purpose, product intent, and business logic.
Every agent working in this repository must use this file together with `AGENTS.md`.
If implementation details conflict with this document, the conflict must be surfaced explicitly instead of being silently ignored.

## 1. Product Purpose

The application is a backend system for creating, selling, generating, validating, and analyzing event entry tickets.

The system is intended to support the full lifecycle of both digital and physical ticket-related products:

1. ticket template creation,
2. ticket generation,
3. ticket sales,
4. ticket validation,
5. order fulfillment tracking,
6. order history and auditing,
7. inventory management,
8. tenant administration,
9. user and role management,
10. integrations with external providers.

At the current stage, this is a backend-only application.

## 2. Product Vision

The product should provide a platform that allows tenants to:

1. create event ticket products,
2. create and manage ticket templates,
3. generate digital tickets,
4. support physical ticket-related fulfillment,
5. sell tickets through multiple payment providers,
6. validate tickets according to configurable business rules,
7. track orders and fulfillment end to end,
8. analyze sales, validation, and operational data,
9. manage users and permissions inside each tenant.

The long-term direction is to provide a flexible multi-tenant ticketing backbone that supports many product types, many providers, and many business rules without coupling the domain to a single tenant or a single integration.

## 3. Core Business Capabilities

The application must support the following business capabilities:

1. event ticket creation,
2. digital ticket generation,
3. ticket template generation and management,
4. ticket sales,
5. ticket verification and validation,
6. analytics and reporting inputs,
7. tenant management,
8. tenant user management,
9. tenant role differentiation,
10. integration with multiple payment systems,
11. integration with multiple shipping and courier providers for physical deliveries,
12. inventory management for digital and physical products,
13. order fulfillment tracking,
14. full historical logging of order lifecycle events.

## 4. Multi-Tenancy

The application must be tenant-aware by design.

Rules:

1. every important business object belongs to a tenant unless explicitly defined as global,
2. tenant isolation is a core business rule, not a secondary implementation detail,
3. reads, writes, validation, permissions, analytics, and integrations must respect tenant boundaries,
4. user management is tenant-scoped unless a dedicated global administrative model is introduced explicitly,
5. configuration for validation, providers, templates, products, and workflows should be tenant-aware.

## 5. Ticket Domain

The ticket domain is one of the core parts of the system.

The application must support:

1. creation of ticket products for events,
2. generation of digital tickets,
3. creation and management of ticket templates,
4. configurable validation rules for tickets,
5. ticket verification flows,
6. ticket lifecycle tracking.

Ticket validation must be configurable by the tenant or authorized tenant user.

Examples of configurable validation rules include:

1. how many times a ticket may be verified,
2. how long a ticket remains valid,
3. whether a ticket is valid only in a specific time window,
4. whether a ticket becomes invalid after first successful usage,
5. whether validation rules differ by ticket type or product type.

The system should be designed so that validation rules are treated as domain rules, not as hardcoded controller logic.

## 6. Ticket Templates

The application must support ticket template management.

This includes:

1. creating ticket templates,
2. managing reusable ticket template definitions,
3. generating tickets from templates,
4. supporting a panel that makes ticket template creation easy.

Because the application is backend-only at the moment, backend design must already support a future panel or administrative UI for template management.

This means:

1. template operations should have clean application contracts,
2. template configuration should be explicit and validated,
3. template generation should be auditable,
4. template-related data structures should be designed for future UI-driven workflows.

## 7. Orders And Fulfillment

Orders are a central business concept.

The application must support:

1. selling products,
2. creating and managing orders,
3. tracking order fulfillment,
4. collecting the full order history log,
5. handling both digital and physical product fulfillment.

Rules:

1. the system must keep a full historical log for each order,
2. the order log should make it possible to understand what happened, when it happened, and why it happened,
3. fulfillment logic must support both instantly delivered digital assets and physically shipped products,
4. fulfillment state should be traceable over time,
5. order tracking should support operational analysis and troubleshooting.

## 8. Inventory

The application must provide comprehensive inventory management for both digital and physical products.

This means the system should be prepared to support:

1. product availability,
2. inventory reservation,
3. inventory consumption,
4. stock visibility,
5. separate handling rules for digital and physical products.

Inventory behavior must be treated as a business-critical concern because it directly affects sales, fulfillment, and customer experience.

## 9. Integrations

The application must support multiple external providers.

At minimum, the business context requires support for:

1. multiple payment providers,
2. multiple courier or shipping providers for physical deliveries.

Business rules for integrations:

1. the core domain must not be tightly coupled to one provider,
2. providers should be swappable through ports and adapters,
3. tenant-specific provider configuration should be expected,
4. failures from providers must be observable and traceable,
5. provider integration events should be auditable where they affect orders, payments, fulfillment, or ticket validity.

## 10. Users And Roles

The application must support user management inside a tenant.

The application must also distinguish user roles.

This means:

1. tenants can have multiple users,
2. users can have differentiated permissions,
3. sensitive operations should be role-aware,
4. validation rules, product definitions, integrations, and operational actions may depend on permissions,
5. role design should be explicit and extensible.

## 11. Analytics And Auditing

The application must support analysis of sales, generation, validation, and operational behavior.

This does not necessarily mean all analytics logic must exist immediately, but the backend should preserve the data and events needed for future analytics.

The business context therefore requires:

1. event traceability,
2. order history logging,
3. ticket lifecycle visibility,
4. fulfillment visibility,
5. enough structured data for future business analysis.

## 12. Important Domain Expectations

The following expectations should guide implementation decisions:

1. multi-tenancy is mandatory,
2. validation logic is configurable,
3. integrations are pluggable,
4. auditability is important,
5. inventory is a first-class concern,
6. order history is a first-class concern,
7. digital and physical flows must both be supported,
8. backend contracts should be designed with future panel workflows in mind.

## 13. Suggested Bounded Contexts

The exact implementation may evolve, but the business domain currently suggests the following bounded contexts:

1. tenants,
2. users and roles,
3. events,
4. ticket products,
5. ticket templates,
6. ticket generation,
7. ticket validation,
8. orders,
9. payments,
10. fulfillment and shipping,
11. inventory,
12. analytics and audit.

These are not mandatory final modules, but they should guide domain decomposition.

## 14. Open Questions To Keep Visible

The following areas are not fully defined yet and should be treated as business questions, not guessed implementation details:

1. the exact distinction between event, product, ticket type, and ticket instance,
2. the full order state machine,
3. payment reconciliation rules,
4. physical shipment lifecycle rules,
5. tenant-level customization boundaries,
6. the exact permission model for roles,
7. refund, cancellation, and re-issuance behavior,
8. detailed analytics requirements,
9. whether ticket templates are versioned,
10. whether inventory is reserved before payment completion or after it.

If implementation work depends on these questions, the uncertainty should be made explicit.

## 15. Definition Of Business Alignment

Implementation is aligned with business intent only when:

1. tenant boundaries are respected,
2. ticket validation remains configurable,
3. integrations stay provider-agnostic at the core domain level,
4. digital and physical product flows are both supported,
5. orders remain traceable over time,
6. inventory is handled explicitly,
7. user and role distinctions are respected,
8. the design supports future operational and analytical needs.
