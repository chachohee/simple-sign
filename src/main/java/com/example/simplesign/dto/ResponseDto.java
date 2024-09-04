package com.example.simplesign.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

// @AllArgsConstructor(staticName = "set")는 클래스의 필드를 모두 초기화하는 생성자와 함께, 그 생성자를 호출하는 정적 팩토리 메서드를 제공하여 보다 깔끔한 코드 작성을 돕는 Lombok의 기능
// 객체를 생성할 때 new 키워드를 사용하는 대신, Person.set("John", 25)와 같은 방식으로 객체를 생성할 수 있다.
@Data
@AllArgsConstructor(staticName = "set")
public class ResponseDto<D> {
    private boolean result;
    private String message;
    private D data;

    public  static <D> ResponseDto<D> setSuccess(String message) {
        return ResponseDto.set(true, message, null);
    }

    public static <D> ResponseDto<D> setFailed(String message) {
        return ResponseDto.set(false, message, null);
    }

    public static <D> ResponseDto<D> setSuccessData(String message, D data) {
        return ResponseDto.set(true, message, data);
    }

    public static <D> ResponseDto<D> setFailedData(String message, D data) {
        return ResponseDto.set(false, message, data);
    }
}
