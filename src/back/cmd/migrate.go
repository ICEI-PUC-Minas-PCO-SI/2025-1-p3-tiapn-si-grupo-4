package cmd

import (
	"fmt"
	"os"
	"os/exec"

	"github.com/spf13/cobra"
)

var migrateCmd = &cobra.Command{
	Use:   "migrate [migration_name]",
	Short: "Cria uma nova migração",
	Long:  `Cria uma nova migração com o nome passado como parâmetro.`,

	Run: func(cmd *cobra.Command, args []string) {

		down, err := cmd.Flags().GetBool("down")
		if err != nil {
			return
		}

		if down {
			command := "migrate"
			argx := []string{"down", "1"}

			cmdExec := exec.Command(command, argx...)
			cmdExec.Stdout = os.Stdout
			cmdExec.Stderr = os.Stderr

			err := cmdExec.Run()
			if err != nil {
				fmt.Printf("Erro ao executar o comando: %v\n", err)
				os.Exit(1)
			}
			return
		}

		if len(args) == 0 {
			cmd.Help()
			return
		}

		migrationName := args[0]

		command := "migrate"
		argx := []string{"create", "-ext", "sql", "-dir", "./internal/store/store/migrations", "-seq", migrationName}

		cmdExec := exec.Command(command, argx...)
		cmdExec.Stdout = os.Stdout
		cmdExec.Stderr = os.Stderr

		err = cmdExec.Run()
		if err != nil {
			fmt.Printf("Erro ao executar o comando: %v\n", err)
			os.Exit(1)
		}

		generate, err := cmd.Flags().GetBool("generate")
		if err != nil {
			return
		}

		if generate {
			command := "go"
			argx := []string{"generate", "./..."}

			cmdExec := exec.Command(command, argx...)
			cmdExec.Stdout = os.Stdout
			cmdExec.Stderr = os.Stderr

			err := cmdExec.Run()
			if err != nil {
				fmt.Printf("Erro ao executar o comando: %v\n", err)
				os.Exit(1)
			}
		}
	},
}

func init() {

	migrateCmd.Flags().BoolP("generate", "g", false, "After create the migration execute sqlc generate (go generate ./...)")
	migrateCmd.Flags().BoolP("down", "d", false, "Go down on migrations")

	rootCmd.AddCommand(migrateCmd)
}
