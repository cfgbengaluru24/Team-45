CREATE TABLE if not exists public.donations (
	donation_id bigserial NOT NULL,
	donor_uuid uuid NOT NULL,
	amount int8 NOT NULL,
	request_id bigint NULL,
	created_at timestamp with time zone DEFAULT Now() NOT NULL,
	CONSTRAINT donations_pk PRIMARY KEY (donation_id),
	CONSTRAINT donations_donors_fk FOREIGN KEY (donor_uuid) REFERENCES public.donors(donor_uuid),
	CONSTRAINT donations_requests_fk FOREIGN KEY (request_id) REFERENCES public.requests(request_id)
);