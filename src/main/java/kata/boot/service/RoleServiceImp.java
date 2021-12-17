package kata.boot.service;

import kata.boot.entity.Role;
import kata.boot.repository.RoleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Transactional
public class RoleServiceImp implements RoleService{
    private final RoleRepository roleRepository;

    public RoleServiceImp(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    @Transactional
    public void saveRole(Role role) {
        roleRepository.save(role);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Role getRoleById(Long id) {
        return roleRepository.getById(id);
    }

//    @Override
//    public Set<Role> stringToSet(String[] role){
//        Set<Role> set = new HashSet<>();
//        for (String roles : role) {
//            set.add(getRoleByName(roles));
//        }
//        return set;
//    }

//    @Override
//    public Role getRoleByName(String roleName) {
//        return roleRepository.getRoleByName(roleName);
//    }

}
