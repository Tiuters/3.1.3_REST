package kata.boot.service;


import kata.boot.entity.Role;
import kata.boot.entity.User;
import kata.boot.repository.RoleRepository;
import kata.boot.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserServiceImp implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImp(UserRepository userRepository, RoleRepository roleRepository,
                          RoleService roleService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.roleService = roleService;
        this.passwordEncoder = passwordEncoder;
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
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    @Override
    public void editUser(User user) {
        if(!user.getPassword().equals(showUser(user.getId()).getPassword())) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
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
        User kim = new User("Kim", "Komintern", "boss",
            "kim", "333");

        Role roleAdmin = new Role("ROLE_ADMIN");
        Role roleUser = new Role("ROLE_USER");
        roleService.saveRole(roleAdmin);
        roleService.saveRole(roleUser);

        newUser(admin);
        admin.addRoleToUser(roleAdmin);
        admin.addRoleToUser(roleUser);

        newUser(user);
        user.addRoleToUser(roleUser);

        newUser(kim);
        kim.addRoleToUser(roleUser);
    }
}