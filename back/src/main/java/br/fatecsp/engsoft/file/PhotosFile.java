package br.fatecsp.engsoft.file;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Created by Rafael on 20/04/2017.
 */
public class PhotosFile {

    public  static String createFile(MultipartFile photoFile, String filePath){
        int fileName = photoFile.hashCode();
        try{
            String source = filePath + fileName +".png";
			Path file = Paths.get(source);
            Files.write(file, photoFile.getBytes());

        } catch (IOException e) {
            System.err.println("Não foi possível escrever arquivo");
        }
        return fileName +".png";
    }

    public static boolean hasPhoto(String fileName, String filePath){
        File file = new File(filePath + fileName +".png");
        return file.exists();
    }

}
