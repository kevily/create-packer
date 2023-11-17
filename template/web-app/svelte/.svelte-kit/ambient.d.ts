
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
	export const PATH: string;
	export const FORCE_COLOR: string;
	export const MANPATH: string;
	export const HOMEBREW_PREFIX: string;
	export const LANG: string;
	export const DEBUG_COLORS: string;
	export const COMMAND_MODE: string;
	export const npm_config_color: string;
	export const MOCHA_COLORS: string;
	export const COLORTERM: string;
	export const LOGNAME: string;
	export const HOMEBREW_REPOSITORY: string;
	export const XPC_SERVICE_NAME: string;
	export const PWD: string;
	export const TOOLBOX_VERSION: string;
	export const INFOPATH: string;
	export const __CFBundleIdentifier: string;
	export const HOMEBREW_PIP_INDEX_URL: string;
	export const SHELL: string;
	export const PAGER: string;
	export const LSCOLORS: string;
	export const HOMEBREW_BOTTLE_DOMAIN: string;
	export const OLDPWD: string;
	export const HOMEBREW_CELLAR: string;
	export const USER: string;
	export const ZSH: string;
	export const TMPDIR: string;
	export const SSH_AUTH_SOCK: string;
	export const XPC_FLAGS: string;
	export const LC_ALL: string;
	export const __CF_USER_TEXT_ENCODING: string;
	export const LESS: string;
	export const NODE_ENV: string;
	export const LS_COLORS: string;
	export const HOME: string;
	export const HOMEBREW_API_DOMAIN: string;
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
		PATH: string;
		FORCE_COLOR: string;
		MANPATH: string;
		HOMEBREW_PREFIX: string;
		LANG: string;
		DEBUG_COLORS: string;
		COMMAND_MODE: string;
		npm_config_color: string;
		MOCHA_COLORS: string;
		COLORTERM: string;
		LOGNAME: string;
		HOMEBREW_REPOSITORY: string;
		XPC_SERVICE_NAME: string;
		PWD: string;
		TOOLBOX_VERSION: string;
		INFOPATH: string;
		__CFBundleIdentifier: string;
		HOMEBREW_PIP_INDEX_URL: string;
		SHELL: string;
		PAGER: string;
		LSCOLORS: string;
		HOMEBREW_BOTTLE_DOMAIN: string;
		OLDPWD: string;
		HOMEBREW_CELLAR: string;
		USER: string;
		ZSH: string;
		TMPDIR: string;
		SSH_AUTH_SOCK: string;
		XPC_FLAGS: string;
		LC_ALL: string;
		__CF_USER_TEXT_ENCODING: string;
		LESS: string;
		NODE_ENV: string;
		LS_COLORS: string;
		HOME: string;
		HOMEBREW_API_DOMAIN: string;
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
