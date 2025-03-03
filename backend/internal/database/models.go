// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0

package database

import (
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type Donation struct {
	DonationID int64              `json:"donation_id"`
	DonorUuid  uuid.UUID          `json:"donor_uuid"`
	Amount     int64              `json:"amount"`
	RequestID  *int64             `json:"request_id"`
	CreatedAt  pgtype.Timestamptz `json:"created_at"`
}

type Donor struct {
	DonorUuid uuid.UUID `json:"donor_uuid"`
	ID        int64     `json:"id"`
	Anonymous bool      `json:"anonymous"`
	GetReport bool      `json:"get_report"`
	Donated   int64     `json:"donated"`
}

type Grassroot struct {
	GrassrootUuid uuid.UUID `json:"grassroot_uuid"`
	ID            int64     `json:"id"`
	Location      string    `json:"location"`
}

type Record struct {
	RecordID  int64              `json:"record_id"`
	Docname   string             `json:"docname"`
	Doc       []byte             `json:"doc"`
	RequestID int64              `json:"request_id"`
	CreatedAt pgtype.Timestamptz `json:"created_at"`
}

type Request struct {
	RequestID         int64              `json:"request_id"`
	SchoolUuid        uuid.UUID          `json:"school_uuid"`
	Type              string             `json:"type"`
	Details           *string            `json:"details"`
	AssignedGrassroot pgtype.UUID        `json:"assigned_grassroot"`
	Status            int32              `json:"status"`
	Cost              int64              `json:"cost"`
	Donated           int64              `json:"donated"`
	CreatedAt         pgtype.Timestamptz `json:"created_at"`
}

type RequestStatus struct {
	Key         int32  `json:"key"`
	Description string `json:"description"`
}

type School struct {
	SchoolUuid        uuid.UUID   `json:"school_uuid"`
	ID                int64       `json:"id"`
	Name              string      `json:"name"`
	Location          string      `json:"location"`
	AssignedGrassroot pgtype.UUID `json:"assigned_grassroot"`
	Status            int32       `json:"status"`
}

type Student struct {
	StudentUuid uuid.UUID `json:"student_uuid"`
	SchoolUuid  uuid.UUID `json:"school_uuid"`
	Name        string    `json:"name"`
	Grade       string    `json:"grade"`
	RequestID   *int64    `json:"request_id"`
}

type User struct {
	ID           int64  `json:"id"`
	Email        string `json:"email"`
	FullName     string `json:"full_name"`
	Phone        string `json:"phone"`
	Role         string `json:"role"`
	PasswordHash []byte `json:"password_hash"`
}
