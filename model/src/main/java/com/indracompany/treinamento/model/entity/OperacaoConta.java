package com.indracompany.treinamento.model.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "operacoes")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class OperacaoConta extends GenericEntity<Long>{
	private static final long serialVersionUID = -5824703733929187165L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private LocalDateTime dataHora;
	
	//'C' para Credito e 'D' para Debito
	@Column(length = 1)
	private char tpOperacao;
	
	private double valor;
	
	@ManyToOne
	@JoinColumn(name = "fk_conta_id")
	private ContaBancaria conta;
	
	@Column(length = 100)
	private String observacao;

}
