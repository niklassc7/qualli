// Static class that handles settings

class Settings {
	static debug = false;
	static experimental = true;
	static scaling = true;
	static paused = false;

	// Initialized fields in overlay
	static initOverlay() {
		// TODO
	}

	// Show overlay
	static show() {
		document.getElementById("settingsOverlay").classList.remove("hidden");
	}

	// Hide overlay
	static hide() {
		document.getElementById("settingsOverlay").classList.add("hidden");
	}

	static toggleDebug() {
		// TODO
		Settings.debug = !Settings.debug;
		document.getElementById("sDebug").checked = Settings.debug;
	}

	static toggleExperimental() {
		Settings.experimental = !Settings.experimental;
		document.getElementById("sExperimental").checked = Settings.experimental;
	}

	static toggleScaling() {
		Settings.scaling = !Settings.scaling;
		document.getElementById("sScaling").checked = Settings.scaling;
		resizeCanvas();
	}

	static pause() {
		Settings.paused = true;
		document.getElementById("pausedOverlay").classList.remove("hidden");
	}

	static unpause() {
		Settings.paused = false;
		document.getElementById("pausedOverlay").classList.add("hidden");
	}
}
