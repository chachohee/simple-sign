package com.example.simplesign.service;

import com.example.simplesign.dto.LoginDto;
import com.example.simplesign.dto.LoginResponseDto;
import com.example.simplesign.dto.ResponseDto;
import com.example.simplesign.dto.SignUpDto;
import com.example.simplesign.entity.UserEntity;
import com.example.simplesign.repository.UserRepository;
import com.example.simplesign.security.TokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final TokenProvider tokenProvider;

    @Autowired
    public AuthService(UserRepository userRepository, TokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.tokenProvider = tokenProvider;
    }

    // 회원가입
    public ResponseDto<?> signUp(SignUpDto dto) {
        System.out.println("SignUpDto:" + dto.toString());

        String email = dto.getEmail();
        String password = dto.getPassword();
        String confirmPassword = dto.getConfirmPassword();

        // email(id) 중복 확인
        try {
            // 존재하는 경우 : true / 존재하지 않는 경우 : false
            if(userRepository.existsById(email)) {
                return ResponseDto.setFailed("중복된 Email 입니다.");
            }
        } catch (Exception e) {
            return ResponseDto.setFailed("데이터베이스 연결에 실패하였습니다.");
        }

        // password 중복 확인
        if(!password.equals(confirmPassword)) {
            return ResponseDto.setFailed("비밀번호가 일치하지 않습니다.");
        }

        // UserEntity 생성
        UserEntity userEntity = new UserEntity(dto);

        // 비밀번호 암호화
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(password);

        boolean isPasswordMatch = passwordEncoder.matches(password, hashedPassword);

        if(!isPasswordMatch) {
            return ResponseDto.setFailed("암호화에 실패하였습니다.");
        }

        userEntity.setPassword(hashedPassword); // 암호화된 비밀번호 저장

        // UserRepository를 이용하여 DB에 Entity 저장 (데이터 적재)
        try {
            userRepository.save(userEntity);
            System.out.println("회원가입된 유저: " + userEntity.toString());
        } catch (Exception e) {
            return ResponseDto.setFailed("데이터베이스 연결에 실패하였습니다.");
        }

        return ResponseDto.setSuccess("회원 생성에 성공했습니다.");
    }

    // 로그인
    public ResponseDto<LoginResponseDto> login(LoginDto dto) {
        String email = dto.getEmail();
        String password = dto.getPassword(); // 사용자가 입력한 비밀번호
        UserEntity userEntity;

        try {
            // 이메일로 사용자 정보 가져오기
            userEntity = userRepository.findById(email).orElse(null);
            if(userEntity == null) {
                return ResponseDto.setFailed("입력하신 이메일로 등록된 계정이 존재하지 않습니다.");
            }

            // 사용자가 입력한 비밀번호를 BCryptPasswordEncoder를 사용하여 암호화
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String encodedPassword = userEntity.getPassword(); // DB에 저장된 암호화된 비밀번호

            // 저장된 암호화된 비밀번호와 입력된 암호화된 비밀번호 비교
            if(!passwordEncoder.matches(password, encodedPassword)) {
                return ResponseDto.setFailed("비밀번호가 일치하지 않습니다.");
            }
        } catch (Exception e) {
            return ResponseDto.setFailed("데이터베이스 연결에 실패하였습니다.");
        }

        // Client에 비밀번호 제공 방지
        userEntity.setPassword("");

        int exprTime = 3600;     // 1h
        String token = tokenProvider.createJwt(email, exprTime);
        System.out.println("token: " + token.toString());

        if(token == null) {
            return ResponseDto.setFailed("토큰 생성에 실패하였습니다.");
        }

        LoginResponseDto loginResponseDto = new LoginResponseDto(token, exprTime, userEntity);

        return ResponseDto.setSuccessData("로그인에 성공하였습니다.", loginResponseDto);
    }
}
