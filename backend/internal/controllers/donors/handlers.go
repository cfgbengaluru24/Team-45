package donors

import "github.com/jackc/pgx/v5/pgxpool"

type DonorHandler struct {
	db *pgxpool.Pool
}

func Handler(db *pgxpool.Pool) *DonorHandler {
	return &DonorHandler{
		db: db,
	}
}
