using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Popcorn_Pals.Migrations
{
    public partial class UpdatingReviewTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Movies_Movie_id",
                table: "Reviews");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Shows_Show_id",
                table: "Reviews");

            migrationBuilder.RenameColumn(
                name: "Show_id",
                table: "Reviews",
                newName: "Shows_id");

            migrationBuilder.RenameColumn(
                name: "Movie_id",
                table: "Reviews",
                newName: "Movies_id");

            migrationBuilder.RenameIndex(
                name: "IX_Reviews_Show_id",
                table: "Reviews",
                newName: "IX_Reviews_Shows_id");

            migrationBuilder.RenameIndex(
                name: "IX_Reviews_Movie_id",
                table: "Reviews",
                newName: "IX_Reviews_Movies_id");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Movies_Movies_id",
                table: "Reviews",
                column: "Movies_id",
                principalTable: "Movies",
                principalColumn: "_id");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Shows_Shows_id",
                table: "Reviews",
                column: "Shows_id",
                principalTable: "Shows",
                principalColumn: "_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Movies_Movies_id",
                table: "Reviews");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Shows_Shows_id",
                table: "Reviews");

            migrationBuilder.RenameColumn(
                name: "Shows_id",
                table: "Reviews",
                newName: "Show_id");

            migrationBuilder.RenameColumn(
                name: "Movies_id",
                table: "Reviews",
                newName: "Movie_id");

            migrationBuilder.RenameIndex(
                name: "IX_Reviews_Shows_id",
                table: "Reviews",
                newName: "IX_Reviews_Show_id");

            migrationBuilder.RenameIndex(
                name: "IX_Reviews_Movies_id",
                table: "Reviews",
                newName: "IX_Reviews_Movie_id");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Movies_Movie_id",
                table: "Reviews",
                column: "Movie_id",
                principalTable: "Movies",
                principalColumn: "_id");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Shows_Show_id",
                table: "Reviews",
                column: "Show_id",
                principalTable: "Shows",
                principalColumn: "_id");
        }
    }
}
