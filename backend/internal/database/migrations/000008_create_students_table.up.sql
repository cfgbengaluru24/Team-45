CREATE TABLE if not exists public.students (
	student_uuid uuid DEFAULT uuid_generate_v4() NOT NULL,
	school_uuid uuid NOT NULL,
	"name" text NOT NULL,
	grade text NOT NULL,
	request_id int8 NULL,
	CONSTRAINT students_pk PRIMARY KEY (student_uuid),
	CONSTRAINT students_requests_fk FOREIGN KEY (request_id) REFERENCES public.requests(request_id),
	CONSTRAINT students_schools_fk FOREIGN KEY (school_uuid) REFERENCES public.schools(school_uuid)
);