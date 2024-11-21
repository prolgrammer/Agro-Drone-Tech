package dev.ivanov.tasks_manager.auth_server.services;

import dev.ivanov.tasks_manager.auth_server.dto.FIleSendDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

//TODO DELETE
@Service
public class FileSendService {

    @Autowired
    private KafkaTemplate<String, FIleSendDTO> byteKafkaTemplate;

    public void sendFileToKafka(MultipartFile file) throws IOException {
        FIleSendDTO fileSendDto = new FIleSendDTO();
        dto.setImage_data(fileBytes);
        byteKafkaTemplate.send(topic, dto);
    }
}
