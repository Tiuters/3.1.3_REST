package kata.boot.controllers;

import kata.boot.entity.User;
import kata.boot.service.RoleService;
import kata.boot.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {
    private final UserService userService;
    private final RoleService roleService;

    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping
    public List<User> showAllUsers() {
        return userService.showAllUsers();
    }
//  ВАРИАНТ С ResponseEntity
//    @GetMapping
//    public ResponseEntity<List<User>> showAllUsers() {
//        List<User> users = userService.showAllUsers();
//        return new ResponseEntity<>(users, HttpStatus.OK);
//    }

//    @GetMapping("/{id}")
//    public User getUser (@PathVariable Long id) {
//        return userService.showUser(id);
//    }
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable("id") Long id) {
        User user = userService.showUser(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping
    public User newUser(@RequestBody User user) {
        userService.createOrEditUser(user);
        return user;
    }

    @PutMapping
    public User editUser(@RequestBody User user) {
        userService.createOrEditUser(user);
        return user;
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id){
        userService.deleteUser(id);
        return "User with Id = " + id + "was deleted";
    }

//    @GetMapping
//    public String showAllUsers(Model model, @AuthenticationPrincipal User user) {
//        model.addAttribute("user", user);
//        model.addAttribute("users", userService.showAllUsers());
//        model.addAttribute("roles", roleService.getAllRoles());
//        return "admin";
//    }
//
//    @PostMapping("/new_user")
//    public String newUser(@ModelAttribute("user") User user,
//                          @RequestParam(value = "roles") List<Long> roles) {
//        userService.userAndRolesFromController(user, roles);
//        return "redirect:/admin";
//    }
//
//    @PutMapping("/updated_user")
//    public String editUser(@ModelAttribute("user") User user,
//                           @RequestParam(value = "roles") List<Long> roles) {
//        userService.userAndRolesFromController(user, roles);
//        return "redirect:/admin";
//    }
//
//    @DeleteMapping("/delete_user/{id}")
//    public String deleteUser(@PathVariable("id") Long id) {
//        userService.deleteUser(id);
//        return "redirect:/admin";
//    }
}
