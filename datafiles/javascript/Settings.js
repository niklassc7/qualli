export default class Settings {
	constructor(g) {
		this.g = g;
		this.storage = g.storage;
		this.g.storage.setIfNotSet("settingsDebug", false);
		this.g.storage.setIfNotSet("settingsExperimental", true);
		this.g.storage.setIfNotSet("settingsScaling", true);
		this.g.storage.setIfNotSet("settingsMute", true);
		this.g.storage.setIfNotSet("settingsJellyGlow", true);
	}

	// Show overlay
	show() {
		document.getElementById("settingsOverlay").classList.remove("hidden");
	}

	// Hide overlay
	hide() {
		document.getElementById("settingsOverlay").classList.add("hidden");
	}

	getDebug() {
		return this.storage.get("settingsDebug");
	}

	setDebug(val) {
		this.storage.set("settingsDebug", val);
	}

	toggleDebug() {
		const val = !this.getDebug();
		this.setDebug(val);
		document.getElementById("sDebug").checked = val;
		return val;
	}

	getExperimental() {
		return this.storage.get("settingsExperimental");
	}

	setExperimental(val) {
		this.storage.set("settingsExperimental", val);
	}

	toggleExperimental() {
		const val = !this.getExperimental();
		this.setExperimental(val);
		document.getElementById("sExperimental").checked = val;
		return val;
	}

	getScaling() {
		return this.storage.get("settingsScaling");
	}

	setScaling(val) {
		this.storage.set("settingsScaling", val);
	}

	toggleScaling() {
		const val = !this.getScaling();
		this.setScaling(val);
		document.getElementById("sScaling").checked = val;
		f.resizeCanvas();
		return val;
	}

	getJellyGlow() {
		return this.storage.get("settingsJellyGlow");
	}

	setJellyGlow(val) {
		this.storage.set("settingsJellyGlow", val);
	}

	toggleJellyGlow() {
		const val = !this.getJellyGlow();
		this.setJellyGlow(val);
		document.getElementById("setJellyGlow").checked = val;
		return val;
	}

	getMute() {
		return this.storage.get("settingsMute");
	}

	setMute(val) {
		this.storage.set("settingsMute", val);
	}

	toggleMute() {
		const val = !this.getMute();
		this.setMute(val);
		document.getElementById("sMute").checked = val;
		return val;
	}

	pause() {
		this.g.pause();
		document.getElementById("pausedOverlay").classList.remove("hidden");
	}

	unpause() {
		this.g.unpause();
		document.getElementById("pausedOverlay").classList.add("hidden");
	}
}
