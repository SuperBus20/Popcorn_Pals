using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Popcorn_Pals.Migrations
{
    public partial class madeshowandmovienullable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Movie_Movie_id",
                table: "Reviews");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Show_Show_id",
                table: "Reviews");

            migrationBuilder.AlterColumn<int>(
                name: "Show_id",
                table: "Reviews",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "Movie_id",
                table: "Reviews",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Movie_Movie_id",
                table: "Reviews",
                column: "Movie_id",
                principalTable: "Movie",
                principalColumn: "_id");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Show_Show_id",
                table: "Reviews",
                column: "Show_id",
                principalTable: "Show",
                principalColumn: "_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Movie_Movie_id",
                table: "Reviews");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Show_Show_id",
                table: "Reviews");

            migrationBuilder.AlterColumn<int>(
                name: "Show_id",
                table: "Reviews",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Movie_id",
                table: "Reviews",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Movie_Movie_id",
                table: "Reviews",
                column: "Movie_id",
                principalTable: "Movie",
                principalColumn: "_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Show_Show_id",
                table: "Reviews",
                column: "Show_id",
                principalTable: "Show",
                principalColumn: "_id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
