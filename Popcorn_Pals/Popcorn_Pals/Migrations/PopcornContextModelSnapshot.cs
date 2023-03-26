﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Popcorn_Pals;

#nullable disable

namespace Popcorn_Pals.Migrations
{
    [DbContext(typeof(PopcornContext))]
    partial class PopcornContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.14")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("Popcorn_Pals.Models.Favorite", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int?>("MovieId")
                        .HasColumnType("int");

                    b.Property<int?>("ShowId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Favorites");
                });

            modelBuilder.Entity("Popcorn_Pals.Models.Follow", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int?>("FollowerId")
                        .HasColumnType("int");

                    b.Property<int?>("FollowingId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Follows");
                });

            modelBuilder.Entity("Popcorn_Pals.Models.Movie", b =>
                {
                    b.Property<int>("_id")
                        .HasColumnType("int");

                    b.Property<string>("overview")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("poster_path")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("release_date")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("youtube_trailer")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("_id");

                    b.ToTable("Movie");
                });

            modelBuilder.Entity("Popcorn_Pals.Models.Show", b =>
                {
                    b.Property<int>("_id")
                        .HasColumnType("int");

                    b.Property<string>("first_aired")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("overview")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("poster_path")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("youtube_trailer")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("_id");

                    b.ToTable("Show");
                });

            modelBuilder.Entity("Popcorn_Pals.Models.Source", b =>
                {
                    b.Property<string>("link")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("source")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("type")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.ToTable("Source");
                });

            modelBuilder.Entity("Popcorn_Pals.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserId"), 1L, 1);

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserBio")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserPic")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserRating")
                        .HasColumnType("int");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Popcorn_Pals.Models.UserReview", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("MediaId")
                        .HasColumnType("int");

                    b.Property<int?>("Movie_id")
                        .HasColumnType("int");

                    b.Property<int>("Rating")
                        .HasColumnType("int");

                    b.Property<string>("Review")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Show_id")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("Movie_id");

                    b.HasIndex("Show_id");

                    b.HasIndex("UserId");

                    b.ToTable("Reviews");
                });

            modelBuilder.Entity("Popcorn_Pals.Models.Favorite", b =>
                {
                    b.HasOne("Popcorn_Pals.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Popcorn_Pals.Models.Follow", b =>
                {
                    b.HasOne("Popcorn_Pals.Models.User", "user")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("user");
                });

            modelBuilder.Entity("Popcorn_Pals.Models.UserReview", b =>
                {
                    b.HasOne("Popcorn_Pals.Models.Movie", "Movie")
                        .WithMany()
                        .HasForeignKey("Movie_id");

                    b.HasOne("Popcorn_Pals.Models.Show", "Show")
                        .WithMany()
                        .HasForeignKey("Show_id");

                    b.HasOne("Popcorn_Pals.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Movie");

                    b.Navigation("Show");

                    b.Navigation("User");
                });
#pragma warning restore 612, 618
        }
    }
}
