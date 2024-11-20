package dev.ivanov.tasks_manager.auth_server.exceptions;

public class JWTException extends RuntimeException {
    public JWTException(String message) {
        super(message);
    }
}
