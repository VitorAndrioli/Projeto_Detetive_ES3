package br.fatecsp.engsoft.file;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Created by Rafael on 20/04/2017.
 */
public class PhotosFile {

    public static String createFile(MultipartFile photoFile) {
        final int fileName = photoFile.hashCode();
        final String contentType = photoFile.getContentType();
        final String type = contentType.substring(1 + contentType.indexOf("/"));
        String fullName = fileName + "." + type;
        try {
            Path file = Paths.get("src\\main\\webapp\\cards\\" + fullName);
            Files.write(file, photoFile.getBytes());

        } catch (IOException e) {
            System.err.println("Não foi possível escrever arquivo");
        }
        return fullName;
    }
}
