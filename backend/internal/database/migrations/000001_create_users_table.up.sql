CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.users (
	id bigserial NOT NULL,
	email citext NOT NULL,
	full_name text NOT NULL,
	phone text NOT NULL,
	"role" text NOT NULL,
	password_hash bytea NOT NULL,
	CONSTRAINT users_pkey PRIMARY KEY (id),
	CONSTRAINT users_unique UNIQUE (email)
);