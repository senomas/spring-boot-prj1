package id.co.hanoman.project1;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class BasicController {

	@RequestMapping("/xxx")
	public String homePage(Model model) {
		return "index";
	}
}
