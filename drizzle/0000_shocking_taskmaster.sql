CREATE TYPE "public"."ticket_product_delivery_type" AS ENUM('digital_pdf', 'digital_qr', 'physical_qr');--> statement-breakpoint
CREATE TYPE "public"."ticket_product_status" AS ENUM('draft', 'active', 'inactive', 'archived');--> statement-breakpoint
CREATE TABLE "ticket_products" (
	"id" uuid PRIMARY KEY NOT NULL,
	"tenant_id" uuid NOT NULL,
	"event_id" uuid NOT NULL,
	"ticket_template_id" uuid,
	"name" varchar(255) NOT NULL,
	"code" varchar(128) NOT NULL,
	"description" text,
	"status" "ticket_product_status" NOT NULL,
	"delivery_type" "ticket_product_delivery_type" NOT NULL,
	"available_quantity" integer NOT NULL,
	"additional_info" jsonb,
	"sales_starts_at" timestamp with time zone,
	"sales_ends_at" timestamp with time zone,
	"max_validation_count" integer NOT NULL,
	"is_single_use" boolean NOT NULL,
	"valid_from" timestamp with time zone,
	"valid_until" timestamp with time zone,
	"validation_rules" jsonb,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "ticket_products_available_quantity_check" CHECK ("ticket_products"."available_quantity" >= 0),
	CONSTRAINT "ticket_products_max_validation_count_check" CHECK ("ticket_products"."max_validation_count" >= 1),
	CONSTRAINT "ticket_products_validity_window_check" CHECK ("ticket_products"."valid_until" is null or "ticket_products"."valid_from" is null or "ticket_products"."valid_until" >= "ticket_products"."valid_from")
);
--> statement-breakpoint
CREATE UNIQUE INDEX "ticket_products_tenant_id_code_unique" ON "ticket_products" USING btree ("tenant_id","code");--> statement-breakpoint
CREATE INDEX "ticket_products_tenant_id_event_id_index" ON "ticket_products" USING btree ("tenant_id","event_id");--> statement-breakpoint
CREATE INDEX "ticket_products_tenant_id_status_index" ON "ticket_products" USING btree ("tenant_id","status");