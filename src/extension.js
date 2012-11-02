/*
 *  Tinkerer for GNOME Shell
 *  - Icon for restarting Gnome Shell
 *  - Icon for reloading the current theme
 *  - Icon for displaying LookingGlass
 *  
 * The purpose of this extension is to help speed the process of writing
 * shell extensions or creating themes.
 *
 * tinkerer is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * tinkerer is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * GNU General Public License: see <http://www.gnu.org/licenses/>
 */
//// CONFIGURE HERE ////

// show the button to restart gnome-shell?
const RESTART_SHELL_BUTTON = true;
// show the button to toggle the looking glass?
const TOGGLE_LG_BUTTON = true;
// show the button to reload gnome-shell's CSS theme?
const RELOAD_THEME_BUTTON = true;

//// CODE, LEAVE ALONE ////
const Lang = imports.lang;
const St = imports.gi.St;
const Gettext = imports.gettext.domain('gnome-shell');
const _ = Gettext.gettext;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;

let shell_version = imports.misc.config.PACKAGE_VERSION.split('.');
// in GNOME 3.6 for symbolic icons you just append -symbolic
function _getIconName(icon) {
    return (shell_version[1] < 6 ? icon : icon + '-symbolic');
}

function LookingGlassButton() { this._init(); }
LookingGlassButton.prototype = {
	 __proto__: PanelMenu.SystemStatusButton.prototype,

	 _init: function() {
		PanelMenu.SystemStatusButton.prototype._init.call(this,
               _getIconName('dialog-question'), 'Looking Glass');
		this.connect("clicked", Lang.bind(this, this._onButtonPress));
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
		PanelMenu.SystemStatusButton.prototype._init.call(this,
                _getIconName('media-playlist-repeat'), 'Restart Shell');
		this.connect("clicked", Lang.bind(this, this._onButtonPress));
    },

    _onButtonPress: function(actor, event) {
		global.reexec_self();
    }
};

function ReloadThemeButton() { this._init(); }
ReloadThemeButton.prototype = {
	 __proto__: PanelMenu.SystemStatusButton.prototype,

	 _init: function() {
		PanelMenu.SystemStatusButton.prototype._init.call(this,
               _getIconName('starred'), 'Reload Theme');
		this.connect("clicked", Lang.bind(this, this._onButtonPress));
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
    // using addToStatusArea instead of _rightBox.add_actor + _menus.addMenu adds the menu for you.
    if (TOGGLE_LG_BUTTON) {
        lookingGlassButton = new LookingGlassButton();
        Main.panel.addToStatusArea('looking-glass-button', lookingGlassButton, 0, Main.panel._rightBox);
    }
    if (RESTART_SHELL_BUTTON) {
        restartShellButton = new RestartShellButton();
        Main.panel.addToStatusArea('restart-shell-button', restartShellButton, 0, Main.panel._rightBox);
    }
    if (RELOAD_THEME_BUTTON) {
        reloadThemeButton = new ReloadThemeButton();
        Main.panel.addToStatusArea('reload-theme-button', reloadThemeButton, 0, Main.panel._rightBox);
    }
}

function disable() {
    if (lookingGlassButton) {
        lookingGlassButton.destroy();
        lookingGlassButton = null;
    }
    if (restartShellButton) {
        restartShellButton.destroy();
        restartShellButton = null;
    }
    if (reloadThemeButton) {
        reloadThemeButton.destroy();
        reloadThemeButton = null;
    }
}
