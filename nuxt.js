import { join } from "path";

export default function (option) {
	if (option["PersianDate"]) {
		this.addModule("@alireza-ab/persian-date/nuxt");
	}
	this.nuxt.hook("components:dirs", (dirs) => {
		dirs.push({
			path: join(__dirname, "src/components"),
			pattern: "**/*.vue",
		});
	});
}

module.exports.meta = require("./package.json");
