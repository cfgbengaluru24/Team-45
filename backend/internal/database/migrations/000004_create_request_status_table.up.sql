CREATE TABLE if not exists public.request_status (
	"key" int4 NOT NULL,
	description text NOT NULL,
	CONSTRAINT request_status_pk PRIMARY KEY (key)
);

INSERT INTO public.request_status ("key", description)
 VALUES(1, 'Recieved'),
 (2, 'Assigned to grassroot'),
 (3, 'Approved by grassroot'),
 (4, 'Approved by admin'),
 (5, 'Donated(partial)'),
 (6, 'Donated');