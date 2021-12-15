package kata.boot.controllers;

import kata.boot.entity.Role;
import kata.boot.entity.User;
import kata.boot.service.RoleService;
import kata.boot.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    public String showAllUsers(Model model) {
        model.addAttribute("users", userService.showAllUsers());
        return "/all_users_fall_in";
    }

    @GetMapping("/get_user_to_edit/{id}")
    public String userToBeEdited(@PathVariable("id") Long id, Model model) {
        User user = userService.showUser(id);
        List<Role> roles = roleService.getAllRoles();
        model.addAttribute("user", user);
        model.addAttribute("roles", roles);
        return "/edit_this_user";
    }

    @PutMapping("/updated_user")
    public String editUser(@ModelAttribute("user") User user,
                           @RequestParam(value = "roles") List<Long> roles) {
        if (roles == null) {
            return "/empty_checkboxes";
        }
//        Set<Role> set1 = new HashSet<>();
//        for (Long id : roles) {
//            set1.add(roleService.getRoleById(id));
//        }
//        user.setRoles(set1);
//        userService.editUser(user)
        userService.userAndRolesFromController(user, roles);
        return "redirect:/admin";
    }

    @DeleteMapping("/delete_user/{id}")
    public String deleteUser(@PathVariable("id") Long id) {
        userService.deleteUser(id);
        return "redirect:/admin";
    }

    @GetMapping("/make_new_empty")
    public String emptyUser(@ModelAttribute("user") User user, Model model) {
        model.addAttribute("roles", roleService.getAllRoles());
        return "/empty_to_fill_in";
    }

    @PostMapping("/brand_new_user")
    public String newUser(@ModelAttribute("user") User user,
                          @RequestParam(value = "roles", required = false) List<Long> roles) {
        if (roles == null) {
            return "/empty_checkboxes";
        }
//        Set<Role> set2 = new HashSet<>();
//        for (Long id : roles) {
//            set2.add(roleService.getRoleById(id));
//        }
//        user.setRoles(set2);
//        userService.newUser(user);
        userService.userAndRolesFromController(user, roles);
        return "redirect:/admin";
    }
}


















