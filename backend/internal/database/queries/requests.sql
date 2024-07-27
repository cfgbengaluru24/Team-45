-- name: GetDonorRequests :many
SELECT request_id, type, details, cost, created_at
FROM requests
WHERE status = 4;