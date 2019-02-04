package br.com.zaal.atendimento.security;

import br.com.zaal.atendimento.entity.Funcionario;
import br.com.zaal.atendimento.entity.Setor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

public class UserSS implements UserDetails {
    private static final long serialVersionUID = 1L;

    private Collection<? extends GrantedAuthority> authorities;

    private Funcionario funcionario;

    public UserSS() {
    }

    public UserSS (Funcionario funcionario){
        super();
        this.funcionario = funcionario;

        Collection<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        this.authorities = authorities;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return funcionario.getSenha();
    }

    @Override
    public String getUsername() {
        return funcionario.getUsuario();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return funcionario.isAtivo();
    }

    public boolean hasRole(Setor setor) {
        return getAuthorities().contains(new SimpleGrantedAuthority(funcionario.getSetor().getNome()));
    }

    public Funcionario getFuncionario() {
        return funcionario;
    }
}
