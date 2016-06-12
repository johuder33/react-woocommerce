.PHONY: run install stop-server stop start-server

install: package.json
	@echo Checking all dependencies...

	@npm install

run: | install start-server
	@echo Running Solid ID for development

	@npm run run &

start-server:
	@echo Starting Server dev

	@npm run server &

stop: | stop-server
	@echo Stopping changes watching

	@for PROCID in $$(ps -ef | grep "[n]ode.*[w]ebpack" | awk '{ print $$2 }'); do \
		echo stopping webpack watch $$PROCID; \
		kill $$PROCID; \
	done

stop-server:
	@echo Stopping Server Dev

	@for PROCID in $$(ps -ef | grep "[b]abel-node.*server" | awk '{ print $$2 }'); do \
		echo stopping server $$PROCID; \
		kill $$PROCID; \
	done

	@for PROCID in $$(ps -ef | grep "[b]abel-node.*companies" | awk '{ print $$2 }'); do \
  		echo stopping server $$PROCID; \
  		kill $$PROCID; \
  	done