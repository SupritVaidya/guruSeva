using System;
using System.Collections.Generic;

namespace GuruSevaBackend.Models;

public partial class Content
{
    public int Id { get; set; }

    public int SequenceNumber { get; set; }

    public string? Name { get; set; }

    public string? ContentText { get; set; }

    public string? AudioUrl { get; set; }

    public DateTimeOffset? CreatedAt { get; set; }

    [System.ComponentModel.DataAnnotations.Schema.Column("name_english")]
    public string? NameEnglish { get; set; }
}
