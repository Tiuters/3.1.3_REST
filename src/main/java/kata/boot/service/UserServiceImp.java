package kata.boot.service;


import kata.boot.ExeptionHandler.NoUserWithSuchIdException;
import kata.boot.entity.Role;
import kata.boot.entity.User;
import kata.boot.repository.RoleRepository;
import kata.boot.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserServiceImp implements UserService {

    private final UserRepository userRepository;
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImp(UserRepository userRepository,
                          RoleService roleService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleService = roleService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional(readOnly = true)
    public List<User> showAllUsers() {
        return userRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public User showUser(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new NoUserWithSuchIdException("User with such id does not exist"));
    }

    @Override
    public void createOrEditUser(User user) {
        if (user.getId() == null) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.save(user);
            return;
        }
        if(!user.getPassword().equals(showUser(user.getId()).getPassword())) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        userRepository.save(user);
    }

    public void addRoleId(User user) {
        Set<Role> roles = user.getRoles();
        List<Role> allRoles = roleService.getAllRoles();

        for (Role r : allRoles) {
            for (Role ru : roles){
                if (r.getRole().equals(ru.getRole())){
                    ru.setId(r.getId());
                }
            }
        }

        createOrEditUser(user);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public User getUserByName(String username) {
        return userRepository.getUserByUsername(username);
    }


    @Override
    public void createStartUpUsers() {

        User admin1 = new User("Bob", "Sec", "god",
            "admin", "111");
        User user1 = new User("Chin", "Drake", "puser",
            "user", "222");
        User user2 = new User("Kim", "Komintern", "boss",
            "kim", "333");

        Role roleAdmin = new Role("ROLE_ADMIN");
        Role roleUser = new Role("ROLE_USER");
        roleService.saveRole(roleAdmin);
        roleService.saveRole(roleUser);

        createOrEditUser(admin1);
        admin1.addRoleToUser(roleAdmin);
        admin1.addRoleToUser(roleUser);

        createOrEditUser(user1);
        user1.addRoleToUser(roleUser);

        createOrEditUser(user2);
        user2.addRoleToUser(roleUser);


    }


}