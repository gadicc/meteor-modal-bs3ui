Package.describe({
    summary: "Modals using Bootstap 3 and Meteor UI (Spacebars)"
});

Package.on_use(function (api) {
	api.use(['templating', 'session', 'jquery'], 'client');
	api.add_files(['modal-bs3ui.html', 'modal-bs3ui.js', 'modal-bs3ui.css'], 'client');
	api.export('modal');
});
