package kata.boot.controllers;

import kata.boot.entity.User;
import kata.boot.service.RoleService;
import kata.boot.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {
    private final UserService userService;
    private final RoleService roleService;

    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping
    public String showAllUsers(Model model, @AuthenticationPrincipal User user) {
        model.addAttribute("user", user);
        model.addAttribute("users", userService.showAllUsers());
        model.addAttribute("roles", roleService.getAllRoles());
        return "admin";
    }

    @PostMapping("/new_user")
    public String newUser(@ModelAttribute("user") User user,
                          @RequestParam(value = "roles") List<Long> roles) {
        userService.userAndRolesFromController(user, roles);
        return "redirect:/admin";
    }

    @PutMapping("/updated_user")
    public String editUser(@ModelAttribute("user") User user,
                           @RequestParam(value = "roles") List<Long> roles) {
        userService.userAndRolesFromController(user, roles);
        return "redirect:/admin";
    }

    @DeleteMapping("/delete_user/{id}")
    public String deleteUser(@PathVariable("id") Long id) {
        userService.deleteUser(id);
        return "redirect:/admin";
    }
}
