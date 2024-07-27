-- name: GetForDonor :many
SELECT d.donation_id, d.amount, d.created_at, r.type, r.details
FROM donations d
INNER JOIN requests r on d.request_id = r.request_id
WHERE donor_uuid = $1
ORDER BY d.created_at desc;