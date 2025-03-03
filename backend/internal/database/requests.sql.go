// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: requests.sql

package database

import (
	"context"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

const getDonorRequests = `-- name: GetDonorRequests :many
SELECT request_id, type, details, cost, created_at
FROM requests
WHERE status = 4
`

type GetDonorRequestsRow struct {
	RequestID int64              `json:"request_id"`
	Type      string             `json:"type"`
	Details   *string            `json:"details"`
	Cost      int64              `json:"cost"`
	CreatedAt pgtype.Timestamptz `json:"created_at"`
}

func (q *Queries) GetDonorRequests(ctx context.Context) ([]GetDonorRequestsRow, error) {
	rows, err := q.db.Query(ctx, getDonorRequests)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []GetDonorRequestsRow
	for rows.Next() {
		var i GetDonorRequestsRow
		if err := rows.Scan(
			&i.RequestID,
			&i.Type,
			&i.Details,
			&i.Cost,
			&i.CreatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const newRequest = `-- name: NewRequest :one
INSERT INTO requests (school_uuid, type, details, cost)
VALUES ($1, $2, $3, $4)
RETURNING request_id, school_uuid, type, details, assigned_grassroot, status, cost, donated, created_at
`

type NewRequestParams struct {
	SchoolUuid uuid.UUID `json:"school_uuid"`
	Type       string    `json:"type"`
	Details    *string   `json:"details"`
	Cost       int64     `json:"cost"`
}

func (q *Queries) NewRequest(ctx context.Context, arg NewRequestParams) (Request, error) {
	row := q.db.QueryRow(ctx, newRequest,
		arg.SchoolUuid,
		arg.Type,
		arg.Details,
		arg.Cost,
	)
	var i Request
	err := row.Scan(
		&i.RequestID,
		&i.SchoolUuid,
		&i.Type,
		&i.Details,
		&i.AssignedGrassroot,
		&i.Status,
		&i.Cost,
		&i.Donated,
		&i.CreatedAt,
	)
	return i, err
}
