package kata.boot.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class PagesController {

    @GetMapping
    public String mainPage() {
        return "admin";
    }

    @GetMapping("/test")
    public String Test() {
        return "test";
    }

    @GetMapping("/admin2")
    public String Ad2() {
        return "admin2";
    }

    @GetMapping("/admin3")
    public String Ad3() {
        return "admin3";
    }

}
