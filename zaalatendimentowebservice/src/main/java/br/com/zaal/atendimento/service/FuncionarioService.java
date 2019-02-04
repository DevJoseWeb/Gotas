package br.com.zaal.atendimento.service;

import br.com.zaal.atendimento.entity.Funcionario;
import br.com.zaal.atendimento.repository.FuncionarioRepository;
import br.com.zaal.atendimento.service.exceptions.DataIntegrityException;
import br.com.zaal.atendimento.service.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FuncionarioService {

    private final FuncionarioRepository repository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public FuncionarioService(FuncionarioRepository repository, BCryptPasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    public Funcionario findById(Long id) {
        return repository.findById(id).orElseThrow(() -> new ObjectNotFoundException("Funcionário não encontrado! Código: " + id));
    }

    public Funcionario save(Funcionario funcionario) {
        Optional<Funcionario> funcionarioOptional = repository.findById(funcionario.getId());
        if (!funcionarioOptional.isPresent()) {
            funcionario.setSenha(passwordEncoder.encode(funcionario.getUsuario()));
        } else {
            funcionario.setSenha(funcionarioOptional.get().getSenha());
        }
        return repository.save(funcionario);
    }

    public void delete(Long id) {
        findById(id);
        try {
            repository.deleteById(id);
        } catch (DataIntegrityViolationException e) {
            throw new DataIntegrityException("Não é possível excluir um funcionário com lançamentos");
        }
    }

    public List<Funcionario> findAll() {
        return repository.findAll();
    }

    public List<Funcionario> findByNomeContainingIgnoreCaseOrderByNome(String nome) {
        return repository.findByNomeContainingIgnoreCaseAndAtivoIsTrueOrderByNome(nome);
    }
}