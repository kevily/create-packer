
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
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
	export const ALLUSERSPROFILE: string;
	export const APPDATA: string;
	export const CommonProgramFiles: string;
	export const CommonProgramW6432: string;
	export const COMPUTERNAME: string;
	export const ComSpec: string;
	export const CONDA_PROMPT_MODIFIER: string;
	export const configsetroot: string;
	export const DriverData: string;
	export const FNM_ARCH: string;
	export const FNM_COREPACK_ENABLED: string;
	export const FNM_DIR: string;
	export const FNM_LOGLEVEL: string;
	export const FNM_MULTISHELL_PATH: string;
	export const FNM_NODE_DIST_MIRROR: string;
	export const FNM_RESOLVE_ENGINES: string;
	export const FNM_VERSION_FILE_STRATEGY: string;
	export const GIT_INSTALL_ROOT: string;
	export const HOME: string;
	export const HOMEDRIVE: string;
	export const HOMEPATH: string;
	export const HTTPS_PROXY: string;
	export const HTTP_PROXY: string;
	export const IJ_RESTARTER_LOG: string;
	export const INIT_CWD: string;
	export const JETBRAINS_INTELLIJ_COMMAND_END_MARKER: string;
	export const LOCALAPPDATA: string;
	export const LOGONSERVER: string;
	export const MODE: string;
	export const NODE: string;
	export const NODE_ENV: string;
	export const NODE_PATH: string;
	export const npm_command: string;
	export const npm_config_engine_strict: string;
	export const npm_config_frozen_lockfile: string;
	export const npm_config_home: string;
	export const npm_config_ignore_scripts: string;
	export const npm_config_node_gyp: string;
	export const npm_config_registry: string;
	export const npm_config_resolution_mode: string;
	export const npm_config_user_agent: string;
	export const npm_config__jz_registry: string;
	export const npm_execpath: string;
	export const npm_lifecycle_event: string;
	export const npm_lifecycle_script: string;
	export const npm_node_execpath: string;
	export const npm_package_dependencies_lodash_es: string;
	export const npm_package_dependencies_svelte: string;
	export const npm_package_devDependencies_commitizen: string;
	export const npm_package_devDependencies_cross_env: string;
	export const npm_package_devDependencies_cssnano: string;
	export const npm_package_devDependencies_dotenv: string;
	export const npm_package_devDependencies_eslint: string;
	export const npm_package_devDependencies_eslint_config_prettier: string;
	export const npm_package_devDependencies_eslint_import_resolver_typescript: string;
	export const npm_package_devDependencies_eslint_plugin_import: string;
	export const npm_package_devDependencies_eslint_plugin_svelte: string;
	export const npm_package_devDependencies_globals: string;
	export const npm_package_devDependencies_postcss: string;
	export const npm_package_devDependencies_postcss_import: string;
	export const npm_package_devDependencies_postcss_nesting: string;
	export const npm_package_devDependencies_prettier: string;
	export const npm_package_devDependencies_prettier_plugin_svelte: string;
	export const npm_package_devDependencies_rollup_plugin_visualizer: string;
	export const npm_package_devDependencies_svelte_check: string;
	export const npm_package_devDependencies_tslib: string;
	export const npm_package_devDependencies_typescript: string;
	export const npm_package_devDependencies_typescript_eslint: string;
	export const npm_package_devDependencies_vite: string;
	export const npm_package_devDependencies_vite_plugin_checker: string;
	export const npm_package_devDependencies_vite_plugin_stylelint: string;
	export const npm_package_devDependencies__commitlint_cli: string;
	export const npm_package_devDependencies__commitlint_config_conventional: string;
	export const npm_package_devDependencies__commitlint_cz_commitlint: string;
	export const npm_package_devDependencies__sveltejs_adapter_auto: string;
	export const npm_package_devDependencies__sveltejs_kit: string;
	export const npm_package_devDependencies__sveltejs_vite_plugin_svelte: string;
	export const npm_package_devDependencies__types_lodash_es: string;
	export const npm_package_name: string;
	export const npm_package_private: string;
	export const npm_package_scripts_build: string;
	export const npm_package_scripts_build_analyse: string;
	export const npm_package_scripts_check: string;
	export const npm_package_scripts_check_watch: string;
	export const npm_package_scripts_commit: string;
	export const npm_package_scripts_cz: string;
	export const npm_package_scripts_dev: string;
	export const npm_package_scripts_format: string;
	export const npm_package_scripts_lint: string;
	export const npm_package_scripts_prepare: string;
	export const npm_package_scripts_preview: string;
	export const npm_package_scripts_push: string;
	export const npm_package_scripts_up_svelte: string;
	export const npm_package_scripts_up_vite: string;
	export const npm_package_type: string;
	export const npm_package_version: string;
	export const NUMBER_OF_PROCESSORS: string;
	export const OneDrive: string;
	export const OneDriveConsumer: string;
	export const OS: string;
	export const Path: string;
	export const PATHEXT: string;
	export const PNPM_SCRIPT_SRC_DIR: string;
	export const POSH_CURSOR_COLUMN: string;
	export const POSH_CURSOR_LINE: string;
	export const POSH_INSTALLER: string;
	export const POSH_SESSION_ID: string;
	export const POSH_SHELL_VERSION: string;
	export const POSH_THEME: string;
	export const POSH_THEMES_PATH: string;
	export const POWERLINE_COMMAND: string;
	export const PROCESSOR_ARCHITECTURE: string;
	export const PROCESSOR_IDENTIFIER: string;
	export const PROCESSOR_LEVEL: string;
	export const PROCESSOR_REVISION: string;
	export const ProgramData: string;
	export const ProgramFiles: string;
	export const ProgramW6432: string;
	export const PROMPT: string;
	export const PSExecutionPolicyPreference: string;
	export const PSModulePath: string;
	export const PUBLIC: string;
	export const SESSIONNAME: string;
	export const SystemDrive: string;
	export const SystemRoot: string;
	export const TEMP: string;
	export const TERMINAL_EMULATOR: string;
	export const TERM_SESSION_ID: string;
	export const TMP: string;
	export const TOOLBOX_VERSION: string;
	export const USERDOMAIN: string;
	export const USERDOMAIN_ROAMINGPROFILE: string;
	export const USERNAME: string;
	export const USERPROFILE: string;
	export const windir: string;
	export const ZES_ENABLE_SYSMAN: string;
}

