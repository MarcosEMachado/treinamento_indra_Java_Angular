package com.indracompany.treinamento.model.dto;


import lombok.Data;

@Data
public class ClienteDTO {

	private Long id;
	
	private String nome;
	
	private String cpf;
	
	private String email;
	
	private boolean ativo;
	
	private String observacoes;
	

}
