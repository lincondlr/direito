// ================================================================================
// Base do codigo - http://tableless.com.br/paginacao-com-javascript-e-jquery/
// por Dyemerson Almeida
// ================================================================================

//acionamos o jquery para iniciar a paginação quando o documento estiver "pronto"
function inicia_paginacao(slug, current_page = 0) {

	//Pegamos o valor selecionado default no select id="qtd"
	var mostrar_por_pagina = 1;

	//quantidade de divs
	var numero_de_itens = $('.' + slug).children('.list_post').size();

	//fazemos uma calculo simples para saber quantas paginas existiram
	var numero_de_paginas = Math.ceil(numero_de_itens / mostrar_por_pagina)

	//Colocamos a div class controls dentro da div id pagi
	$('.paginacao_' + slug).empty();
	$('.paginacao_' + slug).append('<div class=controls_' + slug + '></div> <input id=current_page_' + slug + ' type=hidden><input id=mostrar_por_pagina_' + slug + ' type=hidden>');
	$('#current_page_' + slug).val(current_page);
	$('#mostrar_por_pagina_' + slug).val(mostrar_por_pagina);
	//Criamos os links de navegação

	var nevagacao = "";
	if (numero_de_paginas > 1) {
		nevagacao = '<span class="prev" onclick="anterior(\'' + slug + '\')">Prev</span>';

		var link_atual = 0;
		while (numero_de_paginas > link_atual) {
			nevagacao += '<a class="page page_' + link_atual + '" onclick="ir_para_pagina(' + link_atual + ', \'' + slug + '\')" longdesc="'
				+ link_atual + '" style="display:none;">' + (link_atual + 1) + '</a>';

			link_atual++;
		}
		nevagacao += '<span class="next"><a href="javascript:;" onclick="proxima(\'' + slug + '\')">proxima</a></span>';
	}
	//colocamos a nevegação dentro da div class controls
	$('.controls_' + slug).html("<div class='paginacao'>" + nevagacao + "</div>");
	//atribuimos ao primeiro link a class active
	$('.controls_' + slug + ' .page_' + current_page).addClass('current');
	$('.' + slug).children().css('display', 'none');
	$('.' + slug).children().slice(0, mostrar_por_pagina).css('display', 'block');

	exibirNavegacao(numero_de_paginas, current_page);
}


function exibirNavegacao(numero_da_pagina, current_page) {

	proximas_paginas = current_page + 11;

	if (current_page == 0) {
		for (var i = 0; i < proximas_paginas; i++) {
			$('.page_' + i).show();
		};
	}

	if (current_page < 10 && current_page != 0) {
		for (var i = 0; i <= current_page; i++) {
			$('.page_' + i).show();
		};
	}

	if (current_page >= 10) {

		pag_anterior = (current_page - 5);

		for (var i = pag_anterior; i <= current_page; i++) {
			$('.page_' + i).show();
		};

		pag_proximas = (current_page + 5)
		for (var i = pag_proximas; i >= current_page; i--) {
			$('.page_' + i).show();
		};
	}

}

function ir_para_pagina(numero_da_pagina, slug) {
	//Pegamos o número de itens definidos que seria exibido por página
	var mostrar_por_pagina = parseInt($('#mostrar_por_pagina_' + slug).val(), 0);
	//pegamos  o número de elementos por onde começar a fatia
	inicia = numero_da_pagina * mostrar_por_pagina;
	//o número do elemento onde terminar a fatia
	end_on = inicia + mostrar_por_pagina;

	$('.' + slug).children().css('display', 'none').slice(inicia, end_on).css('display', 'block');

	$('.page[longdesc=' + numero_da_pagina + ']').addClass('current').siblings('.current').removeClass('current');

	$('#current_page_' + slug).val(numero_da_pagina);

	$('html,body').animate({ scrollTop: $("." + slug).offset().top }, 'slow');

	inicia_paginacao(slug, numero_da_pagina);
}

function anterior(slug) {
	nova_pagina = parseInt($('#current_page_' + slug).val(), 0) - 1;
	//se houver um item antes do link ativo atual executar a função
	if ($('.current').prev('.page').length == true) {
		ir_para_pagina(nova_pagina, slug);
	}
}

function proxima(slug) {
	nova_pagina = parseInt($('#current_page_' + slug).val(), 0) + 1;
	//se houver um item após o link ativo atual executar a função
	if ($('.current').next('.page').length == true) {
		ir_para_pagina(nova_pagina, slug);
	}
}