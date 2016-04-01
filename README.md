# Acha Dentista

Sistema desenvolvido para atividade extra-classe da disciplina WebGIS no curso de pós graduação em Geoprocessamento e Análise Espacial ofertado pela Pontifícia Universidade Católica de Minas Gerais.

O sistema possui uma base com a posição de alguns dentistas na cidade de Belo Horizonte obtido no [link](www.ident.com.br/geodata_offices_belo_horizonte_MG.kml). O usuário coloca um endereço e o sistemas utiliza distância euclidiana para ordenar os dentistas do mais prôximo para o mais distante.

O usuário seleciona o dentista e o sistema traça uma rota até o dentista.

O trabalho realiza geocodificação para encontrar o endereço digitado pelo usuário. Como os dentistas possuem o ponto georeferênciado o sistema faz a geocodificação reversa de do ponto para o endereço do dentista para mostar na janela de informações. O sistema possui pontos representando os consultórios dos dentistas e calcula rotas entre o ponto inserido pelo usuário eo dentista selecionado. 
