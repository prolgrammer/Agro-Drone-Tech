package dev.ivanov.tasks_manager.core.events.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AccountDeletionCommitEvent {
    private String transactionId;
    private String id;
}
