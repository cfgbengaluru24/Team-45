CREATE TABLE if not exists public.schools (
	school_uuid uuid DEFAULT uuid_generate_v4() NOT NULL,
	id bigint NOT NULL,
	"name" text NOT NULL,
	"location" text NOT NULL,
	verified_admin uuid NULL,
	verified_grassroot uuid NULL,
	CONSTRAINT schools_pk PRIMARY KEY (school_uuid),
	CONSTRAINT schools_grassroots_fk FOREIGN KEY (verified_grassroot) REFERENCES public.grassroots(grassroot_uuid) ON UPDATE CASCADE,
	CONSTRAINT schools_users_fk FOREIGN KEY (id) REFERENCES public.users(id) ON DELETE CASCADE ON UPDATE CASCADE
);