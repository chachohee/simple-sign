package com.example.simplesign.security;

import org.springframework.stereotype.Service;

import com.nimbusds.jose.*;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;

import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;

import java.time.Instant;
import java.util.Date;

@Service
public class TokenProvider {
    private static final String SECURITY_KEY = "ThisIsASecretKeyThatIsAtLeast32BytesLong"; // 적절한 길이의 키 설정

    // JWT 생성 메서드
    public String createJwt(String email, int duration) {
        try {
            // 현재 시간 기준 1시간 뒤로 만료시간 설정
            Instant now = Instant.now();
            Instant exprTime = now.plusSeconds(duration);

            // JWTClaimsSet 설정
            JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                    .subject(email)
                    .issueTime(Date.from(now))
                    .expirationTime(Date.from(exprTime))
                    .build();

            // JWT 서명
            SignedJWT signedJWT = new SignedJWT(
                    new JWSHeader(JWSAlgorithm.HS256), // 헤더 설정
                    claimsSet
            );

            // HMAC 서명을 사용하여 JWT 서명
            signedJWT.sign(new MACSigner(SECURITY_KEY.getBytes()));

            // 직렬화된 JWT를 반환
            return signedJWT.serialize();
        } catch (JOSEException e) {
            e.printStackTrace(); // 예외 발생 시 스택 트레이스 출력
            return null; // 예외 발생 시 null 반환
        }
    }

    // JWT 검증 메서드
    public String validateJwt(String token) {
        try {
            // 서명 확인을 통한 JWT 검증
            SignedJWT signedJWT = SignedJWT.parse(token);
            JWSVerifier verifier = new MACVerifier(SECURITY_KEY.getBytes());
            if (signedJWT.verify(verifier)) {
                return signedJWT.getJWTClaimsSet().getSubject();
            } else {
                // 서명이 유효하지 않은 경우
                return null;
            }
        } catch (Exception e) {
            e.printStackTrace(); // 예외 발생 시 스택 트레이스 출력
            return null;
        }
    }
}
