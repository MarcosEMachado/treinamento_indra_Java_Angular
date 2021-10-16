package com.indracompany.treinamento.model.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.indracompany.treinamento.exception.AplicacaoException;
import com.indracompany.treinamento.exception.ExceptionValidacoes;
import com.indracompany.treinamento.model.dto.OperacaoContaDTO;
import com.indracompany.treinamento.model.entity.ContaBancaria;
import com.indracompany.treinamento.model.entity.OperacaoConta;
import com.indracompany.treinamento.model.repository.OperacaoContaRepository;

@Service
public class OperacaoContaService extends GenericCrudService<OperacaoConta, Long, OperacaoContaRepository> {

	@Autowired
	private ContaBancariaService contaBancariaService;

	@Autowired
	private OperacaoContaRepository operacaoContaRepository;

	public List<OperacaoContaDTO> obterOperacoes(String agencia, String numeroConta) {
		ContaBancaria conta = contaBancariaService.consultarConta(agencia, numeroConta);
		List<OperacaoConta> operacoes = operacaoContaRepository.findByContaOrderByDataHoraDesc(conta);

		if (operacoes == null || operacoes.isEmpty()) {
			throw new AplicacaoException(ExceptionValidacoes.ALERTA_NENHUM_REGISTRO_ENCONTRADO);
		}

		List<OperacaoContaDTO> listResult = new ArrayList<>();

		for (OperacaoConta operacaoConta : operacoes) {
			OperacaoContaDTO dto = new OperacaoContaDTO();
			BeanUtils.copyProperties(operacaoConta, dto);
			listResult.add(dto);
		}
		return listResult;
	}

	public void salvarOperacao(char tpOperacao, double valor, ContaBancaria conta, String observacao) {
		LocalDateTime dataHora = LocalDateTime.now();
		OperacaoConta operacao = new OperacaoConta(null, dataHora, tpOperacao, valor, conta, observacao);
		this.salvar(operacao);
	}

	public List<OperacaoContaDTO> obterOperacoesPorPerildo(String agencia, String numeroConta, Integer qtd) {
		ContaBancaria conta = contaBancariaService.consultarConta(agencia, numeroConta);
		LocalDateTime dataStart = LocalDateTime.now();
		LocalDateTime dataEnd = LocalDateTime.now().minusDays(qtd);
		List<OperacaoConta> operacoes = operacaoContaRepository.findByContaAndDataHoraBetweenOrderByDataHoraDesc(conta,
				dataEnd, dataStart );

		List<OperacaoContaDTO> listResult = new ArrayList<>();

		for (OperacaoConta operacaoConta : operacoes) {
			OperacaoContaDTO dto = new OperacaoContaDTO();
			BeanUtils.copyProperties(operacaoConta, dto);
			listResult.add(dto);
		}
		return listResult;
	}

}
