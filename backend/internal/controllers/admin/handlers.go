package admin

import "github.com/jackc/pgx/v5/pgxpool"

type AdminHandler struct {
	db *pgxpool.Pool
}

func Handler(db *pgxpool.Pool) *AdminHandler {
	return &AdminHandler{
		db: db,
	}
}
