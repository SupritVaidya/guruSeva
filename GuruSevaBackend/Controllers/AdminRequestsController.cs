        using System;
        using System.Collections.Generic;
        using System.Linq;
        using System.Threading.Tasks;
        using Microsoft.AspNetCore.Http;
        using Microsoft.AspNetCore.Mvc;
        using Microsoft.EntityFrameworkCore;
        using GuruSevaBackend.Models;

        namespace GuruSevaBackend.Controllers
        {
            [Route("api/[controller]")]
            [ApiController]
            public class AdminRequestsController : ControllerBase
            {
                private readonly GuruSevaDbContext _context;

                public AdminRequestsController(GuruSevaDbContext context)
                {
                    _context = context;
                }

                // PUT: api/AdminRequests/approve/5
                [HttpPut("approve/{id}")]
                public async Task<IActionResult> ApproveRequest(int id)
                {
                    var adminRequest = await _context.AdminRequests.FindAsync(id);
                    if (adminRequest == null || adminRequest.UserId == null)
                    {
                        return NotFound();
                    }

                    var user = await _context.Users.FindAsync(adminRequest.UserId);
                    if (user == null)
                    {
                        return NotFound();
                    }

                    user.IsApproved = true;
                    _context.Users.Update(user);
                    _context.AdminRequests.Remove(adminRequest);
                    await _context.SaveChangesAsync();

                    return NoContent();
                }

                // GET: api/AdminRequests
                [HttpGet]
                public async Task<ActionResult<IEnumerable<AdminRequest>>> GetAdminRequests()
                {
                    return await _context.AdminRequests.ToListAsync();
                }

                // GET: api/AdminRequests/5
                [HttpGet("{id}")]
                public async Task<ActionResult<AdminRequest>> GetAdminRequest(int id)
                {
                    var adminRequest = await _context.AdminRequests.FindAsync(id);

                    if (adminRequest == null)
                    {
                        return NotFound();
                    }

                    return adminRequest;
                }

                // PUT: api/AdminRequests/5
                // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
                [HttpPut("{id}")]
                public async Task<IActionResult> PutAdminRequest(int id, AdminRequest adminRequest)
                {
                    if (id != adminRequest.Id)
                    {
                        return BadRequest();
                    }

                    _context.Entry(adminRequest).State = EntityState.Modified;

                    try
                    {
                        await _context.SaveChangesAsync();
                    }
                    catch (DbUpdateConcurrencyException)
                    {
                        if (!AdminRequestExists(id))
                        {
                            return NotFound();
                        }
                        else
                        {
                            throw;
                        }
                    }

                    return NoContent();
                }

                // POST: api/AdminRequests
                // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
                [HttpPost]
                public async Task<ActionResult<AdminRequest>> PostAdminRequest(AdminRequest adminRequest)
                {
                    _context.AdminRequests.Add(adminRequest);
                    await _context.SaveChangesAsync();

                    return CreatedAtAction("GetAdminRequest", new { id = adminRequest.Id }, adminRequest);
                }

                // DELETE: api/AdminRequests/5
                [HttpDelete("{id}")]
                public async Task<IActionResult> DeleteAdminRequest(int id)
                {
                    var adminRequest = await _context.AdminRequests.FindAsync(id);
                    if (adminRequest == null)
                    {
                        return NotFound();
                    }

                    _context.AdminRequests.Remove(adminRequest);
                    await _context.SaveChangesAsync();

                    return NoContent();
                }

                private bool AdminRequestExists(int id)
                {
                    return _context.AdminRequests.Any(e => e.Id == id);
                }
            }
        }
