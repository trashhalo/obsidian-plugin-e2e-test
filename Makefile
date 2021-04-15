e2e:
	docker build -t obsidian .
	docker run --rm --security-opt seccomp=$(CURDIR)/chrome.json obsidian
