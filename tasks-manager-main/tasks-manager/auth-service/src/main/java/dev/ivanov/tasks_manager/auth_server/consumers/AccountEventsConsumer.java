package dev.ivanov.tasks_manager.auth_server.consumers;

import dev.ivanov.tasks_manager.auth_server.services.AccountService;
import dev.ivanov.tasks_manager.auth_server.services.ResponseMessageService;
import dev.ivanov.tasks_manager.core.events.auth.*;
import dev.ivanov.tasks_manager.core.topics.Topics;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class AccountEventsConsumer {

    @Autowired
    private AccountService accountService;

    @Autowired
    private ResponseMessageService responseMessageService;

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

    @KafkaListener(topics = Topics.RESPONSE_MESSAGE_EVENTS_TOPIC, properties = "[spring.json.value.default.type]: dev.ivanov.tasks_manager.core.events.auth.ResponseMessageEvent")
    public void handleResponseMessageEvent(ResponseMessageEvent event) {
        log.info("Received ResponseMessageEvent: {}", event);

        responseMessageService.saveEvent(event);
        log.info("Event saved for user: {}", event.getUser_id());
    }
}
