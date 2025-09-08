package com.examly.springapp.controller;

import com.examly.springapp.model.Client;
import com.examly.springapp.model.PendingClientRequest;
import com.examly.springapp.repository.ClientRepository;
import com.examly.springapp.repository.ClientRequestRepository;

import java.util.Optional;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/client")
@CrossOrigin(origins = "http://localhost:8081")
public class ClientRequestController {

    @Autowired
    private ClientRequestRepository clientRequestRepo;

    @Autowired
    private ClientRepository clientRepo;

    @PostMapping("/add")
    public ResponseEntity<String> addClient(@RequestBody PendingClientRequest client) {
        client.setStatus("PENDING");
        clientRequestRepo.save(client);
        return ResponseEntity.ok("Client request submitted successfully!");
    }

    @GetMapping("/getPendingClients")
    public List<PendingClientRequest> getPendingClients() {
        return clientRequestRepo.findByStatus("PENDING");
    }

    @PutMapping("/getPendingClients/{id}/accept")
    public ResponseEntity<String> acceptClient(@PathVariable Long id) {
        Optional<PendingClientRequest> clientOpt = clientRequestRepo.findById(id);

        if (clientOpt.isPresent()) {
            PendingClientRequest pendingClient = clientOpt.get();
            pendingClient.setStatus("ACCEPTED");
            clientRequestRepo.save(pendingClient);

            Client client = new Client(pendingClient);
            clientRepo.save(client);


            return ResponseEntity.ok("Client accepted and added to clients table!");
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/getPendingClients/{id}/reject")
    public ResponseEntity<String> rejectClient(@PathVariable Long id) {
        Optional<PendingClientRequest> clientOpt = clientRequestRepo.findById(id);

        if (clientOpt.isPresent()) {
            PendingClientRequest client = clientOpt.get();
            client.setStatus("REJECTED");
            clientRequestRepo.save(client);

            return ResponseEntity.ok("Client request rejected!");
        }
        return ResponseEntity.notFound().build();
    }
}
