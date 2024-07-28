CREATE TABLE if not EXISTS public.records (
    record_id bigserial NOT NULL,
    docname text NOT NULL,
    doc bytea NOT NULL,
    request_id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT Now() NOT NULL,
	CONSTRAINT records_pk PRIMARY KEY (record_id),
    CONSTRAINT records_requests_fk FOREIGN KEY (request_id) REFERENCES public.requests(request_id)
);