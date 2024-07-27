CREATE TABLE IF NOT EXISTS public.donors (
	donor_uuid uuid DEFAULT uuid_generate_v4() NOT NULL,
	id bigint NOT NULL,
	anonymous bool DEFAULT false NOT NULL,
	get_report bool DEFAULT true NOT NULL,
	donated bigint DEFAULT 0 NOT NULL,
	CONSTRAINT donors_pk PRIMARY KEY (donor_uuid),
	CONSTRAINT donors_users_fk FOREIGN KEY (id) REFERENCES public.users(id) ON DELETE CASCADE ON UPDATE CASCADE
);