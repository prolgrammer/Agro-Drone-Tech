package dev.ivanov.tasks_manager.core.events.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResponseMessageEvent {
    @JsonProperty("user_id")
    private String userId;
    @JsonProperty("field_id")
    private String fieldId;
    private String disease_class;
    private String disease_description;
    private String general_recommendation;
    private String soil_specific_recommendation;
}
