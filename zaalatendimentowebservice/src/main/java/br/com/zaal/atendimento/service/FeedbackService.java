package br.com.zaal.atendimento.service;

import br.com.zaal.atendimento.entity.Chamado;
import br.com.zaal.atendimento.entity.Feedback;
import br.com.zaal.atendimento.entity.Funcionario;
import br.com.zaal.atendimento.repository.FeedbackRepository;
import br.com.zaal.atendimento.service.exceptions.ConflictException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService {

    private final FeedbackRepository repository;

    @Autowired
    public FeedbackService(FeedbackRepository repository) {
        this.repository = repository;
    }

    public void gravar(Chamado chamado, Funcionario funcionario) {

        if (repository.existsByChamadoAndFuncionario(chamado, funcionario))
            throw new ConflictException("Funcionário já está no feedback deste chamado!");

        Feedback feedback = new Feedback();
        feedback.setChamado(chamado);
        feedback.setFuncionario(funcionario);
        repository.save(feedback);
    }

    public void remover(Chamado chamado, Funcionario funcionario) {
        repository.deleteByChamadoAndFuncionario(chamado, funcionario);
    }

    public List<Feedback> buscarFeedbackPorChamado(Long idChamado) {
        return repository.buscarFeedbackPorChamado(idChamado);
    }
}
