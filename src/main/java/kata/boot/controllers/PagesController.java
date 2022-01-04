package kata.boot.controllers;

import kata.boot.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import javax.annotation.PostConstruct;

@Controller
public class PagesController {
    private final UserService userService;

    public PagesController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/admin")
    public String mainPage() {
        return "admin";
    }

    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }

    @GetMapping("/user")
    public String userPage() {
        return "user";
    }


//    @PostConstruct
//    public void defaultUsers() {
//        userService.createStartUpUsers();
//    }
}
