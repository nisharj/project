package com.examly.springapp.controller;

import com.examly.springapp.model.Client;
import com.examly.springapp.service.ClientService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;


import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@CrossOrigin(origins = "http://localhost:8081")
public class ClientController {
    
    @Autowired
    private ClientService clientService;

    @PostMapping("/addClient")
    public Client addClient(@RequestBody Client client) {
        return clientService.saveClient(client);
    }

    @GetMapping("/{id}")
    public Client getOneClient(@PathVariable Long id) {
        return clientService.getOneClient(id);
    }
    
    @GetMapping("/getAllClient")
    public List<Client> getAllClient() {
        return clientService.getAllClients();
    }

    
}
