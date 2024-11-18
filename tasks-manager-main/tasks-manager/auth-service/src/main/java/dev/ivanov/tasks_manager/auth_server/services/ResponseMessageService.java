package dev.ivanov.tasks_manager.auth_server.services;

import dev.ivanov.tasks_manager.core.events.auth.ResponseMessageEvent;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class ResponseMessageService {
    private final Map<String, ResponseMessageEvent> eventsStore = new ConcurrentHashMap<>();

    // Метод для сохранения события
    public void saveEvent(ResponseMessageEvent event) {
        eventsStore.put(event.getUserId(), event); // Используем user_id как ключ
    }

    // Метод для получения события по user_id
    public ResponseMessageEvent getEventByUserId(String userId) {
        return eventsStore.get(userId);
    }
}