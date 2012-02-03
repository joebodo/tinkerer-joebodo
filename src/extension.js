const Lang = imports.lang;
const St = imports.gi.St;
const Gettext = imports.gettext.domain('gnome-shell');
const _ = Gettext.gettext;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;

function LookingGlassButton() { this._init(); }
LookingGlassButton.prototype = {
	 __proto__: PanelMenu.SystemStatusButton.prototype,

	 _init: function() {
		PanelMenu.SystemStatusButton.prototype._init.call(this, 'dialog-question', 'Looking Glass', 'LG');
		this.connect("clicked", Lang.bind(this, this._onButtonPress));
		Main.panel._menus.addMenu(this.menu);
    },

    _onButtonPress: function(actor, event) {

    	if (!this._lookingGlasss) {
    		this._lookingGlass = Main.createLookingGlass();
    	}
		this._lookingGlass.toggle();
    }
};

function RestartShellButton() { this._init(); }
RestartShellButton.prototype = {
	 __proto__: PanelMenu.SystemStatusButton.prototype,

	 _init: function() {
		PanelMenu.SystemStatusButton.prototype._init.call(this, 'media-playlist-repeat', 'Restart Shell', 'R');
		this.connect("clicked", Lang.bind(this, this._onButtonPress));
		Main.panel._menus.addMenu(this.menu);
    },

    _onButtonPress: function(actor, event) {
		global.reexec_self();
    }
};

function ReloadThemeButton() { this._init(); }
ReloadThemeButton.prototype = {
	 __proto__: PanelMenu.SystemStatusButton.prototype,

	 _init: function() {
		PanelMenu.SystemStatusButton.prototype._init.call(this, 'starred', 'Reload Theme');
		this.connect("clicked", Lang.bind(this, this._onButtonPress));
		Main.panel._menus.addMenu(this.menu);
    },
    
    _onButtonPress: function(actor, event) {
		Main.loadTheme();
		Main.notify(_("Tinkerer"), _("Theme Reloaded."));
    }
};

function init(metadata) {
}

let lookingGlassButton;
let restartShellButton;
let reloadThemeButton;

function enable() {
	lookingGlassButton = new LookingGlassButton()
	restartShellButton = new RestartShellButton()
	reloadThemeButton = new ReloadThemeButton()

	Main.panel._rightBox.insert_actor(lookingGlassButton.actor, 0);
	Main.panel._rightBox.insert_actor(restartShellButton.actor, 0);
	Main.panel._rightBox.insert_actor(reloadThemeButton.actor, 0);
}

function disable() {
	Main.panel._rightBox.remove_actor(lookingGlassButton.actor);
	Main.panel._rightBox.remove_actor(restartShellButton.actor);
	Main.panel._rightBox.remove_actor(reloadThemeButton.actor);

	lookingGlassButton.destroy();
	restartShellButton.destroy();
	reloadThemeButton.destroy();
}
