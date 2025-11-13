using System;
using System.Collections.Generic;

namespace GuruSevaBackend.Models;

public partial class AdminRequest
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public string? UserName { get; set; }

    public virtual User? User { get; set; }
}
