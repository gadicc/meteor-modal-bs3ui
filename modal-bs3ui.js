Session.setDefault('modalData', null);

/*

TODO:
* different buttons
* callback events

*/

function tplOrHtml(arg, tplContext) {
	return Template[arg] ||
		Template['modal-bs3ui-html'].extend({data: { html: HTML.Raw(arg) }});
}

modal = function(data) {
	this.tpl = data.tpl || Template['modal-bs3ui'];

	if (data == "close") {
		$('#modal-bs3ui').modal('hide');
		return; 
	}

	data = $.extend({}, {
		body: 'Call with {body: Template || "text"}'
	}, data);

	var context = $.extend({}, data.context || {}, {
		id: data.id || 'modal-bs3ui',
		title: data.title || 'Call with {title: Template || "text"}',
		body: tplOrHtml(data.body),
		tabindex: data.tabindex === false ? '' : data.tabindex || '-1'
	});

	var modalEl = $('#' + context.id);
	if (!modalEl.length) {
		UI.DomRange.insert(UI.render(tpl.extend({data: context})).dom, document.body);
		modalEl = $('#' + context.id);
		modalEl.on('hidden.bs.modal', function() {
			Session.set('modalData', null);
			modalEl.remove();
		});
	}
	var content = modalEl.find('div.modal-content');
	if (data.width) content.css('width', data.width);
	if (data.height) content.css('height', data.height);

	if (typeof(data.save) == 'function')
		data.save = data.save.toString();

	Session.set('modalData', data);
	modalEl.modal('show');
}

Meteor.startup(function() {
	var modalData = Session.get('modalData');
	console.log(modalData); 
	if (modalData)
		modal(modalData);
});

Template['modal-bs3ui'].events({
	'click [data-modal-func]': function(event, tpl) {
		var data = Session.get('modalData');
		var func = $(event.target).attr('data-modal-func');
		if (data[func]) {
			func = eval('func = ' + data[func]);
			func(event, tpl, data);
		}
		modal("close");
	}
});
