package com.examly.springapp.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    // 🔑 At least 32 chars for HS256
    private static final String SECRET = "MySuperSecureSecretKeyThatIsAtLeast32Chars!";
    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    // ✅ Generate JWT
    public String generateToken(String email, String role) {
        long expirationTimeMs = 1000 * 60 * 60; // 1 hour

        return Jwts.builder()
                .setSubject(email) // email as subject
                .claim("role", role) // custom role claim
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTimeMs))
                .signWith(key, SignatureAlgorithm.HS256) // sign with secure key
                .compact();
    }

    // ✅ Extract claims
    public Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // ✅ Extract email
    public String extractEmail(String token) {
        return extractClaims(token).getSubject();
    }

    // ✅ Extract role
    public String extractRole(String token) {
        return extractClaims(token).get("role", String.class);
    }

    // ✅ Check if token expired
    public boolean isTokenExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }
}