/**
 * Similar to [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
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
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * Dynamic environment variables cannot be used during prerendering.
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
		ALLUSERSPROFILE: string;
		APPDATA: string;
		CommonProgramFiles: string;
		CommonProgramW6432: string;
		COMPUTERNAME: string;
		ComSpec: string;
		CONDA_PROMPT_MODIFIER: string;
		configsetroot: string;
		DriverData: string;
		FNM_ARCH: string;
		FNM_COREPACK_ENABLED: string;
		FNM_DIR: string;
		FNM_LOGLEVEL: string;
		FNM_MULTISHELL_PATH: string;
		FNM_NODE_DIST_MIRROR: string;
		FNM_RESOLVE_ENGINES: string;
		FNM_VERSION_FILE_STRATEGY: string;
		GIT_INSTALL_ROOT: string;
		HOME: string;
		HOMEDRIVE: string;
		HOMEPATH: string;
		HTTPS_PROXY: string;
		HTTP_PROXY: string;
		IJ_RESTARTER_LOG: string;
		INIT_CWD: string;
		JETBRAINS_INTELLIJ_COMMAND_END_MARKER: string;
		LOCALAPPDATA: string;
		LOGONSERVER: string;
		MODE: string;
		NODE: string;
		NODE_ENV: string;
		NODE_PATH: string;
		npm_command: string;
		npm_config_engine_strict: string;
		npm_config_frozen_lockfile: string;
		npm_config_home: string;
		npm_config_ignore_scripts: string;
		npm_config_node_gyp: string;
		npm_config_registry: string;
		npm_config_resolution_mode: string;
		npm_config_user_agent: string;
		npm_config__jz_registry: string;
		npm_execpath: string;
		npm_lifecycle_event: string;
		npm_lifecycle_script: string;
		npm_node_execpath: string;
		npm_package_dependencies_lodash_es: string;
		npm_package_dependencies_svelte: string;
		npm_package_devDependencies_commitizen: string;
		npm_package_devDependencies_cross_env: string;
		npm_package_devDependencies_cssnano: string;
		npm_package_devDependencies_dotenv: string;
		npm_package_devDependencies_eslint: string;
		npm_package_devDependencies_eslint_config_prettier: string;
		npm_package_devDependencies_eslint_import_resolver_typescript: string;
		npm_package_devDependencies_eslint_plugin_import: string;
		npm_package_devDependencies_eslint_plugin_svelte: string;
		npm_package_devDependencies_globals: string;
		npm_package_devDependencies_postcss: string;
		npm_package_devDependencies_postcss_import: string;
		npm_package_devDependencies_postcss_nesting: string;
		npm_package_devDependencies_prettier: string;
		npm_package_devDependencies_prettier_plugin_svelte: string;
		npm_package_devDependencies_rollup_plugin_visualizer: string;
		npm_package_devDependencies_svelte_check: string;
		npm_package_devDependencies_tslib: string;
		npm_package_devDependencies_typescript: string;
		npm_package_devDependencies_typescript_eslint: string;
		npm_package_devDependencies_vite: string;
		npm_package_devDependencies_vite_plugin_checker: string;
		npm_package_devDependencies_vite_plugin_stylelint: string;
		npm_package_devDependencies__commitlint_cli: string;
		npm_package_devDependencies__commitlint_config_conventional: string;
		npm_package_devDependencies__commitlint_cz_commitlint: string;
		npm_package_devDependencies__sveltejs_adapter_auto: string;
		npm_package_devDependencies__sveltejs_kit: string;
		npm_package_devDependencies__sveltejs_vite_plugin_svelte: string;
		npm_package_devDependencies__types_lodash_es: string;
		npm_package_name: string;
		npm_package_private: string;
		npm_package_scripts_build: string;
		npm_package_scripts_build_analyse: string;
		npm_package_scripts_check: string;
		npm_package_scripts_check_watch: string;
		npm_package_scripts_commit: string;
		npm_package_scripts_cz: string;
		npm_package_scripts_dev: string;
		npm_package_scripts_format: string;
		npm_package_scripts_lint: string;
		npm_package_scripts_prepare: string;
		npm_package_scripts_preview: string;
		npm_package_scripts_push: string;
		npm_package_scripts_up_svelte: string;
		npm_package_scripts_up_vite: string;
		npm_package_type: string;
		npm_package_version: string;
		NUMBER_OF_PROCESSORS: string;
		OneDrive: string;
		OneDriveConsumer: string;
		OS: string;
		Path: string;
		PATHEXT: string;
		PNPM_SCRIPT_SRC_DIR: string;
		POSH_CURSOR_COLUMN: string;
		POSH_CURSOR_LINE: string;
		POSH_INSTALLER: string;
		POSH_SESSION_ID: string;
		POSH_SHELL_VERSION: string;
		POSH_THEME: string;
		POSH_THEMES_PATH: string;
		POWERLINE_COMMAND: string;
		PROCESSOR_ARCHITECTURE: string;
		PROCESSOR_IDENTIFIER: string;
		PROCESSOR_LEVEL: string;
		PROCESSOR_REVISION: string;
		ProgramData: string;
		ProgramFiles: string;
		ProgramW6432: string;
		PROMPT: string;
		PSExecutionPolicyPreference: string;
		PSModulePath: string;
		PUBLIC: string;
		SESSIONNAME: string;
		SystemDrive: string;
		SystemRoot: string;
		TEMP: string;
		TERMINAL_EMULATOR: string;
		TERM_SESSION_ID: string;
		TMP: string;
		TOOLBOX_VERSION: string;
		USERDOMAIN: string;
		USERDOMAIN_ROAMINGPROFILE: string;
		USERNAME: string;
		USERPROFILE: string;
		windir: string;
		ZES_ENABLE_SYSMAN: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * Dynamic environment variables cannot be used during prerendering.
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
