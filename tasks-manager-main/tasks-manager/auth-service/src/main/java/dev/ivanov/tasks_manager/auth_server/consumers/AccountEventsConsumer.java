package dev.ivanov.tasks_manager.auth_server.consumers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import dev.ivanov.tasks_manager.auth_server.services.AccountService;
import dev.ivanov.tasks_manager.auth_server.services.ResponseMessageService;
import dev.ivanov.tasks_manager.core.events.auth.*;
import dev.ivanov.tasks_manager.core.topics.Topics;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Headers;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@Slf4j
public class AccountEventsConsumer {

    @Autowired
    private AccountService accountService;

    @Autowired
    private ResponseMessageService responseMessageService;

    private static final Logger logger = LoggerFactory.getLogger(ResponseMessageService.class);


    @KafkaListener(topics = Topics.ACCOUNT_CREATION_COMMIT_EVENTS_TOPIC)
    public void handleAccountCreationCommitEvent(AccountCreationCommitEvent event) {
        log.info("event was handled {}", event);
        accountService.commitCreation(event.getId());
    }

    @KafkaListener(topics = Topics.ACCOUNT_CREATION_ROLLBACK_EVENTS_TOPIC)
    public void handleAccountCreationRollbackEvent(AccountCreationRollbackEvent event) {
        accountService.rollbackCreation(event.getId());
    }

    @KafkaListener(topics = Topics.ACCOUNT_DELETION_COMMIT_EVENTS_TOPIC)
    public void handleAccountDeletionCommitEvent(AccountDeletionCommitEvent event) {
        accountService.commitDeletion(event.getId());
    }

    @KafkaListener(topics = Topics.ACCOUNT_DELETION_ROLLBACK_EVENTS_TOPIC)
    public void handleAccountDeletionRollbackEvent(AccountDeletionRollbackEvent event) {
        accountService.rollbackDeletion(event.getId());
    }

//    @KafkaListener(topics = Topics.RESPONSE_MESSAGE_EVENTS_TOPIC, properties = "[spring.json.value.default.type]: dev.ivanov.tasks_manager.core.events.auth.ResponseMessageEvent")
//    public void handleResponseMessageEvent(ResponseMessageEvent event) {
//        log.info("Received ResponseMessageEvent: {}", event);
//
//        responseMessageService.saveEvent(event);
//        log.info("Event saved for user: {}", event.getUser_id());
//    }

    @KafkaListener(
            topics = Topics.RESPONSE_MESSAGE_EVENTS_TOPIC,
            properties = {
                    "spring.json.value.default.type=dev.ivanov.tasks_manager.core.events.auth.ResponseMessageEvent"
            }
    )
    public void handleResponseMessageEvent(
            @Payload ResponseMessageEvent message, // Автоматически десериализуется
            @Headers Map<String, Object> headers // Используем Map<String, Object> для обработки заголовков
    ) {
        try {
            // Извлечение и логирование заголовков
            String contentType = getHeaderAsString(headers, "contentType");
            String rawUserId = getHeaderAsString(headers, "user_id");
            String rawFieldId = getHeaderAsString(headers, "field_id");
            String diseaseClass = getHeaderAsString(headers, "disease_class");
            String diseaseDescription = getHeaderAsString(headers, "disease_description");
            String generalRecommendation = getHeaderAsString(headers, "general_recommendation");
            String soilSpecificRecommendation = getHeaderAsString(headers, "soil_specific_recommendation");

            if (!"application/json".equals(contentType)) {
                logger.warn("Unexpected content type: {}", contentType);
                return;
            }

            // Проверка обязательных заголовков
            if (rawUserId == null || rawFieldId == null) {
                logger.warn("Missing required headers: user_id or field_id");
                return;
            }

            // Логирование заголовков и содержимого сообщения
            logger.info("Received message with headers: user_id={}, field_id={}", rawUserId, rawFieldId);
            logger.info("Disease class: {}, Description: {}", diseaseClass, diseaseDescription);
            logger.info("General recommendation: {}", generalRecommendation);
            logger.info("Soil specific recommendation: {}", soilSpecificRecommendation);

            // Логирование тела сообщения
            logger.info("Payload: {}", message);

            // Дополнительная обработка данных
            processDiseaseData(
                    message.getUserId(), // Предполагается, что это поле есть в ResponseMessageEvent
                    message.getFieldId(),
                    diseaseClass,
                    diseaseDescription,
                    generalRecommendation,
                    soilSpecificRecommendation
            );
        } catch (Exception e) {
            logger.error("Error processing Kafka message", e);
        }
    }

    /**
     * Извлекает заголовок как строку.
     */
    private String getHeaderAsString(Map<String, Object> headers, String key) {
        Object value = headers.get(key);
        if (value instanceof byte[]) {
            return new String((byte[]) value);
        }
        return value != null ? value.toString() : null;
    }

    private void processDiseaseData(String processedUserId, String processedFieldId,
                                    String diseaseClass, String diseaseDescription, String generalRecommendation,
                                    String soilSpecificRecommendation) {
        // Здесь вы можете добавить логику обработки данных
        // Например:
        ResponseMessageEvent event = new ResponseMessageEvent(processedUserId, processedFieldId,diseaseClass, diseaseDescription,
                generalRecommendation, soilSpecificRecommendation);

        responseMessageService.saveEvent(event);

        // Дополнительная логика обработки данных
    }
}
