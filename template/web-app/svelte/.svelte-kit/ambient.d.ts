
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const VITE_BASE_URL: string;
	export const VITE_API_HOST: string;
	export const npm_package_devDependencies_prettier: string;
	export const MANPATH: string;
	export const npm_package_devDependencies_eslint_plugin_svelte: string;
	export const TERM_PROGRAM: string;
	export const NODE: string;
	export const npm_config__jz_registry: string;
	export const INIT_CWD: string;
	export const npm_package_devDependencies_typescript: string;
	export const npm_package_devDependencies_prettier_plugin_svelte: string;
	export const npm_package_devDependencies_vite: string;
	export const TERM: string;
	export const SHELL: string;
	export const HOMEBREW_BOTTLE_DOMAIN: string;
	export const HOMEBREW_API_DOMAIN: string;
	export const HOMEBREW_REPOSITORY: string;
	export const TMPDIR: string;
	export const npm_config_metrics_registry: string;
	export const npm_package_scripts_lint: string;
	export const npm_config_global_prefix: string;
	export const TERM_PROGRAM_VERSION: string;
	export const npm_package_scripts_dev: string;
	export const ZDOTDIR: string;
	export const ORIGINAL_XDG_CURRENT_DESKTOP: string;
	export const MallocNanoZone: string;
	export const COLOR: string;
	export const npm_config_home: string;
	export const npm_config_registry: string;
	export const npm_package_devDependencies__sveltejs_kit: string;
	export const npm_package_private: string;
	export const npm_config_noproxy: string;
	export const LC_ALL: string;
	export const ZSH: string;
	export const npm_config_local_prefix: string;
	export const USER: string;
	export const npm_package_scripts_check_watch: string;
	export const LS_COLORS: string;
	export const COMMAND_MODE: string;
	export const PNPM_SCRIPT_SRC_DIR: string;
	export const npm_config_globalconfig: string;
	export const SSH_AUTH_SOCK: string;
	export const npm_package_devDependencies_eslint: string;
	export const __CF_USER_TEXT_ENCODING: string;
	export const npm_execpath: string;
	export const npm_package_devDependencies_tslib: string;
	export const npm_package_devDependencies__typescript_eslint_eslint_plugin: string;
	export const HOMEBREW_PIP_INDEX_URL: string;
	export const npm_package_devDependencies_svelte: string;
	export const PAGER: string;
	export const LSCOLORS: string;
	export const npm_package_devDependencies__typescript_eslint_parser: string;
	export const PATH: string;
	export const npm_config_engine_strict: string;
	export const npm_package_json: string;
	export const USER_ZDOTDIR: string;
	export const __CFBundleIdentifier: string;
	export const npm_config_init_module: string;
	export const npm_config_userconfig: string;
	export const npm_command: string;
	export const PWD: string;
	export const npm_package_scripts_up_vite: string;
	export const npm_package_scripts_preview: string;
	export const npm_lifecycle_event: string;
	export const EDITOR: string;
	export const npm_package_name: string;
	export const LANG: string;
	export const npm_config_resolution_mode: string;
	export const NODE_PATH: string;
	export const npm_package_scripts_build: string;
	export const VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
	export const XPC_FLAGS: string;
	export const npm_package_devDependencies__types_lodash_es: string;
	export const npm_config_node_gyp: string;
	export const npm_package_devDependencies_eslint_config_prettier: string;
	export const npm_config_sass_binary_site: string;
	export const npm_package_devDependencies__sveltejs_adapter_auto: string;
	export const npm_package_version: string;
	export const XPC_SERVICE_NAME: string;
	export const npm_package_devDependencies_svelte_check: string;
	export const VSCODE_INJECTION: string;
	export const npm_package_type: string;
	export const SHLVL: string;
	export const HOME: string;
	export const VSCODE_GIT_ASKPASS_MAIN: string;
	export const HOMEBREW_PREFIX: string;
	export const npm_package_scripts_format: string;
	export const LESS: string;
	export const LOGNAME: string;
	export const npm_config_cache: string;
	export const npm_lifecycle_script: string;
	export const npm_package_dependencies_lodash_es: string;
	export const VSCODE_GIT_IPC_HANDLE: string;
	export const npm_config_user_agent: string;
	export const npm_config_ignore_scripts: string;
	export const VSCODE_GIT_ASKPASS_NODE: string;
	export const GIT_ASKPASS: string;
	export const INFOPATH: string;
	export const HOMEBREW_CELLAR: string;
	export const npm_package_scripts_build_analyse: string;
	export const npm_config_init_author_name: string;
	export const npm_package_scripts_check: string;
	export const npm_node_execpath: string;
	export const COLORTERM: string;
	export const npm_config_prefix: string;
}

