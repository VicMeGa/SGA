package com.vantus.project.person.endpoint;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("sga")
public class PersonEndpoint {

	@GetMapping("HelloWorld")
	public String HelloWorld () {
		return "HelloWorld";
	}
	
	@GetMapping("echo")
	public String echo (@RequestParam(name = "cadena", required = false, defaultValue = "no value") String cadena) {
		return "Echo: " + cadena;
	}
	
	
	@GetMapping("sum")
	public Double sum(@RequestParam(name = "a") Double a, @RequestParam(name = "b")  Double b) {
		return a + b;
	}
}
