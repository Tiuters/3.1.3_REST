package kata.boot.service;


import kata.boot.entity.Role;
import kata.boot.entity.User;
import kata.boot.repository.RoleRepository;
import kata.boot.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserServiceImp implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final RoleService roleService;

    public UserServiceImp(UserRepository userRepository,
                          RoleRepository roleRepository, RoleService roleService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.roleService = roleService;
    }

    @Override
    public List<User> showAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User showUser(Long id) {
        return userRepository.getById(id);
    }

    @Override
    public void newUser(User user) {
        userRepository.save(user);
    }

    @Override
    public void editUser(User user) {
        userRepository.save(user);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public User getUserByName(String username) {
        return userRepository.getUserByUsername(username);
    }

    @Override
    public void createStartUpUsers() {

        User admin = new User("Bob", "Sec", "god",
            "admin", "111");
        User user = new User("Chin", "Drake", "puser",
            "user", "222");

        Role roleAdmin = new Role("ROLE_ADMIN");
        Role roleUser = new Role("ROLE_USER");

        newUser(admin);
        roleService.saveRole(roleAdmin);
        admin.addRoleToUser(roleAdmin);

        userRepository.save(user);
        roleRepository.save(roleUser);
        user.addRoleToUser(roleUser);
    }
}