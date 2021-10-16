package com.indracompany.treinamento.model.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

import lombok.Data;

@Data
public class OperacaoContaDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private LocalDateTime dataHora;
	private char tpOperacao;
	private double valor;
	private String observacao;

}