/**
 * Similar to [`$env/static/private`](https://kit.svelte.dev/docs/modules#$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/master/packages/adapter-node) (or running [`vite preview`](https://kit.svelte.dev/docs/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		VITE_BASE_URL: string;
		VITE_API_HOST: string;
		npm_package_devDependencies_prettier: string;
		MANPATH: string;
		npm_package_devDependencies_eslint_plugin_svelte: string;
		TERM_PROGRAM: string;
		NODE: string;
		npm_config__jz_registry: string;
		INIT_CWD: string;
		npm_package_devDependencies_typescript: string;
		npm_package_devDependencies_prettier_plugin_svelte: string;
		npm_package_devDependencies_vite: string;
		TERM: string;
		SHELL: string;
		HOMEBREW_BOTTLE_DOMAIN: string;
		HOMEBREW_API_DOMAIN: string;
		HOMEBREW_REPOSITORY: string;
		TMPDIR: string;
		npm_config_metrics_registry: string;
		npm_package_scripts_lint: string;
		npm_config_global_prefix: string;
		TERM_PROGRAM_VERSION: string;
		npm_package_scripts_dev: string;
		ZDOTDIR: string;
		ORIGINAL_XDG_CURRENT_DESKTOP: string;
		MallocNanoZone: string;
		COLOR: string;
		npm_config_home: string;
		npm_config_registry: string;
		npm_package_devDependencies__sveltejs_kit: string;
		npm_package_private: string;
		npm_config_noproxy: string;
		LC_ALL: string;
		ZSH: string;
		npm_config_local_prefix: string;
		USER: string;
		npm_package_scripts_check_watch: string;
		LS_COLORS: string;
		COMMAND_MODE: string;
		PNPM_SCRIPT_SRC_DIR: string;
		npm_config_globalconfig: string;
		SSH_AUTH_SOCK: string;
		npm_package_devDependencies_eslint: string;
		__CF_USER_TEXT_ENCODING: string;
		npm_execpath: string;
		npm_package_devDependencies_tslib: string;
		npm_package_devDependencies__typescript_eslint_eslint_plugin: string;
		HOMEBREW_PIP_INDEX_URL: string;
		npm_package_devDependencies_svelte: string;
		PAGER: string;
		LSCOLORS: string;
		npm_package_devDependencies__typescript_eslint_parser: string;
		PATH: string;
		npm_config_engine_strict: string;
		npm_package_json: string;
		USER_ZDOTDIR: string;
		__CFBundleIdentifier: string;
		npm_config_init_module: string;
		npm_config_userconfig: string;
		npm_command: string;
		PWD: string;
		npm_package_scripts_up_vite: string;
		npm_package_scripts_preview: string;
		npm_lifecycle_event: string;
		EDITOR: string;
		npm_package_name: string;
		LANG: string;
		npm_config_resolution_mode: string;
		NODE_PATH: string;
		npm_package_scripts_build: string;
		VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
		XPC_FLAGS: string;
		npm_package_devDependencies__types_lodash_es: string;
		npm_config_node_gyp: string;
		npm_package_devDependencies_eslint_config_prettier: string;
		npm_config_sass_binary_site: string;
		npm_package_devDependencies__sveltejs_adapter_auto: string;
		npm_package_version: string;
		XPC_SERVICE_NAME: string;
		npm_package_devDependencies_svelte_check: string;
		VSCODE_INJECTION: string;
		npm_package_type: string;
		SHLVL: string;
		HOME: string;
		VSCODE_GIT_ASKPASS_MAIN: string;
		HOMEBREW_PREFIX: string;
		npm_package_scripts_format: string;
		LESS: string;
		LOGNAME: string;
		npm_config_cache: string;
		npm_lifecycle_script: string;
		npm_package_dependencies_lodash_es: string;
		VSCODE_GIT_IPC_HANDLE: string;
		npm_config_user_agent: string;
		npm_config_ignore_scripts: string;
		VSCODE_GIT_ASKPASS_NODE: string;
		GIT_ASKPASS: string;
		INFOPATH: string;
		HOMEBREW_CELLAR: string;
		npm_package_scripts_build_analyse: string;
		npm_config_init_author_name: string;
		npm_package_scripts_check: string;
		npm_node_execpath: string;
		COLORTERM: string;
		npm_config_prefix: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
