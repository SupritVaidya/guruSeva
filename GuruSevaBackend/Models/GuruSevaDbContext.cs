using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace GuruSevaBackend.Models;

public partial class GuruSevaDbContext : DbContext
{
    public GuruSevaDbContext()
    {
    }

    public GuruSevaDbContext(DbContextOptions<GuruSevaDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<AdminRequest> AdminRequests { get; set; }

    public virtual DbSet<Content> Contents { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=GuruSevaDB;Trusted_Connection=True;MultipleActiveResultSets=true");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AdminRequest>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__AdminReq__3213E83F305E221F");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.UserName)
                .HasMaxLength(255)
                .HasColumnName("user_name");
        });

        modelBuilder.Entity<Content>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__content__3213E83FF2D5F911");

            entity.ToTable("content");

            entity.HasIndex(e => e.SequenceNumber, "UQ__content__C0A31A147A48377A").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AudioUrl)
                .HasMaxLength(500)
                .IsUnicode(false)
                .HasColumnName("audio_url");
            entity.Property(e => e.ContentText).HasColumnName("content_text");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(sysdatetimeoffset())")
                .HasColumnName("created_at");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.NameEnglish)
                .HasMaxLength(255)
                .HasColumnName("name_english");
            entity.Property(e => e.SequenceNumber).HasColumnName("sequence_number");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__users__3213E83F66020254");

            entity.ToTable("users");

            entity.HasIndex(e => e.Username, "UQ__users__F3DBC572E4D58710").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(sysdatetimeoffset())")
                .HasColumnName("created_at");
            entity.Property(e => e.IsAdmin).HasColumnName("isAdmin");
            entity.Property(e => e.IsApproved).HasColumnName("isApproved");
            entity.Property(e => e.PasswordHash)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("password_hash");
            entity.Property(e => e.Username)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("username");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
