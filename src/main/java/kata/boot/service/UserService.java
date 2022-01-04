package kata.boot.service;



import kata.boot.entity.User;

import java.util.List;

public interface UserService {
    List<User> showAllUsers();
    User showUser(Long id);
    void createOrEditUser(User user);
    void deleteUser(Long id);
    User getUserByName(String username);
    void createStartUpUsers();
    void addRoleId(User user);
}
