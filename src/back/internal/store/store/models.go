// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0

package store

import (
	"database/sql"
	"time"
)

type Log struct {
	ID         string
	Servertime time.Time
	Log        string
	Level      string
	Source     sql.NullString
	CreatedAt  time.Time
}
