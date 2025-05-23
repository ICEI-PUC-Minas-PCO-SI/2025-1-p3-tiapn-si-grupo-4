using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace back.Migrations
{
    /// <inheritdoc />
    public partial class RotinaTemplate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Empresas",
                table: "Empresas");

            migrationBuilder.EnsureSchema(
                name: "dbo");

            migrationBuilder.RenameTable(
                name: "Empresas",
                newName: "EMPRESAS",
                newSchema: "dbo");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EMPRESAS",
                schema: "dbo",
                table: "EMPRESAS",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "TEMPLATE_ROTINAS",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Nome = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EmpresaId = table.Column<int>(type: "int", nullable: false),
                    Prioridade = table.Column<int>(type: "int", nullable: false),
                    Descricao = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Ativo = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TEMPLATE_ROTINAS", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TEMPLATE_ROTINAS_EMPRESAS_EmpresaId",
                        column: x => x.EmpresaId,
                        principalSchema: "dbo",
                        principalTable: "EMPRESAS",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "idx_template_rotina_nome",
                schema: "dbo",
                table: "TEMPLATE_ROTINAS",
                column: "Nome");

            migrationBuilder.CreateIndex(
                name: "IX_TEMPLATE_ROTINAS_EmpresaId",
                schema: "dbo",
                table: "TEMPLATE_ROTINAS",
                column: "EmpresaId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TEMPLATE_ROTINAS",
                schema: "dbo");

            migrationBuilder.DropPrimaryKey(
                name: "PK_EMPRESAS",
                schema: "dbo",
                table: "EMPRESAS");

            migrationBuilder.RenameTable(
                name: "EMPRESAS",
                schema: "dbo",
                newName: "Empresas");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Empresas",
                table: "Empresas",
                column: "Id");
        }
    }
}
