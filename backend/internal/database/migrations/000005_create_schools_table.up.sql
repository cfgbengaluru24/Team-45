CREATE TABLE if not exists public.schools (
	school_uuid uuid DEFAULT uuid_generate_v4() NOT NULL,
	id bigint NOT NULL,
	"name" text NOT NULL,
	"location" text NOT NULL,
	assigned_grassroot uuid NULL,
	status int4 not null DEFAULT 1,
	CONSTRAINT schools_pk PRIMARY KEY (school_uuid),
	CONSTRAINT schools_request_status_fk FOREIGN KEY (status) REFERENCES public.request_status("key"),
	CONSTRAINT schools_grassroots_fk FOREIGN KEY (assigned_grassroot) REFERENCES public.grassroots(grassroot_uuid) ON UPDATE CASCADE,
	CONSTRAINT schools_users_fk FOREIGN KEY (id) REFERENCES public.users(id) ON DELETE CASCADE ON UPDATE CASCADE
);