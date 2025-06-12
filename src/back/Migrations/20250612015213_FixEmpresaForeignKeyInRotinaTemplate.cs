using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace back.Migrations
{
    /// <inheritdoc />
    public partial class FixEmpresaForeignKeyInRotinaTemplate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TEMPLATE_ROTINAS_EMPRESAS_IdEmpresa",
                schema: "dbo",
                table: "TEMPLATE_ROTINAS");

            migrationBuilder.DropIndex(
                name: "IX_TEMPLATE_ROTINAS_IdEmpresa",
                schema: "dbo",
                table: "TEMPLATE_ROTINAS");

            migrationBuilder.DropColumn(
                name: "IdEmpresa",
                schema: "dbo",
                table: "TEMPLATE_ROTINAS");

            migrationBuilder.CreateIndex(
                name: "IX_TEMPLATE_ROTINAS_EmpresaId",
                schema: "dbo",
                table: "TEMPLATE_ROTINAS",
                column: "EmpresaId");

            migrationBuilder.AddForeignKey(
                name: "FK_TEMPLATE_ROTINAS_EMPRESAS_EmpresaId",
                schema: "dbo",
                table: "TEMPLATE_ROTINAS",
                column: "EmpresaId",
                principalSchema: "dbo",
                principalTable: "EMPRESAS",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TEMPLATE_ROTINAS_EMPRESAS_EmpresaId",
                schema: "dbo",
                table: "TEMPLATE_ROTINAS");

            migrationBuilder.DropIndex(
                name: "IX_TEMPLATE_ROTINAS_EmpresaId",
                schema: "dbo",
                table: "TEMPLATE_ROTINAS");

            migrationBuilder.AddColumn<int>(
                name: "IdEmpresa",
                schema: "dbo",
                table: "TEMPLATE_ROTINAS",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_TEMPLATE_ROTINAS_IdEmpresa",
                schema: "dbo",
                table: "TEMPLATE_ROTINAS",
                column: "IdEmpresa");

            migrationBuilder.AddForeignKey(
                name: "FK_TEMPLATE_ROTINAS_EMPRESAS_IdEmpresa",
                schema: "dbo",
                table: "TEMPLATE_ROTINAS",
                column: "IdEmpresa",
                principalSchema: "dbo",
                principalTable: "EMPRESAS",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
