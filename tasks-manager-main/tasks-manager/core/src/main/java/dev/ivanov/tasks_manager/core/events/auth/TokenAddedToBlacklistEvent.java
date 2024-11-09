package dev.ivanov.tasks_manager.core.events.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TokenAddedToBlacklistEvent {
    private String transactionId;
    private String id;
    private String token;
}
