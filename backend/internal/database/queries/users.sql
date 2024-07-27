-- name: GetAllUsers :many
Select id, email, full_name, phone, role
from users;

-- name: RegisterUser :one
Insert into users(email,full_name,phone,"role",password_hash) values ($1,$2,$3,$4,$5) returning *;

-- name: RegisterSchool :exec
Insert into schools(id,"name","location") values ($1,$2,$3); 

-- name: RegisterGrassroots :exec
Insert into grassroots(id,"location") values ($1,$2);

-- name: RegisterDonors :exec
Insert into donors(id,"anonymous",get_report,donated) values ($1,$2,$3,$4);




