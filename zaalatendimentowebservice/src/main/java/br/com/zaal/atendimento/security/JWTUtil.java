package br.com.zaal.atendimento.security;

import br.com.zaal.atendimento.entity.Funcionario;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JWTUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private Long expiration;

    public String generateToken(Funcionario funcionario) {
        return Jwts.builder()
                .claim("id", funcionario.getId().toString())
                .claim("nome", funcionario.getNome())
                .claim("usuario", funcionario.getUsuario())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(SignatureAlgorithm.HS512, secret.getBytes())
                .compact();
    }

    public boolean tokenValido(String token) {
        Claims claims = getClaims(token);
        if (claims != null){
            Long id = Long.parseLong(claims.get("id", String.class));
            String nome = claims.get("nome", String.class);
            String usuario = claims.get("usuario", String.class);
            Date expirationDate = claims.getExpiration();
            Date now = new Date(System.currentTimeMillis());
            if (id != null && nome != null && usuario != null && expirationDate != null && now.before(expirationDate)) {
                return true;
            }
        }
        return false;
    }

    private Claims getClaims(String token) {
        try {
            return Jwts.parser().setSigningKey(secret.getBytes()).parseClaimsJws(token).getBody();
        }
        catch (Exception e){
            return null;
        }
    }

    public String getUsername(String token) {
        Claims claims = getClaims(token);
        if (claims != null){
            return claims.get("usuario", String.class);
        }
        return null;
    }
}
