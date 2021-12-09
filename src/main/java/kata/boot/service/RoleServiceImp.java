package kata.boot.service;

import kata.boot.entity.Role;
import kata.boot.repository.RoleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImp implements RoleService{
    private final RoleRepository roleRepository;

    public RoleServiceImp(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public void saveRole(Role role) {
        roleRepository.save(role);
    }

    @Override
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    @Override
    public Role getRoleById(Long id) {
        return roleRepository.getById(id);
    }

//    @Override
//    public Role getRoleByName(String roleName) {
////        return roleRepository.getRoleByName(roleName);
//        return roleRepository.getRoleByName(roleName);
//    }

}
