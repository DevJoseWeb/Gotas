package br.com.zaal.atendimento.util;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.concurrent.ThreadLocalRandom;

public class GerenciaArquivoUtil {

    private final Path fileStorageLocation;

    public GerenciaArquivoUtil(String directory) {
        this.fileStorageLocation = Paths.get("./uploads/" + directory).toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {

        }
    }

    public String gravarArquivo(InputStream arquivo, String originalFilename) {

        String nomeArquivo = StringUtils.cleanPath(originalFilename);
        nomeArquivo = nomeArquivo.replace(" ","-");

        RandomStringUtil gen = new RandomStringUtil(11, ThreadLocalRandom.current()); //new RandomString(); //
        String nomeFinal = gen.nextString()+nomeArquivo;

        try {
            if(nomeFinal.contains("..")) {
                throw new RuntimeException("Nome do arquivo é inválido! " + nomeFinal);
            }

            Path targetLocation = this.fileStorageLocation.resolve(nomeFinal);
            Files.copy(arquivo, targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return nomeFinal;
        } catch (IOException ex) {
            throw new RuntimeException("Não foi possível gravar o arquivo " + nomeArquivo, ex);
        }
    }

    public Resource buscarArquivo(String nomeArquivo) {

        try {
            Path filePath = this.fileStorageLocation.resolve(nomeArquivo).normalize();
            return new UrlResource(filePath.toUri());
        } catch (MalformedURLException ex) {
            throw new RuntimeException("Arquivo não encontrado: " + nomeArquivo, ex);
        }
    }

    public void excluirArquivo(String nomeArquivo) {
        try {
            Files.deleteIfExists(this.fileStorageLocation.resolve(nomeArquivo));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
