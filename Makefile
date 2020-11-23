# As for wp-env details, see https://developer.wordpress.org/block-editor/packages/packages-env/.

help: ## Display help.
	@grep -E '^[/a-zA-Z_-]+:.*?## .*$$' Makefile | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

archive: script/deps script/format script/build ## Archive WordPress plugin inti ./dist directory.
	node bin/archive.js

script/deps: ## Install dependended packages.
	yarn install

script/build: ## Build scripts.
	yarn run build

script/start: ## Build scripts lively.
	yarn run start

script/format: ## Format scripts.
	yarn run format:js

env/start: ## Run local enviroment.
	yarn run wp-env start

env/stop: ## Stop local enviroment.
	yarn run wp-env stop

env/format: ## Formatting js files.
	yarn run format:js

env/logs: ## Display logs on local envroment.
	yarn run wp-env logs
