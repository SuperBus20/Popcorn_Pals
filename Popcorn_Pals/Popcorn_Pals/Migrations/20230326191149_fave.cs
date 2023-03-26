using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Popcorn_Pals.Migrations
{
    public partial class fave : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Favorites_Movie_MovieId",
                table: "Favorites");

            migrationBuilder.DropForeignKey(
                name: "FK_Favorites_Show_ShowId",
                table: "Favorites");

            migrationBuilder.DropIndex(
                name: "IX_Favorites_MovieId",
                table: "Favorites");

            migrationBuilder.DropIndex(
                name: "IX_Favorites_ShowId",
                table: "Favorites");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Favorites_MovieId",
                table: "Favorites",
                column: "MovieId");

            migrationBuilder.CreateIndex(
                name: "IX_Favorites_ShowId",
                table: "Favorites",
                column: "ShowId");

            migrationBuilder.AddForeignKey(
                name: "FK_Favorites_Movie_MovieId",
                table: "Favorites",
                column: "MovieId",
                principalTable: "Movie",
                principalColumn: "_id");

            migrationBuilder.AddForeignKey(
                name: "FK_Favorites_Show_ShowId",
                table: "Favorites",
                column: "ShowId",
                principalTable: "Show",
                principalColumn: "_id");
        }
    }
}
