package br.com.zaal.atendimento.repository;

import static org.junit.Assert.assertEquals;

import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.List;

import br.com.zaal.atendimento.entity.Cidade;
import br.com.zaal.atendimento.repository.CidadeRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("test")
public class CidadeRepositoryTest {

    @Autowired
    private CidadeRepository cidadeRepository;

    private static final Integer codigo = 100;
    private static final String nome = "Fortaleza";

    @Before
    public void setUp() throws Exception {
        Cidade cidade = new Cidade();
        cidade.setCodigo(codigo);
        this.cidadeRepository.save(cidade);
    }

    @After
    public final void tearDown() {
        this.cidadeRepository.deleteAll();
    }

    @Test
    public void testListaTodosNome() {
        List<Cidade> cidades = this.cidadeRepository.findByNomeContainingIgnoreCaseOrderByNome(nome);
        assertEquals(nome, cidades);
    }

}
