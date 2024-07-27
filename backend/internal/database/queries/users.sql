-- name: GetAllUsers :many
Select id, email, full_name, phone, role
from users;

-- name: RegisterUser :one
Insert into users (email,full_name,phone,"role",password_hash)
values ($1,$2,$3,$4,$5) returning *;

-- name: RegisterSchool :exec
Insert into schools (id,"name","location")
values ($1,$2,$3); 

-- name: RegisterGrassroots :exec
Insert into grassroots (id,"location")
values ($1,$2);

-- name: RegisterDonors :exec
Insert into donors (id,"anonymous",get_report)
values ($1,$2,$3);

-- name: AdminGetSchools1 :many
Select school_uuid,"name","location",email,phone from 
schools INNER JOIN users ON users.id=school.id  where status=1;

-- name: AdminGetSchools3 :many
Select school_uuid,"name","location",email,phone from 
schools INNER JOIN users ON users.id=school.id  where status=3;

-- name: AdminRequestSchools1 :many
Select school_uuid,request_id,"name","location","type","details","cost","created_at" from 
requests INNER JOIN schools ON requests.school_uuid=schools.school_uuid 
INNER JOIN users ON schools.id=users.id where requests.status=1;

-- name: AdminRequestSchools3 :many
Select school_uuid,request_id,"name","location","type","details","cost","created_at" from 
requests INNER JOIN schools ON requests.school_uuid=schools.school_uuid 
INNER JOIN users ON schools.id=users.id where requests.status=3;

-- name: GrassrootsGetSchools :many
Select school_uuid,"name","location",email,phone from 
schools INNER JOIN users ON users.id=school.id  where status=2;

-- name: GrassrootsGetRequests :many
Select school_uuid,request_id,"name","location","type","details","cost","created_at" from 
requests INNER JOIN schools ON requests.school_uuid=schools.school_uuid 
INNER JOIN users ON schools.id=users.id where requests.status=2;





