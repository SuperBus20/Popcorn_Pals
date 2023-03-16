using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Popcorn_Pals.Migrations
{
  public partial class init : Migration
  {
    protected override void Up(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.CreateTable(
          name: "Movie",
          columns: table => new
          {
            _id = table.Column<int>(type: "int", nullable: false),
            title = table.Column<string>(type: "nvarchar(max)", nullable: false),
            overview = table.Column<string>(type: "nvarchar(max)", nullable: false),
            poster_path = table.Column<string>(type: "nvarchar(max)", nullable: false),
            release_date = table.Column<string>(type: "nvarchar(max)", nullable: false),
            youtube_trailer = table.Column<string>(type: "nvarchar(max)", nullable: false)
          },
          constraints: table =>
          {
            table.PrimaryKey("PK_Movie", x => x._id);
          });

      migrationBuilder.CreateTable(
          name: "Show",
          columns: table => new
          {
            _id = table.Column<int>(type: "int", nullable: false),
            first_aired = table.Column<string>(type: "nvarchar(max)", nullable: false),
            overview = table.Column<string>(type: "nvarchar(max)", nullable: false),
            poster_path = table.Column<string>(type: "nvarchar(max)", nullable: false),
            title = table.Column<string>(type: "nvarchar(max)", nullable: false),
            youtube_trailer = table.Column<string>(type: "nvarchar(max)", nullable: false)
          },
          constraints: table =>
          {
            table.PrimaryKey("PK_Show", x => x._id);
          });

      migrationBuilder.CreateTable(
          name: "Source",
          columns: table => new
          {
            source = table.Column<string>(type: "nvarchar(max)", nullable: false),
            link = table.Column<string>(type: "nvarchar(max)", nullable: false),
            type = table.Column<string>(type: "nvarchar(max)", nullable: false)
          },
          constraints: table =>
          {
          });

      migrationBuilder.CreateTable(
          name: "Users",
          columns: table => new
          {
            UserId = table.Column<int>(type: "int", nullable: false)
                  .Annotation("SqlServer:Identity", "1, 1"),
            UserName = table.Column<string>(type: "nvarchar(max)", nullable: false),
            Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
            UserRating = table.Column<int>(type: "int", nullable: false),
            UserPic = table.Column<string>(type: "nvarchar(max)", nullable: true),
            UserBio = table.Column<string>(type: "nvarchar(max)", nullable: true)
          },
          constraints: table =>
          {
            table.PrimaryKey("PK_Users", x => x.UserId);
          });

      migrationBuilder.CreateTable(
          name: "Reviews",
          columns: table => new
          {
            Id = table.Column<int>(type: "int", nullable: false)
                  .Annotation("SqlServer:Identity", "1, 1"),
            UserId = table.Column<int>(type: "int", nullable: false),
            MediaId = table.Column<int>(type: "int", nullable: false),
            Movie_id = table.Column<int>(type: "int", nullable: false),
            Show_id = table.Column<int>(type: "int", nullable: false),
            Review = table.Column<string>(type: "nvarchar(max)", nullable: false),
            Rating = table.Column<int>(type: "int", nullable: false)
          },
          constraints: table =>
          {
            table.PrimaryKey("PK_Reviews", x => x.Id);
            table.ForeignKey(
                      name: "FK_Reviews_Movie_Movie_id",
                      column: x => x.Movie_id,
                      principalTable: "Movie",
                      principalColumn: "_id",
                      onDelete: ReferentialAction.Cascade);
            table.ForeignKey(
                      name: "FK_Reviews_Show_Show_id",
                      column: x => x.Show_id,
                      principalTable: "Show",
                      principalColumn: "_id",
                      onDelete: ReferentialAction.Cascade);
            table.ForeignKey(
                      name: "FK_Reviews_Users_UserId",
                      column: x => x.UserId,
                      principalTable: "Users",
                      principalColumn: "UserId",
                      onDelete: ReferentialAction.Cascade);
          });

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
          name: "IX_Reviews_Movie_id",
          table: "Reviews",
          column: "Movie_id");

      migrationBuilder.CreateIndex(
          name: "IX_Reviews_Show_id",
          table: "Reviews",
          column: "Show_id");

      migrationBuilder.CreateIndex(
          name: "IX_Reviews_UserId",
          table: "Reviews",
          column: "UserId");

      migrationBuilder.CreateIndex(
          name: "IX_Follow_FollowingUserId",
          table: "Follow",
          column: "FollowingUserId");
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DropTable(
          name: "Reviews");

      migrationBuilder.DropTable(
          name: "Source");

      migrationBuilder.DropTable(
          name: "Follow");

      migrationBuilder.DropTable(
          name: "Movie");

      migrationBuilder.DropTable(
          name: "Show");

      migrationBuilder.DropTable(
          name: "Users");
    }
  }
}
