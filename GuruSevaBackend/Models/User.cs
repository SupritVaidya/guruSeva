using System;
using System.Collections.Generic;

namespace GuruSevaBackend.Models;

public partial class User
{
    public int Id { get; set; }

    public string Username { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public bool IsAdmin { get; set; }

    public bool IsApproved { get; set; }

    public DateTimeOffset? CreatedAt { get; set; }

    public virtual ICollection<AdminRequest> AdminRequests { get; set; } = new List<AdminRequest>();
}
