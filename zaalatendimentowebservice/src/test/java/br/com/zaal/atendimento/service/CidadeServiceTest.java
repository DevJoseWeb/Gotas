package br.com.zaal.atendimento.service;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.util.List;
import java.util.Optional;

import br.com.zaal.atendimento.entity.Cidade;
import br.com.zaal.atendimento.repository.CidadeRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.BDDMockito;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("test")
public class CidadeServiceTest {

    @MockBean
    private CidadeRepository cidadeRepository;

    @Autowired
    private CidadeService cidadeService;

    private static final String nome = "51463645000100";

    @Before
    public void setUp() throws Exception {

    }

}
