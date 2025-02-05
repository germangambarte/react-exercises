package database

import (
	"database/sql"
)

type AccountRepository struct {
	Db *sql.DB
}

type Account struct {
	ID        int     `json:"id"`
	Cuil      string  `json:"cuil"`
	Firstname string  `json:"firstname"`
	Lastname  string  `json:"lastname"`
	Balance   float32 `json:"balance"`
}

func (r *AccountRepository) CreateTable() error {
	query := `
  CREATE TABLE IF NOT EXISTS accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cuil TEXT,
    firstname TEXT,
    lastname TEXT,
    balance FLOAT
  )`
	_, err := r.Db.Exec(query)
	return err
}

func (r *AccountRepository) Insert(account Account) error {
	_, err := r.Db.Exec(`
	INSERT INTO 
	accounts(cuil,firstname,lastname,balance)
	VALUES (?, ?, ?, ?)
	`, account.Cuil, account.Firstname, account.Lastname, account.Balance)
	return err
}

func (r *AccountRepository) GetAll() ([]Account, error) {
	rows, err := r.Db.Query("SELECT * FROM accounts")
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var accounts []Account
	for rows.Next() {
		var account Account
		err := rows.Scan(&account.ID, &account.Cuil, &account.Firstname, &account.Lastname, &account.Balance)
		if err != nil {
			return nil, err
		}
		accounts = append(accounts, account)
	}
	return accounts, nil
}

func (r *AccountRepository) GetById(id int) (Account, error) {
	var account Account
	err := r.Db.QueryRow("SELECT * FROM accounts WHERE id = ?", id).Scan(&account.ID, &account.Cuil, &account.Firstname, &account.Lastname, &account.Balance)
	if err != nil {
		return Account{}, err
	}
	return account, nil
}

func (r *AccountRepository) Update(account Account) error {
	_, err := r.Db.Exec(`UPDATE accounts SET
	cuil = ?,
	firstname = ?,
	lastname = ?,
	balance = ?
	WHERE id = ?
	`, account.Cuil, account.Firstname, account.Lastname, account.Balance, account.ID)
	return err
}

func (r *AccountRepository) Delete(id int) error {
	_, err := r.Db.Exec("DELETE FROM accounts WHERE id = ?", id)
	return err
}
