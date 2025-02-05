package main

import (
	"database/sql"
	"go-server/database"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	_ "github.com/mattn/go-sqlite3"
)

func main() {
	db, err := sql.Open("sqlite3", "./bank.db")
	if err != nil {
		log.Fatal("Error al abrir la base de datos:", err)
	}
	accountRepository := database.AccountRepository{Db: db}
	accountRepository.CreateTable()

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:1234",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	app.Get("/healthcheck", func(c *fiber.Ctx) error {
		return c.SendString("OK")
	})

	app.Get("/api/accounts/:id", func(c *fiber.Ctx) error {
		id, err := c.ParamsInt("id")
		if err != nil {
			return c.Status(401).SendString("Invalid id.")
		}

		a, err := accountRepository.GetById(id)
		if err != nil {
			return c.Status(404).SendString("Account not found.")
		}

		return c.JSON(a)

	})

	app.Get("/api/accounts", func(c *fiber.Ctx) error {
		v, err := accountRepository.GetAll()
		if err != nil {
			return err
		}
		return c.JSON(v)
	})

	app.Post("/api/accounts", func(c *fiber.Ctx) error {
		newAccount := &database.Account{}
		err := c.BodyParser(newAccount)
		if err != nil {
			return err
		}
		err = accountRepository.Insert(*newAccount)
		if err != nil {
			return err
		}
		return c.SendStatus(fiber.StatusCreated)
	})

	app.Patch("/api/accounts/:id/balance", func(c *fiber.Ctx) error {
		id, err := c.ParamsInt("id")
		if err != nil {
			return c.Status(401).SendString("Invalid id.")
		}
		v, err := accountRepository.GetById(id)
		if err != nil {
			return c.Status(404).SendString("Account not found.")
		}
		var request struct {
			Balance float32 `json:"balance"`
		}
		err = c.BodyParser(&request)
		if err != nil {
			return c.Status(401).SendString("Invalid balance.")
		}
		v.Balance = request.Balance
		err = accountRepository.Update(v)
		if err != nil {
			return err
		}
		return c.JSON(v)
	})

	log.Fatal(app.Listen(":4000"))

}
