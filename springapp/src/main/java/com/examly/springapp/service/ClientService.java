package com.examly.springapp.service;

import com.examly.springapp.model.Client;
import com.examly.springapp.repository.ClientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService {

    private final ClientRepository clientRepository;

    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public Client saveClient(Client client) {
        return clientRepository.save(client);
    }

    public Client getOneClient(Long id) {
        return clientRepository.findById(id).orElse(null);
    }

    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }
}
