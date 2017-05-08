package br.fatecsp.engsoft.file;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Created by Rafael on 20/04/2017.
 */
@Component
public class PhotosFile {

    @Value("${detetive.image.map}")
    private String filePath;

    @Value("${detetive.image.location}")
    private String fileLocation;


    public String createFile(MultipartFile photoFile) {
        final int fileName = photoFile.hashCode();
        final String contentType = photoFile.getContentType();
        final String type = contentType.substring(1 + contentType.indexOf("/"));
        String fullName = fileName + "." + type;
        try {
            Path file = Paths.get(filePath+ fullName);
            Files.write(file, photoFile.getBytes());

        } catch (IOException e) {
            System.err.println("Não foi possível escrever os arquivo");
        }
        return fileLocation+fullName;
    }
}
