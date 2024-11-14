package dev.ivanov.tasks_manager.auth_server.dto;


import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;

@Setter
@Getter
public class FIleSendDTO {
    // Геттеры и сеттеры для каждого поля
    private String user_id = "1";
    private String field_id = "1";
    private Map<String, Double> coordinates = new HashMap<>();
    private String soil_type = "Песчаная";
    private String crop_type = "Пшеница";
    private byte[] image_data;

}
