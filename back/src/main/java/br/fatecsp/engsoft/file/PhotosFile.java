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

    public  static String createFile(MultipartFile photoFile){
        int fileName = photoFile.hashCode();
        try{
            Path file = Paths.get( "src\\main\\webapp\\cards\\"+ fileName +".png");
            Files.write(file, photoFile.getBytes());

        } catch (IOException e) {
            System.err.println("Não foi possível escrever arquivo");
        }
        return Integer.toString(fileName);
    }

    public void retriveFile(String fileName){

    }

}
