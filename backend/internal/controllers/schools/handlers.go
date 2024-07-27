package schools

import "github.com/jackc/pgx/v5/pgxpool"

type SchoolHandler struct {
	db *pgxpool.Pool
}

func Handler(db *pgxpool.Pool) *SchoolHandler {
	return &SchoolHandler{
		db: db,
	}
}
