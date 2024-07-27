package grassroots

import "github.com/jackc/pgx/v5/pgxpool"

type GrassrootHandler struct {
	db *pgxpool.Pool
}

func Handler(db *pgxpool.Pool) *GrassrootHandler {
	return &GrassrootHandler{
		db: db,
	}
}
