-- name: GetAllUsers :many
Select id, email, full_name, phone, role
from users;