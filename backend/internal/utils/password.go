package utils

import "golang.org/x/crypto/bcrypt"

func PasswordHash(password string) ([]byte, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), 12)
	if err != nil {
		return nil, err
	}

	return hash, nil
}
