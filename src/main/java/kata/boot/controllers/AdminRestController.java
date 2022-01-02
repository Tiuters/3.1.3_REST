package kata.boot.controllers;

import kata.boot.entity.Role;
import kata.boot.entity.User;
import kata.boot.service.RoleService;
import kata.boot.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AdminRestController {
    private final UserService userService;
    private final RoleService roleService;

    public AdminRestController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/get-all-users")
    public List<User> showAllUsers() {
        List<User> users = userService.showAllUsers();
        return users;
    }

    @GetMapping("/{id}")
    public User getUser (@PathVariable Long id) {
        return userService.showUser(id);}


    @PostMapping("/new-user")
    public User newUser(@RequestBody(required = false) User user) {
        userService.createOrEditUser(user);
        return user;
    }

    @PutMapping("/edit-user/{id}")
    public User editUser(@RequestBody User user) {
        userService.createOrEditUser(user);
        return user;
    }

    @DeleteMapping("/delete-user/{id}")
    public String deleteUser(@PathVariable Long id){
        userService.deleteUser(id);
        return "User with Id = " + id + " was deleted";
    }

    @GetMapping("/authorized-user")
    public User getAuthorizedUser(){
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        Object principal = authentication.getPrincipal();
        User user = (User) principal;
        return user;
    }

    @GetMapping("/get-all-roles")
    public List<Role> showAllRoles() {
        List<Role> allRoles = roleService.getAllRoles();
        return allRoles;
    }
}






//    @GetMapping("/authorized-user")
//    public User getAuthorizedUser(@AuthenticationPrincipal User user) {
//        return user;
//    }

//    @GetMapping("/get-user/{id}")
//    public ResponseEntity<User> getUser(@PathVariable("id") Long id) {
//        User user = userService.showUser(id);
//        return new ResponseEntity<>(user, HttpStatus.OK);
//    }

//    @GetMapping("/get-all-users")
//    public ResponseEntity<List<User>> showAllUsers() {
//        List<User> users = userService.showAllUsers();
//        return new ResponseEntity<>(users, HttpStatus.OK);
//    }