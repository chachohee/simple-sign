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
    private static final String SECURITY_KEY = "inputYourSecurityKey";

    // JWT 생성 메서드
    public String createJwt(String email, int duration) {
        try {
            // 현재 시간 기준 1시간 뒤로 만료시간 설정
            Instant now = Instant.now();
            Instant exprTime = now.plusSeconds(duration);

            // JWTClaimsSet은 클레임을 저장하고 관리하는 역할을 하며, 토큰 내의 여러 클레임 값들을 포함합니다.
            // 클레임은 사용자를 식별하거나 토큰의 유효성을 판단하는 데 중요한 정보들입니다.
            // 	1.	표준 클레임:
            //	•	iss (Issuer): 토큰 발급자
            //	•	sub (Subject): 토큰의 주체(사용자 ID)
            //	•	aud (Audience): 토큰의 수신 대상
            //	•	exp (Expiration Time): 토큰의 만료 시간
            //	•	iat (Issued At): 토큰이 발급된 시간
            //	•	nbf (Not Before): 특정 시간 이전에는 토큰이 유효하지 않음
            JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                    .subject(email)
                    .issueTime(Date.from(now))
                    .expirationTime(Date.from(exprTime))
                    .build();

            // JWT 서명
            SignedJWT signedJWT = new SignedJWT(
                    new JWSHeader(JWSAlgorithm.HS256),	// *헤더 설정
                    claimsSet
            );

            // HMAC 서명을 사용하여 JWT 서명
            signedJWT.sign(new MACSigner(SECURITY_KEY.getBytes()));

            return signedJWT.serialize(); // 직렬화된 JWT를 클라이언트에게 응답
        } catch (JOSEException e) {
            return null;
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
            return null;
        }
    }
}
