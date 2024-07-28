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
Select schools.school_uuid,request_id,"name","location","type","details","cost","created_at" from 
requests INNER JOIN schools ON requests.school_uuid=schools.school_uuid 
INNER JOIN users ON schools.id=users.id where requests.status=1;

-- name: AdminRequestSchools3 :many
Select schools.school_uuid,request_id,"name","location","type","details","cost","created_at" from 
requests INNER JOIN schools ON requests.school_uuid=schools.school_uuid 
INNER JOIN users ON schools.id=users.id where requests.status=3;

-- name: GrassrootsGetSchools :many
Select school_uuid,"name","location",email,phone
from schools INNER JOIN users ON users.id=school.id
where status=2 and schools.assigned_grassroot = $1;

-- name: GrassrootsGetRequests :many
Select schools.school_uuid,request_id,"name","location","type","details","cost","created_at"
from requests
INNER JOIN schools ON requests.school_uuid=schools.school_uuid 
INNER JOIN users ON schools.id=users.id where requests.status=2 and requests.assigned_grassroot = $1;

-- name: UpdateSchoolStatus :exec
Update schools set status=$2 where school_uuid=$1;

-- name: UpdateRequestStatus :exec
Update requests set status=$2 where request_id=$1;

-- name: AssignGrassrootToRequest :exec
UPDATE requests
SET assigned_grassroot = $1 
WHERE request_id = $2;

-- name: AssignGrassrootToSchool :exec
UPDATE schools
SET assigned_grassroot = $1 
WHERE school_uuid = $2;

-- name: CreateDonation :exec
INSERT INTO donations (donor_uuid, amount, request_id)
values ($1, $2, $3);

-- name: UpdateTotalDonation :exec
UPDATE donors
SET donated = donated + $1
WHERE donor_uuid = $2;

-- name: UpdateRequestAfterDonation :exec
UPDATE requests
SET donated = donated + $1, status = 6
WHERE request_id = $2;