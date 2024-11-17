package dev.ivanov.tasks_manager.core.events.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResponseMessageEvent {
    private String user_id;
    private String field_id;
    private String disease_class;
    private String disease_description;
    private String general_recommendation;
    private String soil_specific_recommendation;
}
