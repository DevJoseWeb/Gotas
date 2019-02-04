package br.com.zaal.atendimento.service;

import br.com.zaal.atendimento.entity.Funcionario;
import br.com.zaal.atendimento.repository.FuncionarioRepository;
import br.com.zaal.atendimento.security.UserSS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final FuncionarioRepository repository;

    @Autowired
    public UserDetailsServiceImpl(FuncionarioRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String usuario) throws UsernameNotFoundException {
        Funcionario funcionario = repository.findByUsuario(usuario);
        if (funcionario == null) {
            throw new UsernameNotFoundException(usuario);
        }
        return new UserSS(funcionario);
    }
}
