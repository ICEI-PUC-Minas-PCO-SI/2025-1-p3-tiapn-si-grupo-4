/*
Copyright © 2025 NAME HERE <EMAIL ADDRESS>
*/
package main

import "github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-4/cmd"

//go:generate sqlc generate -f ./internal/store/store/sqlc.yml

func main() {
	cmd.Execute()
}
