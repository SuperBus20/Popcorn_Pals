using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Popcorn_Pals.Migrations
{
    public partial class updatevirtual : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Follow");

            migrationBuilder.CreateTable(
                name: "UserUser",
                columns: table => new
                {
                    FollowersUserId = table.Column<int>(type: "int", nullable: false),
                    FollowingUserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserUser", x => new { x.FollowersUserId, x.FollowingUserId });
                    table.ForeignKey(
                        name: "FK_UserUser_Users_FollowersUserId",
                        column: x => x.FollowersUserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserUser_Users_FollowingUserId",
                        column: x => x.FollowingUserId,
                        principalTable: "Users",
                        principalColumn: "UserId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserUser_FollowingUserId",
                table: "UserUser",
                column: "FollowingUserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserUser");

            migrationBuilder.CreateTable(
                name: "Follow",
                columns: table => new
                {
                    FollowersUserId = table.Column<int>(type: "int", nullable: false),
                    FollowingUserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Follow", x => new { x.FollowersUserId, x.FollowingUserId });
                    table.ForeignKey(
                        name: "FK_Follow_Users_FollowersUserId",
                        column: x => x.FollowersUserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Follow_Users_FollowingUserId",
                        column: x => x.FollowingUserId,
                        principalTable: "Users",
                        principalColumn: "UserId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Follow_FollowingUserId",
                table: "Follow",
                column: "FollowingUserId");
        }
    }
}
