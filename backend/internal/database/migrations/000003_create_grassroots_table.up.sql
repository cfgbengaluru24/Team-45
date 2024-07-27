CREATE TABLE if not exists public.grassroots (
	grassroot_uuid uuid DEFAULT uuid_generate_v4() NOT NULL,
	id bigint NOT NULL,
	"location" text NOT NULL,
	CONSTRAINT grassroots_pk PRIMARY KEY (grassroot_uuid),
	CONSTRAINT grassroots_users_fk FOREIGN KEY (id) REFERENCES public.users(id) ON DELETE CASCADE ON UPDATE CASCADE
);