CREATE TABLE if not exists public.requests (
	request_id bigserial NOT NULL,
	school_uuid uuid NOT NULL,
	"type" text NOT NULL,
	details text NULL,
	assigned_grassroot uuid NOT NULL,
	status int4 NOT NULL,
	"cost" int8 NOT NULL,
	donated int8 NULL,
	created_at timestamp with time zone DEFAULT Now() NOT NULL,
	CONSTRAINT requests_pk PRIMARY KEY (request_id),
	CONSTRAINT requests_grassroots_fk FOREIGN KEY (assigned_grassroot) REFERENCES public.grassroots(grassroot_uuid),
	CONSTRAINT requests_request_status_fk FOREIGN KEY (status) REFERENCES public.request_status("key"),
	CONSTRAINT requests_schools_fk FOREIGN KEY (school_uuid) REFERENCES public.schools(school_uuid)
);