/*
Copyright © 2025 Melitus 
*/
package cmd

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var cfgFile string

var rootCmd = &cobra.Command{
	Use:   "root",
	Short: "Ferramenta para ajudar na criação de recursos do aplicativo melitus",
	Long: `
Ferramenta para auxiliar a criar recursos como:
	- Criar novas migrations
	- Aplicar migration
	- Criar novas rotas
	- Criar novos repositorios
	- Criar novas usecases
	`,
	// Run: func(cmd *cobra.Command, args []string) { },
}

func Execute() {
	err := rootCmd.Execute()
	if err != nil {
		os.Exit(1)
	}
}

func init() {
	cobra.OnInitialize(initConfig)
	rootCmd.PersistentFlags().StringVar(&cfgFile, "config", "", "config file (default is $HOME/.2025-1-p3-tiapn-si-grupo-4.yaml)")

	rootCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}

func initConfig() {
	if cfgFile != "" {
		viper.SetConfigFile(cfgFile)
	} else {
		home, err := os.UserHomeDir()
		cobra.CheckErr(err)

		viper.AddConfigPath(home)
		viper.SetConfigType("yaml")
		viper.SetConfigName(".2025-1-p3-tiapn-si-grupo-4")
	}

	viper.AutomaticEnv() 

	if err := viper.ReadInConfig(); err == nil {
		fmt.Fprintln(os.Stderr, "Using config file:", viper.ConfigFileUsed())
	}
}
