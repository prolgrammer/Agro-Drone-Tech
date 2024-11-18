package dev.ivanov.tasks_manager.auth_server.exceptions;

import dev.ivanov.tasks_manager.auth_server.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptions {
    @ExceptionHandler(JWTException.class)
    public ResponseEntity<ErrorResponse> handleJwtException(JWTException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("UNAUTHORIZED", ex.getMessage()));
    }
}