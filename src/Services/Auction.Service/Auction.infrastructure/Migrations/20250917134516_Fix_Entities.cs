using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Auction.infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Fix_Entities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Items");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Auctions");

            migrationBuilder.RenameColumn(
                name: "Winner",
                table: "Auctions",
                newName: "Model");

            migrationBuilder.RenameColumn(
                name: "ReservePrice",
                table: "Auctions",
                newName: "Year");

            migrationBuilder.RenameColumn(
                name: "CurrentHighBid",
                table: "Auctions",
                newName: "Mileage");

            migrationBuilder.AddColumn<string>(
                name: "Color",
                table: "Auctions",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Auctions",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Make",
                table: "Auctions",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Color",
                table: "Auctions");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Auctions");

            migrationBuilder.DropColumn(
                name: "Make",
                table: "Auctions");

            migrationBuilder.RenameColumn(
                name: "Year",
                table: "Auctions",
                newName: "ReservePrice");

            migrationBuilder.RenameColumn(
                name: "Model",
                table: "Auctions",
                newName: "Winner");

            migrationBuilder.RenameColumn(
                name: "Mileage",
                table: "Auctions",
                newName: "CurrentHighBid");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Auctions",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    AuctionId = table.Column<Guid>(type: "uuid", nullable: false),
                    Color = table.Column<string>(type: "text", nullable: true),
                    ImageUrl = table.Column<string>(type: "text", nullable: true),
                    Make = table.Column<string>(type: "text", nullable: true),
                    Mileage = table.Column<int>(type: "integer", nullable: false),
                    Model = table.Column<string>(type: "text", nullable: true),
                    Year = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Items_Auctions_AuctionId",
                        column: x => x.AuctionId,
                        principalTable: "Auctions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Items_AuctionId",
                table: "Items",
                column: "AuctionId",
                unique: true);
        }
    }
}
