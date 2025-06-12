using back.Entities;
using Microsoft.EntityFrameworkCore;
using back.Models;   

namespace service;

public class AuthService
{
    private readonly MyDbContext _context;

    public AuthService(MyDbContext context)
    {
        _context = context;
    }

    public UserModel? Autenticar(string login, string senha)
    {
        var loginModel = _context.Login
            .Include(l => l.Usuario)
            .FirstOrDefault(l => l.Login == login);

        if (loginModel == null) return null;

        if (BCrypt.Net.BCrypt.Verify(senha, loginModel.Senha))
        {
            return loginModel.Usuario;
        }

        return null;
    }
}