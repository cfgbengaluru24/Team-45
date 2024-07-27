-- name: GetDonorRequests :many
SELECT request_id, type, details, cost, created_at
FROM requests
WHERE status = 4;

-- name: NewRequest :one
INSERT INTO requests (school_uuid, type, details, cost)
VALUES ($1, $2, $3, $4)
RETURNING *;